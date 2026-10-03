import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { register, login, logout, me } from "../controllers/authController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

/** Basic protection against credential-stuffing / brute force attempts. */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { success: false, message: "Too many attempts. Please try again in a few minutes." },
});

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", optionalAuth, me);

export default router;
