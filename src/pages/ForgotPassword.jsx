import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService.js";
import BrandMark from "../components/BrandLogo.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function MailIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const value = email.trim();

        if (!value || !EMAIL_PATTERN.test(value)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const data = await forgotPassword(value);
            setResult(data);
        } catch (err) {
            setError(err?.message || "Unable to send the reset link. Please try again.");
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
                        Forgot your password?
                    </h1>

                    <p className="mt-1 text-[14px] leading-6 text-[#69757c]">
                        Enter the email for your account and we'll send you a
                        link to set a new password.
                    </p>

                    {error && (
                        <div
                            role="alert"
                            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    {result && (
                        <div
                            role="status"
                            className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700"
                        >
                            {result.message}

                            {result.devResetUrl && (
                                <div className="mt-3 rounded-lg border border-emerald-200 bg-white px-3 py-3 text-[#273038]">
                                    <p className="text-[12px] font-bold uppercase tracking-wide text-[#15945d]">
                                        Development mode (no email server)
                                    </p>
                                    <a
                                        href={result.devResetUrl}
                                        className="mt-1.5 inline-flex items-center gap-2 rounded-[7px] bg-[#079b59] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#07894f]"
                                    >
                                        Open reset link
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6" aria-busy={loading}>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-[13px] font-semibold text-[#263039]"
                        >
                            Email Address
                        </label>

                        <div className="relative">

                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#839097]">
                                <MailIcon />
                            </div>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setError("");
                                }}
                                placeholder="Enter your email address"
                                autoComplete="email"
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
                                    Sending...
                                </>
                            ) : (
                                "Send reset link"
                            )}
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-[13px] text-[#59656c]">
                            Remembered it?{" "}
                        </span>

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
