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
            required: true,
            select: false, // never returned unless explicitly requested
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
        createdAt: this.createdAt,
    };
};

export default mongoose.model("User", userSchema);
