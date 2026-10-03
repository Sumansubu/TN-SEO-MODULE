import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const COOKIE_NAME = "accessToken";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // 8+ chars, at least one letter and one number
const BCRYPT_ROUNDS = 12;

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
        const password = req.body.password || "";
        const confirmPassword = req.body.confirmPassword || "";

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
        const password = req.body.password || "";
        const rememberMe = req.body.rememberMe !== false;

        if (!email || !password) {
            return badRequest(res, "Please enter your email and password.");
        }

        const user = await User.findOne({ email }).select("+passwordHash");

        // Same message for "no user" and "wrong password" - avoids user enumeration.
        const invalid = () => res.status(401).json({ success: false, message: "Invalid email or password." });

        if (!user) return invalid();

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
