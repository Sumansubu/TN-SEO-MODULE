import React from "react";
import dashboardImage from "../assets/final dashboard.png";

// ============================================================
// SMALL ICONS
// ============================================================

const ArrowRight = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h14" />
        <path d="m13 5 7 7-7 7" />
    </svg>
);

const Check = () => (
    <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m5 12 4 4L19 6" />
    </svg>
);

const Play = () => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M8 5v14l11-7z" />
    </svg>
);

const Trend = () => (
    <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
    </svg>
);

const Spark = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
    </svg>
);

const UserIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
);

const SearchIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
    </svg>
);

const ChartIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 3-4 3 2 5-7" />
    </svg>
);

const UsersIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3.5 20c.6-3.7 2.5-5.5 5.5-5.5s4.9 1.8 5.5 5.5" />
        <path d="M14.5 15c2.8-.1 4.7 1.5 5.2 4" />
    </svg>
);

const LinkIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 7 20l1.1-1.1" />
    </svg>
);

const FileIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h4" />
        <path d="M9 13h6M9 17h4" />
    </svg>
);

const GearIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.5A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.6h-.2a1.7 1.7 0 0 0-1.5 1.3Z" />
    </svg>
);

const CodeIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
    </svg>
);

const GridIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
);


// ============================================================
// LOGO
// ============================================================

const Logo = () => (
    <a href="#home" className="flex items-center gap-2.5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-500">
            <div className="absolute h-5 w-5 rounded-full border border-emerald-500" />

            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
            >
                <path d="M4 17 9 12l3 3 8-9" />
                <path d="M15 6h5v5" />
            </svg>
        </div>

        <div className="leading-none">
            <div className="text-[17px] font-bold tracking-tight text-slate-900">
                TN SEO
                <sup className="ml-0.5 text-[7px]">®</sup>
            </div>

            <div className="mt-1 text-[7px] font-medium text-slate-500">
                Smarter SEO. Bigger Growth.
            </div>
        </div>
    </a>
);


// ============================================================
// DASHBOARD HERO
// ============================================================

const DashboardPreview = () => {
    return (
        <div className="relative mx-auto w-full max-w-[570px] lg:max-w-none">

            {/* Handwritten note */}
            <div className="absolute -top-10 left-8 z-20 hidden -rotate-6 lg:block">
                <div className="text-[12px] font-semibold text-slate-800">
                    Turn data into growth
                </div>

                <div className="ml-24 text-xl">↘</div>
            </div>


            {/* Floating result card */}
            <div className="absolute -right-2 -top-8 z-30 hidden rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl lg:block">
                <div className="flex items-center gap-2.5">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Trend />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-800">
                            Higher Rankings
                        </p>

                        <p className="text-[9px] text-slate-500">
                            More Customers
                        </p>

                        <p className="text-[9px] font-semibold text-emerald-600">
                            Real Growth
                        </p>
                    </div>

                </div>
            </div>


            {/* Dashboard */}
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.15)] rotate-[-3deg]">
                <img
                    src={dashboardImage}
                    alt="TN SEO dashboard"
                    className="block h-auto w-full"
                />
            </div>


            {/* Bottom annotation */}
            <div className="absolute -bottom-9 left-3 z-20 hidden lg:block">
                <div className="text-[11px] font-semibold text-slate-700">
                    Your AI SEO Assistant
                </div>

                <div className="ml-32 -mt-1 text-xl">↗</div>
            </div>

        </div>
    );
};


// ============================================================
// FEATURE ICON
// ============================================================

const FeatureIcon = ({ type }) => {
    const icons = {
        audit: <FileIcon />,
        keyword: <SearchIcon />,
        technical: <GearIcon />,
        content: <LinkIcon />,
        onpage: <FileIcon />,
        backlink: <LinkIcon />,
        ranking: <ChartIcon />,
        competitor: <UsersIcon />,
        reports: <FileIcon />,
        integrations: <GridIcon />,
        team: <UsersIcon />,
        api: <CodeIcon />,
    };

    return icons[type] || <GridIcon />;
};


// ============================================================
// FEATURE CARD
// ============================================================

const FeatureCard = ({
    type,
    title,
    description,
    color = "green",
}) => {
    const colors = {
        green: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-500",
        red: "bg-red-50 text-red-500",
        cyan: "bg-cyan-50 text-cyan-500",
    };

    return (
        <div className="group flex min-h-[105px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">

            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}
            >
                <FeatureIcon type={type} />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-[12px] font-bold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-[10px] leading-[1.45] text-slate-500">
                    {description}
                </p>
            </div>

            <div className="mt-auto self-end text-emerald-600 transition group-hover:translate-x-1">
                <ArrowRight />
            </div>

        </div>
    );
};


// ============================================================
// MAIN LANDING PAGE
// ============================================================

const LandingPage = () => {

    const navigation = [
        ["Home", "#home"],
        ["Features", "#features"],
        ["Solutions", "#solutions"],
        ["About", "#about"],
    ];

    const features = [
        {
            type: "audit",
            title: "Website Audit",
            description: "Find and fix technical issues that hurt your rankings.",
            color: "green",
        },
        {
            type: "keyword",
            title: "Keyword Research",
            description: "Discover high-value keywords with search volume and intent.",
            color: "blue",
        },
        {
            type: "technical",
            title: "Technical SEO",
            description: "Analyze crawlability, Core Web Vitals, sitemap, and more.",
            color: "purple",
        },
        {
            type: "content",
            title: "Content / AI Writer",
            description: "Create SEO-optimized content with AI.",
            color: "orange",
        },
        {
            type: "onpage",
            title: "On-Page SEO",
            description: "Optimize your pages for better visibility.",
            color: "red",
        },
        {
            type: "backlink",
            title: "Backlink Analysis",
            description: "Monitor backlinks and find new opportunities.",
            color: "cyan",
        },
        {
            type: "ranking",
            title: "Rank Tracking",
            description: "Track keyword rankings across locations and devices.",
            color: "red",
        },
        {
            type: "competitor",
            title: "Competitor Analysis",
            description: "Analyze competitors and uncover growth opportunities.",
            color: "purple",
        },
        {
            type: "reports",
            title: "SEO Reports",
            description: "Generate professional PDF, email or client links.",
            color: "orange",
        },
        {
            type: "integrations",
            title: "Integrations",
            description: "Connect Google Search Console, Analytics and more.",
            color: "blue",
        },
        {
            type: "team",
            title: "Team & Project Management",
            description: "Manage team members, client projects and workflows.",
            color: "green",
        },
        {
            type: "api",
            title: "API Access",
            description: "Integrate TN SEO with your own applications.",
            color: "blue",
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-white text-slate-900">

            {/* ======================================================
          NAVBAR
      ====================================================== */}

            <nav className="relative z-50 border-b border-slate-100 bg-white">
                <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                    <Logo />

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-7 md:flex">
                        {navigation.map(([name, link], index) => (
                            <a
                                key={name}
                                href={link}
                                className={`relative py-5 text-[10px] font-medium ${index === 0
                                        ? "text-slate-900"
                                        : "text-slate-600 hover:text-emerald-600"
                                    }`}
                            >
                                {name}

                                {index === 0 && (
                                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-emerald-600" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="hidden items-center gap-3 md:flex">
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                            className="rounded-md border border-slate-400 bg-white px-4 py-2 text-[10px] font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-600"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "/signup";
                            }}
                            className="rounded-md bg-emerald-600 px-5 py-2.5 text-[10px] font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Get Started Free
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <button className="flex flex-col gap-1 rounded-md border border-slate-200 p-2 md:hidden">
                        <span className="h-[2px] w-4 bg-slate-700" />
                        <span className="h-[2px] w-4 bg-slate-700" />
                        <span className="h-[2px] w-4 bg-slate-700" />
                    </button>

                </div>
            </nav>


            {/* ======================================================
          HERO
      ====================================================== */}

            <section
                id="home"
                className="relative overflow-hidden bg-[#f5fffb]"
            >

                {/* Background glow */}
                <div className="absolute -right-20 -top-24 h-[380px] w-[500px] rounded-full bg-emerald-100/70 blur-3xl" />
                <div className="absolute left-1/3 top-0 h-[250px] w-[350px] rounded-full bg-emerald-50 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-14">

                    {/* Left */}
                    <div className="relative z-10">

                        {/* Badge */}
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <Spark />
                            </span>

                            AI-Powered SEO Platform
                        </div>


                        {/* Heading */}
                        <h1 className="max-w-[590px] text-[39px] font-bold leading-[1.04] tracking-[-1.8px] text-slate-900 sm:text-[48px] lg:text-[52px]">

                            Analyze. Optimize.

                            <br />

                            <span className="text-emerald-600">
                                Rank Higher.
                            </span>{" "}
                            Grow Faster.

                        </h1>


                        {/* Description */}
                        <p className="mt-5 max-w-[540px] text-[13px] leading-6 text-slate-600 sm:text-[14px]">
                            All-in-one SEO platform to audit your website, find
                            opportunities, create SEO content with AI, track rankings,
                            analyze competitors and grow your organic traffic.
                        </p>


                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">

                            <button className="group flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-[11px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                                Start Free Trial

                                <span className="transition group-hover:translate-x-1">
                                    <ArrowRight />
                                </span>
                            </button>

                            <button className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-[11px] font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-600">

                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                                    <Play />
                                </span>

                                Watch Demo

                            </button>

                        </div>


                        {/* Trust points */}
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">

                            {[
                                "No credit card required",
                                "Free plan available",
                                "Trusted by 1,000+ users",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-1.5 text-[9px] font-medium text-slate-600"
                                >
                                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-600 text-white">
                                        <Check />
                                    </span>

                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>


                    {/* Right */}
                    <div className="relative z-10 mt-6 lg:mt-0  ">
                        <DashboardPreview />
                    </div>

                </div>
            </section>


            {/* ======================================================
          FEATURES
      ====================================================== */}

            <section id="features" className="bg-white py-10 sm:py-12">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">

                        <h2 className="text-[22px] font-bold tracking-tight text-slate-900 sm:text-[25px]">
                            Everything You Need to Succeed in SEO
                        </h2>

                        <p className="mt-1 text-[11px] text-slate-500">
                            Powerful tools. Actionable insights. Real results. All in one platform.
                        </p>

                    </div>


                    {/* Feature cards */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.title}
                                type={feature.type}
                                title={feature.title}
                                description={feature.description}
                                color={feature.color}
                            />
                        ))}

                    </div>

                </div>
            </section>


            {/* ======================================================
          STATISTICS
      ====================================================== */}

            <section className="relative overflow-hidden bg-[#004f42] py-6 sm:py-7">

                {/* Decorative background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -left-20 bottom-0 h-32 w-[450px] rounded-[50%] border border-emerald-300/50" />
                    <div className="absolute -left-10 bottom-[-35px] h-32 w-[450px] rounded-[50%] border border-emerald-300/40" />
                    <div className="absolute right-[-50px] top-[-60px] h-48 w-48 rounded-full border border-emerald-300/30" />
                </div>

                <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 sm:px-6 md:grid-cols-4 lg:px-8">

                    {/* Stat */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/60 text-white">
                            <UserIcon />
                        </div>

                        <div>
                            <p className="text-[21px] font-bold leading-none text-white">
                                1,000+
                            </p>

                            <p className="mt-1 text-[9px] text-emerald-100">
                                Active Users
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/60 text-white">
                            <SearchIcon />
                        </div>

                        <div>
                            <p className="text-[21px] font-bold leading-none text-white">
                                10M+
                            </p>

                            <p className="mt-1 text-[9px] text-emerald-100">
                                Web Pages Analyzed
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/60 text-white">
                            <Trend />
                        </div>

                        <div>
                            <p className="text-[21px] font-bold leading-none text-white">
                                250K+
                            </p>

                            <p className="mt-1 text-[9px] text-emerald-100">
                                Keywords Tracked
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/60 text-white">
                            <Check />
                        </div>

                        <div>
                            <p className="text-[21px] font-bold leading-none text-white">
                                98%
                            </p>

                            <p className="mt-1 text-[9px] text-emerald-100">
                                User Satisfaction
                            </p>
                        </div>
                    </div>

                </div>


                {/* Handwritten note */}
                <div className="absolute right-7 top-1/2 hidden -translate-y-1/2 rotate-[-5deg] lg:block">
                    <p className="text-[12px] font-semibold italic text-white">
                        Real tools
                    </p>
                    <p className="text-[12px] font-semibold italic text-white">
                        Real results
                    </p>
                    <div className="text-emerald-300">↙</div>
                </div>

            </section>


            {/* ======================================================
          HOW IT WORKS
      ====================================================== */}

            <section id="solutions" className="bg-white py-9 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <h2 className="text-[23px] font-bold text-slate-900">
                            How It Works
                        </h2>

                        <p className="mt-1 text-[11px] text-slate-500">
                            Get started in minutes and see results.
                        </p>

                    </div>


                    {/* Steps */}
                    <div className="mt-7 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">

                        {/* Step 1 */}
                        <div className="flex h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <UserIcon />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8px] font-bold text-white">
                                        1
                                    </span>

                                    <h3 className="truncate text-[10px] font-bold text-slate-900">
                                        Create Your Account
                                    </h3>
                                </div>

                                <p className="mt-1 text-[9px] text-slate-500">
                                    Sign up and add your website.
                                </p>
                            </div>
                        </div>


                        {/* Arrow */}
                        <div className="hidden text-[20px] font-light text-slate-300 md:block">
                            →
                        </div>


                        {/* Step 2 */}
                        <div className="flex h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <SearchIcon />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8px] font-bold text-white">
                                        2
                                    </span>

                                    <h3 className="truncate text-[10px] font-bold text-slate-900">
                                        Run Analysis
                                    </h3>
                                </div>

                                <p className="mt-1 text-[9px] text-slate-500">
                                    Get detailed SEO insights.
                                </p>
                            </div>
                        </div>


                        {/* Arrow */}
                        <div className="hidden text-[20px] font-light text-slate-300 md:block">
                            →
                        </div>


                        {/* Step 3 */}
                        <div className="flex h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <FileIcon />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8px] font-bold text-white">
                                        3
                                    </span>

                                    <h3 className="truncate text-[10px] font-bold text-slate-900">
                                        Take Action
                                    </h3>
                                </div>

                                <p className="mt-1 text-[9px] text-slate-500">
                                    Fix issues and optimize with AI.
                                </p>
                            </div>
                        </div>


                        {/* Arrow */}
                        <div className="hidden text-[20px] font-light text-slate-300 md:block">
                            →
                        </div>


                        {/* Step 4 */}
                        <div className="flex h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <ChartIcon />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8px] font-bold text-white">
                                        4
                                    </span>

                                    <h3 className="truncate text-[10px] font-bold text-slate-900">
                                        Grow & Track
                                    </h3>
                                </div>

                                <p className="mt-1 text-[9px] text-slate-500">
                                    Monitor progress and rank higher.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* ==================================================
              AI INSIGHTS
          ================================================== */}

                    <div className="relative mt-5 overflow-hidden rounded-xl border border-emerald-100 bg-[#effcf6] px-5 py-6 sm:px-7">

                        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-100 blur-3xl" />
                        <div className="absolute -bottom-20 left-20 h-44 w-44 rounded-full bg-emerald-100 blur-3xl" />


                        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_1fr]">

                            {/* Left */}
                            <div>

                                <div className="flex items-start gap-3">

                                    <div className="mt-1 text-emerald-600">
                                        <UsersIcon />
                                    </div>

                                    <div>
                                        <h3 className="text-[17px] font-bold leading-tight text-slate-900">
                                            AI-Powered
                                            <br />
                                            <span className="text-emerald-600">
                                                Insights for Smarter Decisions
                                            </span>
                                        </h3>
                                    </div>

                                </div>


                                <p className="mt-3 max-w-md text-[10px] leading-5 text-slate-600">
                                    Our AI analyzes your website, competitors and market trends
                                    to give you personalized recommendations that actually work.
                                </p>


                                <div className="mt-3 space-y-2">

                                    {[
                                        "Actionable SEO suggestions",
                                        "Content ideas that rank",
                                        "Competitor gap analysis",
                                        "Continuous learning & improvements",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-[9px] text-slate-600"
                                        >
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                                                <Check />
                                            </span>

                                            {item}
                                        </div>
                                    ))}

                                </div>

                            </div>


                            {/* AI recommendation card */}
                            <div className="relative">

                                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <Spark />
                                            </span>

                                            <span className="text-[10px] font-bold text-slate-800">
                                                AI Recommendation
                                            </span>
                                        </div>

                                    </div>


                                    <div className="mt-3 space-y-2">

                                        {[
                                            ["4", "Fix 4 critical technical issues", "High"],
                                            ["12", "Add 12 new content opportunities", "High"],
                                            ["9", "Build backlinks from 20 relevant domains", "Medium"],
                                            ["8", "Optimize meta titles for 18 pages", "Medium"],
                                            ["4", "Target long-tail keywords in your niche", "Low"],
                                        ].map(([number, text, priority]) => (
                                            <div
                                                key={text}
                                                className="flex items-center gap-2 text-[8px]"
                                            >

                                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                    {number}
                                                </span>

                                                <span className="flex-1 text-slate-600">
                                                    {text}
                                                </span>

                                                <span
                                                    className={`rounded px-1.5 py-0.5 font-semibold ${priority === "High"
                                                            ? "bg-red-50 text-red-500"
                                                            : priority === "Medium"
                                                                ? "bg-orange-50 text-orange-500"
                                                                : "bg-emerald-50 text-emerald-600"
                                                        }`}
                                                >
                                                    {priority}
                                                </span>

                                            </div>
                                        ))}

                                    </div>


                                    <button className="mt-3 flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-[9px] font-semibold text-white">
                                        View All Recommendations
                                        <ArrowRight />
                                    </button>

                                </div>


                                {/* Floating AI badge */}
                                <div className="absolute -bottom-4 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                                    <span className="text-sm font-bold">AI</span>
                                </div>

                            </div>

                        </div>


                        {/* Handwritten annotation */}
                        <div className="absolute right-7 top-7 hidden rotate-[-7deg] lg:block">
                            <p className="text-[11px] font-semibold text-slate-700">
                                Your
                            </p>

                            <p className="text-[11px] font-semibold text-slate-700">
                                AI SEO Assistant
                            </p>

                            <div className="ml-3 text-xl">↙</div>
                        </div>

                    </div>

                </div>
            </section>


            {/* ======================================================
          TESTIMONIALS
      ====================================================== */}

            <section className="bg-white py-8">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <h2 className="text-[22px] font-bold text-slate-900">
                            What Our Users Say
                        </h2>

                        <p className="mt-1 text-[10px] text-slate-500">
                            Real people. Real results.
                        </p>

                    </div>


                    <div className="mt-5 grid gap-3 md:grid-cols-3">

                        {[
                            {
                                quote:
                                    "TN SEO has completely changed the way we handle SEO for our clients. The AI recommendations are spot on!",
                                name: "Rohit Sharma",
                                role: "Digital Marketing Agency",
                                initials: "RS",
                            },
                            {
                                quote:
                                    "The best SEO tool I've used so far. Clean interface, powerful features and super helpful reports.",
                                name: "Priya Mehta",
                                role: "Freelance SEO Consultant",
                                initials: "PM",
                            },
                            {
                                quote:
                                    "Our organic traffic increased by 60% in just 3 months using TN SEO. Highly recommended!",
                                name: "Amit Verma",
                                role: "E-commerce Business Owner",
                                initials: "AV",
                            },
                        ].map((review) => (
                            <div
                                key={review.name}
                                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                            >

                                <div className="text-[12px] tracking-[1px] text-amber-400">
                                    ★★★★★
                                </div>

                                <p className="mt-3 text-[9px] leading-[1.6] text-slate-600">
                                    "{review.quote}"
                                </p>

                                <div className="mt-4 flex items-center gap-2.5">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[9px] font-semibold text-slate-700">
                                        {review.initials}
                                    </div>

                                    <div>
                                        <p className="text-[9px] font-bold text-slate-800">
                                            {review.name}
                                        </p>

                                        <p className="text-[8px] text-slate-500">
                                            {review.role}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* ======================================================
          FINAL CTA
      ====================================================== */}

            <section className="relative overflow-hidden bg-[#003f35] py-9">

                {/* Decorative background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -bottom-24 left-0 h-44 w-[600px] rounded-[50%] border border-emerald-300/50" />
                    <div className="absolute -bottom-36 left-20 h-44 w-[600px] rounded-[50%] border border-emerald-300/40" />
                    <div className="absolute right-10 top-[-100px] h-52 w-52 rounded-full border border-emerald-300/30" />
                </div>

                <div className="relative mx-auto max-w-3xl px-5 text-center">

                    <h2 className="text-[22px] font-bold text-white sm:text-[25px]">
                        Ready to Grow Your Online Presence?
                    </h2>

                    <p className="mt-2 text-[10px] text-emerald-100">
                        Join thousands of businesses using TN SEO to rank higher and get more traffic.
                    </p>


                    <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">

                        <button className="group flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-[10px] font-semibold text-white shadow-lg transition hover:bg-emerald-400">
                            Start Free Trial

                            <span className="transition group-hover:translate-x-1">
                                <ArrowRight />
                            </span>
                        </button>

                        <button className="rounded-md border border-white/60 bg-transparent px-7 py-3 text-[10px] font-semibold text-white transition hover:bg-white hover:text-slate-900">
                            Book a Demo
                        </button>

                    </div>

                </div>


            </section>


            {/* ======================================================
          FOOTER
      ====================================================== */}

            <footer className="border-t border-slate-100 bg-white">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center sm:px-6 md:flex-row lg:px-8">

                    {/* Logo */}
                    <Logo />




                </div>
                <div className="flex items-center gap-4">



                    <span className="hidden h-4 w-px bg-slate-200 sm:block" />

                    <p className="text-[10px] text-slate-1000 mx-auto flex max-w-7xl flex-col items-center justify-center sm:px-6 md:flex-row lg:px-8">
                        © 2026 TN SEO. All rights reserved.
                    </p>

                </div>
            </footer>

        </div>
    );
};

export default LandingPage;