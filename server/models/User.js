import mongoose from "mongoose";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required."],
            trim: true,
            minlength: [2, "Full name must be at least 2 characters."],
            maxlength: [80, "Full name must be at most 80 characters."],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true, // creates a unique index so duplicate accounts are impossible
            lowercase: true,
            trim: true,
            match: [EMAIL_PATTERN, "Please provide a valid email address."],
        },
        passwordHash: {
            type: String,
            required: function () {
                return !this.googleId; // Google accounts have no local password
            },
            select: false, // never returned unless explicitly requested
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, // local-only users have no googleId
        },
        avatar: {
            type: String,
            default: "",
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        passwordResetTokenHash: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true } // adds createdAt + updatedAt
);

/** Public representation of a user - never includes the password hash. */
userSchema.methods.toPublic = function () {
    return {
        id: this._id.toString(),
        fullName: this.fullName,
        email: this.email,
        avatar: this.avatar || "",
        authProvider: this.authProvider || "local",
        createdAt: this.createdAt,
    };
};

export default mongoose.model("User", userSchema);
