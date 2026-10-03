import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import dashboardImage from "../assets/final dashboard.png";

/* =========================
   ICONS
========================= */

function LogoIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle
        cx="21"
        cy="21"
        r="18"
        stroke="#16A66A"
        strokeWidth="3"
      />
      <path
        d="M12 28L29 11"
        stroke="#16A66A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 11H29V18"
        stroke="#16A66A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17C15 13.5 18 11.5 21 11"
        stroke="#16A66A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 24C12 27 14 29 17 30"
        stroke="#16A66A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-[#159A61] text-white">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  if (hidden) {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.8 4.3A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6a15 15 0 0 1-3.1 3.7" />
        <path d="M6.2 6.2C4.5 7.4 3.3 9 2.5 10c1 2 4.5 6 9.5 6 1 0 1.9-.2 2.8-.5" />
      </svg>
    );
  }

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.68-.06-1.34-.18-1.97H12v3.73h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.85-1.7 2.91-4.2 2.91-7.15Z"
      />
      <path
        fill="#34A853"
        d="M12 21.65c2.65 0 4.87-.88 6.49-2.38l-3.15-2.45c-.88.59-2 .94-3.34.94-2.57 0-4.75-1.73-5.53-4.06H3.22v2.53A9.8 9.8 0 0 0 12 21.65Z"
      />
      <path
        fill="#FBBC05"
        d="M6.47 13.7a5.9 5.9 0 0 1 0-3.4V7.77H3.22a9.8 9.8 0 0 0 0 8.46l3.25-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.24c1.45 0 2.75.5 3.77 1.48l2.82-2.82C16.87 3.35 14.65 2.35 12 2.35a9.8 9.8 0 0 0-8.78 5.42l3.25 2.53C7.25 7.97 9.43 6.24 12 6.24Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.05 12.54c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.38-2.4-1.57-2.92-1.59-1.23-.13-2.42.73-3.04.73-.64 0-1.61-.72-2.65-.7-1.35.02-2.61.8-3.3 2.01-1.42 2.47-.36 6.1 1 8.1.68.98 1.47 2.08 2.51 2.04 1.01-.04 1.39-.65 2.61-.65 1.21 0 1.56.65 2.62.63 1.09-.02 1.78-.98 2.44-1.97.78-1.12 1.09-2.21 1.11-2.27-.03-.01-2.08-.8-2.1-3.29ZM15.06 6.61c.55-.69.93-1.64.83-2.61-.8.03-1.8.55-2.37 1.23-.51.6-.97 1.58-.86 2.5.9.07 1.83-.46 2.4-1.12Z" />
    </svg>
  );
}

/* =========================
   LOGIN + SIGNUP PAGE
========================= */

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register } = useAuth();

  const [isSignup, setIsSignup] = useState(
    searchParams.get("mode") === "signup"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice] = useState(
    location.state?.from ? "Please log in to continue." : ""
  );
  const [success, setSuccess] = useState(
    location.state?.loggedOut ? "You have been logged out successfully." : ""
  );

  /* Where to go after authenticating (deep link, otherwise dashboard). */
  const destination = (() => {
    const from = location.state?.from;
    return from && !from.startsWith("/login") ? from : "/dashboard";
  })();

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const email = formData.email.trim();

    if (!email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email,
        password: formData.password,
        rememberMe,
      });

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SIGNUP
  ========================= */

  const handleSignup = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!PASSWORD_PATTERN.test(formData.password)) {
      setError(
        "Password must be at least 8 characters and include at least one letter and one number."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: name,
        email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err?.message || "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SWITCH LOGIN / SIGNUP
  ========================= */

  const switchMode = (signupMode) => {
    setIsSignup(signupMode);
    setError("");
    setSuccess("");

    if (searchParams.get("mode")) {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5faf8] text-[#10212b]">
      <div className="grid min-h-screen lg:grid-cols-[55%_45%]">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#f7fcfa] via-[#effaf5] to-[#dff7eb] px-7 py-8 sm:px-10 lg:px-14 xl:px-20">

          {/* Background shapes */}

          <div className="pointer-events-none absolute -right-32 top-8 h-[480px] w-[480px] rounded-full border-[70px] border-[#c9f2df]/50" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full border-[75px] border-[#d0f5e3]/60" />

          <div className="pointer-events-none absolute right-[-80px] top-[390px] h-[260px] w-[520px] rotate-[-15deg] rounded-[50%] bg-[#c8f2dd]/35" />

          <div className="relative z-10 mx-auto max-w-[780px]">

            {/* Logo */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-12 flex items-center gap-3 text-left"
            >
              <LogoIcon />

              <div>
                <div className="text-[27px] font-extrabold leading-none tracking-[-1.5px] text-[#111820]">
                  TN SEO
                  <sup className="ml-0.5 text-[8px]">®</sup>
                </div>

                <div className="mt-1 text-[11px] font-medium tracking-wide text-[#3c4245]">
                  Smarter SEO. Bigger Growth.
                </div>
              </div>
            </button>

            {/* Badge */}

            <div className="mb-5 inline-flex rounded-full bg-[#d8f6e7] px-4 py-2 text-[12px] font-bold text-[#168653] shadow-sm">
              #1 AI-Powered SEO Platform
            </div>

            {/* Heading */}

            <h1 className="max-w-[690px] text-[42px] font-extrabold leading-[1.06] tracking-[-2px] text-[#101c29] sm:text-[50px] lg:text-[49px] xl:text-[56px]">
              Analyze. Optimize.
              <br />
              <span className="text-[#0da866]">
                Rank Higher.
              </span>{" "}
              Grow Faster.
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-[690px] text-[15px] leading-6 text-[#4d5961] sm:text-[16px]">
              All-in-one SEO platform to audit your website, find
              opportunities, create SEO content with AI, track
              rankings, analyze competitors and grow your organic
              traffic.
            </p>

            {/* Benefits */}

            <div className="mt-6 space-y-2.5">

              <div className="flex items-center gap-3 text-[14px] text-[#3e4b52]">
                <CheckIcon />
                <span>Trusted by 1,000+ businesses</span>
              </div>

              <div className="flex items-center gap-3 text-[14px] text-[#3e4b52]">
                <CheckIcon />
                <span>No credit card required</span>
              </div>

              <div className="flex items-center gap-3 text-[14px] text-[#3e4b52]">
                <CheckIcon />
                <span>Free plan available</span>
              </div>

              <div className="flex items-center gap-3 text-[14px] text-[#3e4b52]">
                <CheckIcon />
                <span>
                  All essential SEO tools in one place
                </span>
              </div>

            </div>

            {/* Dashboard */}

            <div className="relative mt-8 w-full">

              <div className="absolute -bottom-8 left-[8%] right-[8%] h-20 rounded-full bg-[#8be1bc]/25 blur-3xl" />

              <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-white shadow-[0_25px_55px_rgba(24,104,74,0.18)]">

                <img
                  src={dashboardImage}
                  alt="TN SEO Dashboard"
                  className="block h-auto w-full object-cover"
                />

              </div>
            </div>

          </div>
        </section>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7faf9] px-5 py-10 sm:px-8">

          {/* Background shapes */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border-[45px] border-[#d9f5e8]" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border-[50px] border-[#e6f8ef]" />

          {/* Card */}

          <div className="relative z-10 w-full max-w-[520px] rounded-[17px] border border-[#e6ebe9] bg-white px-7 py-7 shadow-[0_12px_45px_rgba(25,65,50,0.07)] sm:px-10 sm:py-9">

            {/* =========================
                TABS
            ========================= */}

            <div className="mb-7 grid grid-cols-2 border-b border-[#e4e8e6]">

              <button
                type="button"
                onClick={() => switchMode(false)}
                className={`relative pb-4 text-[15px] transition ${
                  !isSignup
                    ? "font-bold text-[#15945d]"
                    : "font-medium text-[#66727a] hover:text-[#15945d]"
                }`}
              >
                Sign In

                {!isSignup && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#15945d]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => switchMode(true)}
                className={`relative pb-4 text-[15px] transition ${
                  isSignup
                    ? "font-bold text-[#15945d]"
                    : "font-medium text-[#66727a] hover:text-[#15945d]"
                }`}
              >
                Create Account

                {isSignup && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#15945d]" />
                )}
              </button>

            </div>

            {/* =========================
                HEADING
            ========================= */}

            <div className="mb-6">

              <h2 className="text-[28px] font-bold tracking-[-0.8px] text-[#111b27]">
                {isSignup
                  ? "Create Your Account"
                  : "Welcome Back"}
              </h2>

              <p className="mt-1 text-[14px] leading-6 text-[#69757c]">
                {isSignup
                  ? "Start improving your website's SEO with TN SEO."
                  : "Sign in to your TN SEO account and continue growing your online presence."}
              </p>

            </div>

            {/* =========================
                SOCIAL LOGIN
            ========================= */}

            <div className="space-y-2.5">

              <button
                type="button"
                onClick={() => {
                  alert(
                    "Google authentication will be connected later."
                  );
                }}
                className="flex h-[47px] w-full items-center justify-center gap-3 rounded-[7px] border border-[#dfe4e2] bg-white text-[14px] font-medium text-[#273038] transition hover:bg-[#f8faf9]"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(
                    "Apple authentication will be connected later."
                  );
                }}
                className="flex h-[47px] w-full items-center justify-center gap-3 rounded-[7px] border border-[#dfe4e2] bg-white text-[14px] font-medium text-[#273038] transition hover:bg-[#f8faf9]"
              >
                <AppleIcon />
                Continue with Apple
              </button>

            </div>

            {/* OR */}

            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#e4e8e6]" />

              <span className="text-[13px] font-medium text-[#7b858b]">
                OR
              </span>

              <div className="h-px flex-1 bg-[#e4e8e6]" />

            </div>

            {/* =========================
                ERROR
            ========================= */}

            {notice && !error && !success && (
              <div
                role="status"
                className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700"
              >
                {notice}
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700"
              >
                {success}
              </div>
            )}

            {/* =========================
                FORM
            ========================= */}

            <form
              onSubmit={
                isSignup ? handleSignup : handleLogin
              }
              aria-busy={loading}
            >

              {/* NAME - ONLY SIGNUP */}

              {isSignup && (
                <div className="mb-4">

                  <label
                    htmlFor="name"
                    className="mb-2 block text-[13px] font-semibold text-[#263039]"
                  >
                    Full Name
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#839097]">
                      <UserIcon />
                    </div>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-4 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                    />

                  </div>
                </div>
              )}

              {/* EMAIL */}

              <div className="mb-4">

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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-4 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                  />

                </div>
              </div>

              {/* PASSWORD */}

              <div className="mb-4">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-[13px] font-semibold text-[#263039]"
                  >
                    Password
                  </label>

                  {!isSignup && (
                    <button
                      type="button"
                      onClick={() => {
                        alert(
                          "Password reset functionality will be connected later."
                        );
                      }}
                      className="text-[12px] font-semibold text-[#15945d] hover:text-[#087b48]"
                    >
                      Forgot password?
                    </button>
                  )}

                </div>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#839097]">
                    <LockIcon />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      isSignup
                        ? "Create a password"
                        : "Enter your password"
                    }
                    autoComplete={
                      isSignup
                        ? "new-password"
                        : "current-password"
                    }
                    className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-12 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#89949a] hover:text-[#15945d]"
                  >
                    <EyeIcon hidden={showPassword} />
                  </button>

                </div>
              </div>

              {/* CONFIRM PASSWORD - ONLY SIGNUP */}

              {isSignup && (
                <div className="mb-4">

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-[13px] font-semibold text-[#263039]"
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
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="h-[49px] w-full rounded-[7px] border border-[#dce2df] bg-white pl-12 pr-12 text-[14px] text-[#172028] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#16a365] focus:ring-2 focus:ring-[#16a365]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#89949a] hover:text-[#15945d]"
                    >
                      <EyeIcon
                        hidden={showConfirmPassword}
                      />
                    </button>

                  </div>
                </div>
              )}

              {/* LOGIN OPTIONS */}

              {!isSignup && (
                <label className="mb-6 flex cursor-pointer items-center gap-2.5">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="h-[18px] w-[18px] cursor-pointer rounded border-[#cbd5d0] accent-[#15945d]"
                  />

                  <span className="text-[13px] font-medium text-[#4f5b61]">
                    Keep me signed in
                  </span>

                </label>
              )}

              {/* TERMS - SIGNUP */}

              {isSignup && (
                <label className="mb-6 flex cursor-pointer items-start gap-2.5">

                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(event) =>
                      setAgreeTerms(event.target.checked)
                    }
                    className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer accent-[#15945d]"
                  />

                  <span className="text-[12px] leading-5 text-[#66727a]">
                    I agree to the{" "}
                    <span className="font-semibold text-[#15945d]">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#15945d]">
                      Privacy Policy
                    </span>
                    .
                  </span>

                </label>
              )}

              {/* MAIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#079b59] text-[15px] font-bold text-white shadow-[0_7px_18px_rgba(7,155,89,0.18)] transition hover:bg-[#07894f] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    {isSignup
                      ? "Creating Account..."
                      : "Signing In..."}
                  </>
                ) : (
                  <>
                    {isSignup
                      ? "Create Account"
                      : "Sign In"}

                    <ArrowRightIcon />
                  </>
                )}

              </button>

            </form>

            {/* =========================
                SWITCH ACCOUNT MODE
            ========================= */}

            <div className="mt-6 text-center">

              <span className="text-[13px] text-[#59656c]">
                {isSignup
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </span>

              <button
                type="button"
                onClick={() =>
                  switchMode(!isSignup)
                }
                className="text-[13px] font-bold text-[#15945d] hover:text-[#087b48]"
              >
                {isSignup
                  ? "Sign In"
                  : "Create Account"}
              </button>

            </div>

            {/* =========================
                SECURITY
            ========================= */}

            <div className="mt-6 flex items-center gap-4 rounded-[12px] bg-[#eafaf2] px-5 py-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d5f4e4] text-[#12965a]">
                <ShieldIcon />
              </div>

              <div>

                <h3 className="text-[13px] font-bold text-[#1f4937]">
                  Your data is secure
                </h3>

                <p className="mt-0.5 text-[11px] leading-5 text-[#668076]">
                  We use industry-standard encryption to keep
                  your information safe.
                </p>

              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Login;