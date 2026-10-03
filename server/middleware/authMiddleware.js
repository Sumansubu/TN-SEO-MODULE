import jwt from "jsonwebtoken";
import User from "../models/User.js";

const UNAUTHORIZED = { success: false, message: "Authentication required" };

function readToken(req) {
    const header = req.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
        return header.slice(7).trim();
    }
    return req.cookies?.accessToken;
}

async function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user || null;
}

/**
 * Protects a route: requires a valid session, otherwise responds 401.
 * Attach to any authenticated endpoint: router.get("/x", protect, handler)
 */
export async function protect(req, res, next) {
    try {
        const token = readToken(req);
        if (!token) return res.status(401).json(UNAUTHORIZED);

        let user;
        try {
            user = await verifyToken(token);
        } catch (error) {
            const message =
                error.name === "TokenExpiredError"
                    ? "Session expired. Please log in again."
                    : UNAUTHORIZED.message;
            return res.status(401).json({ success: false, message });
        }

        if (!user) return res.status(401).json(UNAUTHORIZED);

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Attaches `req.user` when a valid session exists, otherwise continues
 * unauthenticated. Never fails - used by endpoints such as GET /api/auth/me.
 */
export async function optionalAuth(req, res, next) {
    try {
        const token = readToken(req);
        if (token) {
            const user = await verifyToken(token);
            if (user) req.user = user;
        }
        next();
    } catch {
        next(); // expired/invalid token simply means "not authenticated"
    }
}
