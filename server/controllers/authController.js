import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendPasswordResetEmail, isSmtpConfigured } from "../utils/mailer.js";

const COOKIE_NAME = "accessToken";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // 8+ chars, at least one letter and one number
const BCRYPT_ROUNDS = 12;
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

const googleClient = new OAuth2Client();

function sha256(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

function isProduction() {
    return process.env.NODE_ENV === "production";
}

function cookieOptions(rememberMe = true) {
    return {
        httpOnly: true,
        secure: isProduction(), // requires HTTPS - set NODE_ENV=production behind TLS
        sameSite: isProduction() ? "none" : "lax", // "none" needs secure; works cross-site in production
        path: "/",
        maxAge: rememberMe ? COOKIE_MAX_AGE_MS : undefined, // no maxAge = session cookie
    };
}

function setAuthCookie(res, token, rememberMe) {
    res.cookie(COOKIE_NAME, token, cookieOptions(rememberMe));
}

function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, cookieOptions());
}

/* ---------------------------------- helpers --------------------------------- */

function badRequest(res, message) {
    return res.status(400).json({ success: false, message });
}

async function hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/* ---------------------------------- register -------------------------------- */

export async function register(req, res, next) {
    try {
        const fullName = (req.body.fullName || "").trim();
        const email = (req.body.email || "").trim().toLowerCase();
        const password = (req.body.password || "").trim();
        const confirmPassword = (req.body.confirmPassword || "").trim();

        if (!fullName || !email || !password || !confirmPassword) {
            return badRequest(res, "Please fill in all fields.");
        }

        if (!EMAIL_PATTERN.test(email)) {
            return badRequest(res, "Please enter a valid email address.");
        }

        if (!PASSWORD_PATTERN.test(password)) {
            return badRequest(
                res,
                "Password must be at least 8 characters and include at least one letter and one number."
            );
        }

        if (password !== confirmPassword) {
            return badRequest(res, "Passwords do not match.");
        }

        const existing = await User.findOne({ email }).select("_id");
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists. Try signing in instead.",
            });
        }

        const passwordHash = await hashPassword(password);
        const user = await User.create({ fullName, email, passwordHash });

        setAuthCookie(res, generateToken(user._id), true);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user: user.toPublic(),
        });
    } catch (error) {
        next(error);
    }
}

/* ----------------------------------- login ---------------------------------- */

export async function login(req, res, next) {
    try {
        const email = (req.body.email || "").trim().toLowerCase();
        const password = (req.body.password || "").trim();
        const rememberMe = req.body.rememberMe !== false;

        if (!email || !password) {
            return badRequest(res, "Please enter your email and password.");
        }

        const user = await User.findOne({ email }).select("+passwordHash");

        // Same message for "no user", "no password", and "wrong password" - avoids user enumeration.
        const invalid = () => res.status(401).json({ success: false, message: "Invalid email or password." });

        if (!user || !user.passwordHash) return invalid();

        const matches = await bcrypt.compare(password, user.passwordHash);
        if (!matches) return invalid();

        setAuthCookie(res, generateToken(user._id), rememberMe);

        res.json({
            success: true,
            message: "Signed in successfully.",
            user: user.toPublic(),
        });
    } catch (error) {
        next(error);
    }
}

/* ---------------------------------- logout ---------------------------------- */

export async function logout(req, res, next) {
    try {
        clearAuthCookie(res);
        res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        next(error);
    }
}

/* ------------------------------------ me ------------------------------------ */

export async function me(req, res) {
    if (!req.user) {
        return res.json({ authenticated: false });
    }

    res.json({
        authenticated: true,
        user: req.user.toPublic(),
    });
}

/* ---------------------------------- google ---------------------------------- */

/** Lets the frontend know whether Google sign-in is configured. */
export async function googleConfig(req, res) {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    res.json({ enabled: Boolean(clientId), clientId: clientId || null });
}

/**
 * Verifies a Google Identity Services ID token, then creates or links the
 * account and starts a normal HttpOnly-cookie session.
 */
export async function googleLogin(req, res, next) {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        if (!clientId) {
            return res.status(503).json({
                success: false,
                message: "Google sign-in is not configured on this server.",
            });
        }

        const credential = req.body?.credential;
        if (!credential) return badRequest(res, "Missing Google credential.");

        let payload;
        try {
            const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
            payload = ticket.getPayload();
        } catch {
            return res.status(401).json({
                success: false,
                message: "Google sign-in failed. Please try again.",
            });
        }

        if (!payload?.sub || !payload?.email || payload.email_verified === false) {
            return res.status(401).json({
                success: false,
                message: "Your Google account email could not be verified.",
            });
        }

        const email = payload.email.trim().toLowerCase();
        const avatar = payload.picture || "";

        let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email }] });

        if (user) {
            // Link Google to an existing email/password account.
            if (!user.googleId) {
                user.googleId = payload.sub;
                if (!user.avatar && avatar) user.avatar = avatar;
                await user.save();
            }
        } else {
            user = await User.create({
                fullName: (payload.name || email.split("@")[0]).trim(),
                email,
                googleId: payload.sub,
                avatar,
                authProvider: "google",
            });
        }

        setAuthCookie(res, generateToken(user._id), true);

        res.json({ success: true, message: "Signed in with Google.", user: user.toPublic() });
    } catch (error) {
        next(error);
    }
}

/* ------------------------------ forgot password ----------------------------- */

export async function forgotPassword(req, res, next) {
    try {
        const email = (req.body?.email || "").trim().toLowerCase();

        if (!email || !EMAIL_PATTERN.test(email)) {
            return badRequest(res, "Please enter a valid email address.");
        }

        // Never reveals whether the account exists (no user enumeration).
        const generic = {
            success: true,
            message: "If an account exists for that email, a password reset link has been sent.",
        };

        const user = await User.findOne({ email });

        if (!user) return res.json(generic);

        const token = crypto.randomBytes(32).toString("base64url");
        user.passwordResetTokenHash = sha256(token);
        user.passwordResetExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
        await user.save();

        const resetUrl = `${(process.env.CLIENT_URL || "http://localhost:5173").replace(/\/+$/, "")}/reset-password/${token}`;

        let emailed = false;
        if (isSmtpConfigured()) {
            try {
                emailed = await sendPasswordResetEmail({ to: user.email, fullName: user.fullName, resetUrl });
            } catch (error) {
                console.error("[mail] password reset email failed:", error.message);
            }
        }

        // Development convenience: no SMTP configured -> log the link and, outside
        // production, return it so the flow is testable without an email server.
        if (!emailed && process.env.NODE_ENV !== "production") {
            console.log(`[auth] Password reset link for ${email}: ${resetUrl}`);
            return res.json({ ...generic, devResetUrl: resetUrl });
        }

        res.json(generic);
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(req, res, next) {
    try {
        const token = req.body?.token || "";
        const password = (req.body?.password || "").trim();
        const confirmPassword = (req.body?.confirmPassword || "").trim() || password;

        if (!token) return badRequest(res, "Reset link is invalid or has expired.");

        if (!PASSWORD_PATTERN.test(password)) {
            return badRequest(
                res,
                "Password must be at least 8 characters and include at least one letter and one number."
            );
        }

        if (password !== confirmPassword) {
            return badRequest(res, "Passwords do not match.");
        }

        const user = await User.findOne({
            passwordResetTokenHash: sha256(token),
            passwordResetExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or has expired. Please request a new one.",
            });
        }

        user.passwordHash = await hashPassword(password);
        user.passwordResetTokenHash = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        clearAuthCookie(res); // old sessions keep working until they expire; sign in fresh
        res.json({ success: true, message: "Password updated successfully. Please sign in." });
    } catch (error) {
        next(error);
    }
}
