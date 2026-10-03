import jwt from "jsonwebtoken";

/**
 * Signs a short-lived-enough access token containing the authenticated user id.
 * The token itself is only ever stored in an HttpOnly cookie.
 */
export function generateToken(userId) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.sign({ id: userId.toString() }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
}
