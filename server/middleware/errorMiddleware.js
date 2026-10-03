/** 404 for unknown API routes. */
export function notFound(req, res) {
    res.status(404).json({ success: false, message: "Route not found." });
}

/**
 * Central error handler. Logs details server-side only and always returns a
 * clean, user-friendly message - never stack traces or database details.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    const status = err.statusCode || err.status || 500;

    if (err.name === "CastError") {
        return res.status(400).json({ success: false, message: "Invalid request. Please check your input." });
    }

    if (err.code === 11000) {
        return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    if (err.name === "ValidationError") {
        const first = Object.values(err.errors || {})[0]?.message;
        return res.status(400).json({ success: false, message: first || "Please check your input." });
    }

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ success: false, message: "Invalid request body." });
    }

    console.error(`[error] ${err.message}`);

    res.status(status).json({
        success: false,
        message: status >= 500 ? "Something went wrong on our end. Please try again." : err.message,
    });
}
