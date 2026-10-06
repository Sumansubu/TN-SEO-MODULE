import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authService.js";
import BrandMark from "../components/BrandLogo.jsx";

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function LockIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!password) {
            setError("Please enter a new password.");
            return;
        }

        if (!PASSWORD_PATTERN.test(password)) {
            setError("Password must be at least 8 characters and include at least one letter and one number.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await resetPassword({ token, password, confirmPassword });
            navigate("/login", {
                replace: true,
                state: { success: "Password updated successfully. Please sign in." },
            });
        } catch (err) {
            setError(err?.message || "Unable to reset the password. Please request a new link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5faf8] px-5 py-10">
            <div className="w-full max-w-[520px]">

                {/* Brand */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mb-7 flex items-center gap-3 text-left"
                >
                    <BrandMark size={42} />

                    <div>
                        <div className="text-[22px] font-extrabold leading-none tracking-[-1.2px] text-[#111820]">
                            TN SEO
                            <sup className="ml-0.5 text-[8px]">®</sup>
                        </div>

                        <div className="mt-1 text-[10px] font-medium tracking-wide text-[#3c4245]">
                            Smarter SEO. Bigger Growth.
                        </div>
                    </div>
                </button>

                <div className="rounded-[17px] border border-[#e6ebe9] bg-white px-7 py-7 shadow-[0_12px_45px_rgba(25,65,50,0.07)] sm:px-10 sm:py-9">

                    <h1 className="text-[28px] font-bold tracking-[-0.8px] text-[#111b27]">
                        Set a new password
                    </h1>

                    <p className="mt-1 text-[14px] leading-6 text-[#69757c]">
                        Choose a strong password for your TN SEO account.
                    </p>

                    {error && (
                        <div
                            role="alert"
                            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6" aria-busy={loading}>

                        <label
                            htmlFor="password"
                            className="mb-2 block text-[13px] font-semibold text-[#263039]"
                        >
                            New Password
                        </label>

                        <div className="relative">

                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#839097]">
                                <LockIcon />
                            </div>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setError("");
                                }}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-4 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                            />

                        </div>

                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 mt-4 block text-[13px] font-semibold text-[#263039]"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">

                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#839097]">
                                <LockIcon />
                            </div>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
                                    setError("");
                                }}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-4 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#079b59] text-[15px] font-bold text-white shadow-[0_7px_18px_rgba(7,155,89,0.18)] transition hover:bg-[#07894f] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Updating...
                                </>
                            ) : (
                                "Update password"
                            )}
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-[13px] font-semibold text-[#15945d] hover:text-[#087b48]"
                        >
                            Back to sign in
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}
