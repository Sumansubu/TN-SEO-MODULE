import React, { useMemo, useState } from "react";
/* =========================================================
   TN SEO - WEBSITE AUDIT
   Single-file Website Audit implementation

   Includes:
   - Summary
   - Top Issues to Fix sub-page
   - Pages Overview sub-page
   - Content
   - Technical
   - Performance
   - Security
   - Recommendations
   - Search / filters / pagination
   - CSV export
   - Sitemap
   - Share report
   - Dynamic profile
========================================================= */


/* =========================================================
   DATA
========================================================= */

const auditTabs = [
  "Summary",
  "Issues (40)",
  "Pages (124)",
  "Content",
  "Technical",
  "Performance",
  "Security",
  "Recommendations",
];

const issueData = [
  {
    id: 1,
    title: "Meta description is too short",
    affected: "12 pages affected",
    affectedPages: 12,
    severity: "Critical",
    category: "Meta",
    impact: "High",
    status: "Open",
    pageUrl: "/blog/ai-seo-tools",
  },
  {
    id: 2,
    title: "Primary keyword not in H1",
    affected: "8 pages affected",
    affectedPages: 8,
    severity: "Critical",
    category: "HTML",
    impact: "High",
    status: "Open",
    pageUrl: "/services/seo",
  },
  {
    id: 3,
    title: "Images without alt text",
    affected: "28 pages affected",
    affectedPages: 28,
    severity: "High",
    category: "Images",
    impact: "Medium",
    status: "Open",
    pageUrl: "/blog/ai-seo-tools",
  },
  {
    id: 4,
    title: "Broken internal links",
    affected: "6 pages affected",
    affectedPages: 6,
    severity: "High",
    category: "Internal Links",
    impact: "Medium",
    status: "Open",
    pageUrl: "/technical-seo",
  },
  {
    id: 5,
    title: "Slow page speed (mobile)",
    affected: "9 pages affected",
    affectedPages: 9,
    severity: "High",
    category: "Performance",
    impact: "Medium",
    status: "Open",
    pageUrl: "/contact",
  },
  {
    id: 6,
    title: "Duplicate title tags",
    affected: "14 pages affected",
    affectedPages: 14,
    severity: "Medium",
    category: "Content",
    impact: "Low",
    status: "Open",
    pageUrl: "/pricing",
  },
  {
    id: 7,
    title: "Low word count pages",
    affected: "9 pages affected",
    affectedPages: 9,
    severity: "Medium",
    category: "Content",
    impact: "Low",
    status: "Open",
    pageUrl: "/on-page-seo",
  },
  {
    id: 8,
    title: "Missing structured data",
    affected: "5 pages affected",
    affectedPages: 5,
    severity: "Medium",
    category: "Technical",
    impact: "Low",
    status: "Open",
    pageUrl: "/blog/seo-strategies",
  },
  {
    id: 9,
    title: "Canonical tag missing",
    affected: "7 pages affected",
    affectedPages: 7,
    severity: "Low",
    category: "Technical",
    impact: "Low",
    status: "Open",
    pageUrl: "/services/seo",
  },
  {
    id: 10,
    title: "Redirect chain detected",
    affected: "3 pages affected",
    affectedPages: 3,
    severity: "Low",
    category: "Technical",
    impact: "Low",
    status: "Open",
    pageUrl: "/old-blog",
  },
];

const pageData = [
  {
    id: 1,
    url: "/blog/ai-seo-tools",
    type: "Blog",
    issues: 3,
    health: 88,
    speed: 82,
    date: "Sep 15, 2026",
  },
  {
    id: 2,
    url: "/services/seo",
    type: "Service",
    issues: 5,
    health: 76,
    speed: 68,
    date: "Sep 15, 2026",
  },
  {
    id: 3,
    url: "/technical-seo",
    type: "Blog",
    issues: 2,
    health: 92,
    speed: 89,
    date: "Sep 15, 2026",
  },
  {
    id: 4,
    url: "/contact",
    type: "Other",
    issues: 1,
    health: 95,
    speed: 91,
    date: "Sep 15, 2026",
  },
  {
    id: 5,
    url: "/pricing",
    type: "Service",
    issues: 4,
    health: 81,
    speed: 75,
    date: "Sep 15, 2026",
  },
  {
    id: 6,
    url: "/on-page-seo",
    type: "Blog",
    issues: 6,
    health: 58,
    speed: 64,
    date: "Sep 15, 2026",
  },
  {
    id: 7,
    url: "/backlink-analysis",
    type: "Blog",
    issues: 4,
    health: 83,
    speed: 71,
    date: "Sep 15, 2026",
  },
  {
    id: 8,
    url: "/competitor-analysis",
    type: "Blog",
    issues: 5,
    health: 70,
    speed: 77,
    date: "Sep 15, 2026",
  },
  {
    id: 9,
    url: "/about",
    type: "Other",
    issues: 2,
    health: 90,
    speed: 86,
    date: "Sep 15, 2026",
  },
  {
    id: 10,
    url: "/blog/seo-strategies",
    type: "Blog",
    issues: 4,
    health: 79,
    speed: 73,
    date: "Sep 15, 2026",
  },
];

const sectionRows = [
  {
    name: "Content Analysis",
    score: 82,
    issues: 8,
    status: "Good",
    icon: "content",
    tab: "Content",
  },
  {
    name: "HTML Elements",
    score: 78,
    issues: 6,
    status: "Good",
    icon: "code",
    tab: "Technical",
  },
  {
    name: "Images",
    score: 68,
    issues: 10,
    status: "Needs Improvement",
    icon: "image",
    tab: "Technical",
  },
  {
    name: "Internal Links",
    score: 74,
    issues: 8,
    status: "Good",
    icon: "link",
    tab: "Technical",
  },
  {
    name: "Page Speed",
    score: 81,
    issues: 8,
    status: "Good",
    icon: "speed",
    tab: "Performance",
  },
  {
    name: "Security & Misc",
    score: 92,
    issues: 0,
    status: "Excellent",
    icon: "shield",
    tab: "Security",
  },
];


/* =========================================================
   ICON
========================================================= */

function Icon({
  name,
  size = 16,
  strokeWidth = 1.8,
}) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    audit: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 12h6M9 16h4" />
      </>
    ),

    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 5 5" />
      </>
    ),

    technical: (
      <>
        <path d="M12 3 4 7l8 4 8-4-8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </>
    ),

    content: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),

    page: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4" />
      </>
    ),

    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
      </>
    ),

    rank: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 2 5-7" />
      </>
    ),

    competitor: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path d="M3 20a6 6 0 0 1 12 0M13 20a5 5 0 0 1 8 0" />
      </>
    ),

    report: (
      <>
        <path d="M5 3h10l4 4v14H5z" />
        <path d="M15 3v5h4M8 13h8M8 17h5" />
      </>
    ),

    settings: (
      <>
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M4 12h2m12 0h2M12 4v2m0 12v2" />
        <path d="m6.3 6.3 1.4 1.4m8 8 1.4 1.4m0-10.8-1.4 1.4m-8 8-1.4 1.4" />
      </>
    ),

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),

    chevron: <path d="m9 18 6-6-6-6" />,

    down: <path d="m6 9 6 6 6-6" />,

    up: <path d="m6 15 6-6 6 6" />,

    more: (
      <>
        <circle
          cx="5"
          cy="12"
          r="1"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="12"
          cy="12"
          r="1"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="19"
          cy="12"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),

    sitemap: (
      <>
        <circle cx="12" cy="5" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M12 7v5M12 12H6v4M12 12h6v4" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M4 21h16" />
      </>
    ),

    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-4L4 9" />
        <path d="M4 4v5h5" />
        <path d="M4 13a8 8 0 0 0 14 4l2-2" />
        <path d="M20 20v-5h-5" />
      </>
    ),

    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6H4V5h6" />
      </>
    ),

    alert: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6M12 16h.01" />
      </>
    ),

    warning: (
      <>
        <path d="m12 3 9 17H3L12 3Z" />
        <path d="M12 9v4M12 16h.01" />
      </>
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),

    speed: (
      <>
        <path d="M4 16a8 8 0 1 1 16 0" />
        <path d="M12 12l4-4" />
        <path d="M6 19h12" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),

    image: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m5 17 5-5 3 3 2-2 4 4" />
      </>
    ),

    code: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
      </>
    ),

    lightbulb: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M8 14c-1.2-1.1-2-2.7-2-4.5a6 6 0 0 1 12 0c0 1.8-.8 3.4-2 4.5-.8.7-1 1.3-1 2.5h-6c0-1.2-.2-1.8-1-2.5Z" />
      </>
    ),

    close: (
      <>
        <path d="M6 6l12 12M18 6 6 18" />
      </>
    ),

    share: (
      <>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.3 10.8 7.4-4.4M8.3 13.2l7.4 4.4" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.page}
    </svg>
  );
}


/* =========================================================
   LOGO
========================================================= */

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#08A66B] text-[#08A66B]">
        <span className="text-[16px] font-black leading-none">
          ↗
        </span>
      </div>

      <div>
        <div className="text-[13px] font-extrabold leading-none tracking-wide text-white">
          TN SEO
          <sup className="text-[6px]">®</sup>
        </div>

        <div className="mt-1 text-[7px] font-semibold tracking-[2.5px] text-white">
          MODULE
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   USER
========================================================= */

function getLoggedInUser() {
  let user = null;

  try {
    const localUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const sessionUser = JSON.parse(
      sessionStorage.getItem("user") || "null"
    );

    user = localUser || sessionUser;
  } catch {
    user = null;
  }

  const name =
    user?.name ||
    user?.username ||
    user?.fullName ||
    "Utsav Kishore";

  const firstName = name.split(" ")[0];

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return {
    name,
    firstName,
    initials: initials || "U",
  };
}


/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ active }) {
  const items = [
    ["Dashboard", "home", "/"],
    ["Website Audit", "audit", "/website-audit"],
    ["Keyword Research", "search", "/keyword-research"],
    ["Technical SEO", "technical", "/technical-seo"],
    ["Content / AI Writer", "content", "/content"],
    ["On-Page SEO", "page", "/on-page-seo"],
    ["Backlink Analysis", "link", "/backlinks"],
    ["Rank Tracking", "rank", "/rank-tracking"],
    ["Competitor Analysis", "competitor", "/competitor-analysis"],
    ["Reports", "report", "/reports"],
    ["Settings", "settings", "/settings"],
  ];

  const user = getLoggedInUser();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[184px] bg-[#003E35] lg:block">

      {/* Logo */}
      <div className="flex h-[72px] items-center px-4">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="px-2.5 pt-1">

        {items.map(([label, icon, route]) => {
          const selected = active === label;

          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (route) {
                  window.location.href = route;
                }
              }}
              className={`mb-0.5 flex h-[31px] w-full items-center gap-2.5 rounded-md px-3 text-left text-[10px] transition ${
                selected
                  ? "bg-[#08A66B] font-semibold text-white"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              <span
                className={
                  selected
                    ? "text-white"
                    : "text-white/80"
                }
              >
                <Icon name={icon} size={14} />
              </span>

              <span className="truncate">
                {label}
              </span>
            </button>
          );
        })}

      </nav>
    </aside>
  );
}


/* =========================================================
   TOP BAR
========================================================= */

function TopBar({
  url,
  setUrl,
  onRunAudit,
}) {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const user = getLoggedInUser();

  return (
    <header className="sticky top-0 z-30 h-[57px] border-b border-[#E5E9E7] bg-white lg:ml-[184px]">

      <div className="flex h-full items-center gap-3 px-4">

        {/* URL */}
        <div className="flex h-8 min-w-0 max-w-[490px] flex-1 items-center rounded-md border border-[#DFE6E3] bg-[#FAFCFB] px-2.5">

          <span className="text-[#07945F]">
            <Icon name="search" size={13} />
          </span>

          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            className="ml-2 w-full bg-transparent text-[9px] text-[#263D36] outline-none"
            aria-label="Website URL"
            placeholder="https://example.com"
          />
        </div>

        {/* Run Audit */}
        <button
          type="button"
          onClick={onRunAudit}
          className="flex h-8 items-center gap-1.5 rounded-md bg-[#08A66B] px-3.5 text-[9px] font-semibold text-white hover:bg-[#07945F]"
        >
          Run Audit
          <Icon
            name="arrowRight"
            size={12}
          />
        </button>

        <div className="ml-auto flex items-center gap-3">

          {/* Notification */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  (value) => !value
                )
              }
              className="relative flex h-8 w-8 items-center justify-center rounded-md text-[#263B36] hover:bg-[#F2F6F4]"
            >
              <Icon
                name="bell"
                size={17}
              />

              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#E54B4B]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-10 z-50 w-64 overflow-hidden rounded-lg border border-[#DFE6E3] bg-white shadow-xl">

                <div className="border-b border-[#EDF0EF] px-3 py-2 text-[10px] font-bold text-[#243831]">
                  Notifications
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="block w-full px-3 py-2 text-left text-[9px] text-[#596C65] hover:bg-[#F8FAF9]"
                >
                  Your latest website audit is ready.
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="block w-full px-3 py-2 text-left text-[9px] text-[#596C65] hover:bg-[#F8FAF9]"
                >
                  New keyword opportunities are ready to review.
                </button>

              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003E35] text-[10px] font-bold text-white">
              {user.initials}
            </div>

            <div className="hidden leading-3.5 sm:block">
              <div className="text-[8px] text-[#71807A]">
                Good Evening,
              </div>

              <div className="text-[9px] font-bold text-[#263B36]">
                {user.firstName} 👋
              </div>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
}


/* =========================================================
   SCORE RINGS
========================================================= */

function ScoreRing({
  score,
  size = 92,
  stroke = 8,
}) {
  const radius = 36;
  const circumference =
    2 * Math.PI * radius;

  const progress =
    circumference * (score / 100);

  const color =
    score >= 80
      ? "#08A66B"
      : score >= 60
      ? "#E8A919"
      : "#E45050";

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 84 84"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="#E8EEEB"
          strokeWidth={stroke}
        />

        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-[25px] font-bold text-[#15221F]">
          {score}
        </span>

        <span className="text-[7px] font-bold text-[#07945F]">
          Excellent
        </span>

      </div>
    </div>
  );
}


function TinyRing({ score }) {
  const radius = 15;

  const circumference =
    2 * Math.PI * radius;

  const progress =
    circumference * (score / 100);

  const color =
    score >= 80
      ? "#08A66B"
      : score >= 60
      ? "#E7AA20"
      : "#E45050";

  return (
    <div className="relative h-8 w-8">

      <svg
        viewBox="0 0 36 36"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#E7ECEA"
          strokeWidth="4"
        />

        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-[#31433E]">
        {score}
      </span>

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  tone = "green",
  change,
}) {
  const toneClasses = {
    red: "bg-[#FFF0EF] text-[#DC4B48]",
    amber: "bg-[#FFF7DF] text-[#D39A12]",
    green: "bg-[#E8F8F0] text-[#07945F]",
    blue: "bg-[#EDF5FF] text-[#3A79BF]",
    purple: "bg-[#F4EDFF] text-[#8A4FCE]",
  };

  return (
    <div className="rounded-lg border border-[#E4E9E7] bg-white px-2.5 py-2.5">

      <div className="flex items-start gap-2.5">

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${toneClasses[tone]}`}
        >
          <Icon
            name={icon}
            size={13}
          />
        </span>

        <div className="min-w-0">

          <div className="text-[14px] font-bold leading-none text-[#16231F]">
            {value}
          </div>

          <div className="mt-1 text-[8px] leading-3 text-[#60716B]">
            {label}
          </div>

        </div>

      </div>

      {change && (
        <div className="mt-1.5 text-[8px] font-semibold text-[#07945F]">
          {change}
        </div>
      )}

    </div>
  );
}


/* =========================================================
   TREND CHART
========================================================= */

function TrendChart() {
  const [period, setPeriod] = useState("Last 30 days");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const chartData = {
    "Last 30 days": [
      { date: "Aug 16", score: 78 },
      { date: "Aug 19", score: 80 },
      { date: "Aug 22", score: 79 },
      { date: "Aug 25", score: 82 },
      { date: "Aug 28", score: 81 },
      { date: "Aug 31", score: 85 },
      { date: "Sep 3", score: 84 },
      { date: "Sep 6", score: 88 },
      { date: "Sep 9", score: 86 },
      { date: "Sep 12", score: 89 },
      { date: "Sep 15", score: 93 },
    ],

    "Last 90 days": [
      { date: "Jun 18", score: 69 },
      { date: "Jun 27", score: 72 },
      { date: "Jul 6", score: 71 },
      { date: "Jul 15", score: 76 },
      { date: "Jul 24", score: 74 },
      { date: "Aug 2", score: 79 },
      { date: "Aug 11", score: 78 },
      { date: "Aug 20", score: 83 },
      { date: "Aug 29", score: 81 },
      { date: "Sep 7", score: 88 },
      { date: "Sep 15", score: 93 },
    ],
  };

  const data = chartData[period];

  const width = 700;
  const height = 190;

  const padding = {
    top: 22,
    right: 18,
    bottom: 32,
    left: 28,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minScore = 60;
  const maxScore = 100;

  const getX = (index) => {
    if (data.length === 1) return width / 2;

    return (
      padding.left +
      (index / (data.length - 1)) * chartWidth
    );
  };

  const getY = (score) => {
    return (
      padding.top +
      ((maxScore - score) / (maxScore - minScore)) *
        chartHeight
    );
  };

  const points = data
    .map((item, index) => `${getX(index)},${getY(item.score)}`)
    .join(" ");

  const areaPoints = `
    ${padding.left},${height - padding.bottom}
    ${points}
    ${width - padding.right},${height - padding.bottom}
  `;

  const latestScore = data[data.length - 1].score;

  const firstScore = data[0].score;

  const change = latestScore - firstScore;

  return (
    <div className="mt-3 w-full overflow-hidden rounded-lg border border-[#E8EEEB] bg-[#FBFCFB]">

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3 sm:px-4 sm:pt-3.5">

        <div>
          <div className="text-[9px] font-semibold text-[#40534C] sm:text-[10px]">
            SEO Health Trend
          </div>

          <div className="mt-0.5 text-[7px] text-[#8A9893] sm:text-[8px]">
            Website health score over time
          </div>
        </div>

        {/* PERIOD SELECTOR */}
        <select
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setHoveredIndex(null);
          }}
          className="
            h-7
            rounded-md
            border
            border-[#DDE6E2]
            bg-white
            px-2
            text-[7px]
            font-medium
            text-[#53655E]
            outline-none
            transition
            hover:border-[#BFD8CD]
            focus:border-[#08A66B]
            sm:text-[8px]
          "
        >
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* ================= CHART ================= */}
      <div className="relative mt-1 w-full px-1 pb-2 sm:px-2">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[150px] w-full sm:h-[175px] md:h-[190px]"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >

          {/* ================= DEFINITIONS ================= */}
          <defs>

            {/* Soft green area */}
            <linearGradient
              id="seoTrendFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#08A66B"
                stopOpacity="0.18"
              />

              <stop
                offset="100%"
                stopColor="#08A66B"
                stopOpacity="0.015"
              />
            </linearGradient>

            {/* Subtle glow */}
            <filter
              id="seoLineShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.2"
                floodColor="#08A66B"
                floodOpacity="0.16"
              />
            </filter>
          </defs>

          {/* ================= GRID ================= */}

          {[60, 70, 80, 90, 100].map((score) => {
            const y = getY(score);

            return (
              <g key={score}>

                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#E9EFEC"
                  strokeWidth="1"
                />

                <text
                  x="4"
                  y={y + 3}
                  fontSize="7"
                  fill="#98A49F"
                >
                  {score}
                </text>

              </g>
            );
          })}

          {/* ================= AREA ================= */}

          <polygon
            points={areaPoints}
            fill="url(#seoTrendFill)"
          />

          {/* ================= TREND LINE ================= */}

          <polyline
            points={points}
            fill="none"
            stroke="#08A66B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#seoLineShadow)"
          />

          {/* ================= INTERACTIVE POINTS ================= */}

          {data.map((item, index) => {
            const cx = getX(index);
            const cy = getY(item.score);

            const isHovered = hoveredIndex === index;
            const isLast = index === data.length - 1;

            return (
              <g
                key={`${item.date}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                className="cursor-pointer"
              >

                {/* Invisible larger hover target */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="10"
                  fill="transparent"
                />

                {/* Outer hover ring */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6"
                    fill="#FFFFFF"
                    stroke="#08A66B"
                    strokeWidth="2"
                  />
                )}

                {/* Normal point */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered || isLast ? "3.2" : "2"}
                  fill="#08A66B"
                  stroke="#FFFFFF"
                  strokeWidth={isHovered || isLast ? "1.5" : "1"}
                />

              </g>
            );
          })}

          {/* ================= HOVER TOOLTIP ================= */}

          {hoveredIndex !== null && (() => {
            const item = data[hoveredIndex];

            const cx = getX(hoveredIndex);
            const cy = getY(item.score);

            /*
              Keep tooltip inside chart boundaries.
            */
            const tooltipWidth = 82;

            let tooltipX = cx - tooltipWidth / 2;

            if (tooltipX < padding.left) {
              tooltipX = padding.left;
            }

            if (tooltipX + tooltipWidth > width - padding.right) {
              tooltipX =
                width - padding.right - tooltipWidth;
            }

            const tooltipY = Math.max(
              4,
              cy - 42
            );

            return (
              <g pointerEvents="none">

                {/* Vertical guide */}
                <line
                  x1={cx}
                  x2={cx}
                  y1={padding.top}
                  y2={height - padding.bottom}
                  stroke="#B8DCCE"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Tooltip */}
                <rect
                  x={tooltipX}
                  y={tooltipY}
                  width={tooltipWidth}
                  height="32"
                  rx="5"
                  fill="#003E35"
                  opacity="0.97"
                />

                <text
                  x={tooltipX + 8}
                  y={tooltipY + 12}
                  fontSize="7"
                  fill="#B8D8CF"
                >
                  {item.date}
                </text>

                <text
                  x={tooltipX + 8}
                  y={tooltipY + 24}
                  fontSize="9"
                  fontWeight="700"
                  fill="#FFFFFF"
                >
                  SEO Health: {item.score}
                </text>

              </g>
            );
          })()}

          {/* ================= X AXIS ================= */}

          {data.map((item, index) => {

            /*
              Show fewer labels on small datasets so
              they don't overlap.
            */
            const shouldShow =
              data.length <= 11
                ? true
                : index % 2 === 0 ||
                  index === data.length - 1;

            if (!shouldShow) return null;

            return (
              <text
                key={`label-${index}`}
                x={getX(index)}
                y={height - 10}
                textAnchor="middle"
                fontSize="7"
                fill="#8B9894"
              >
                {item.date}
              </text>
            );
          })}

          {/* ================= LATEST SCORE LABEL ================= */}

          <g>
            <rect
              x={Math.min(
                getX(data.length - 1) - 22,
                width - 56
              )}
              y={Math.max(
                getY(latestScore) - 30,
                2
              )}
              width="38"
              height="18"
              rx="5"
              fill="#EAF7F1"
            />

            <text
              x={Math.min(
                getX(data.length - 1) - 3,
                width - 37
              )}
              y={Math.max(
                getY(latestScore) - 18,
                14
              )}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#087B51"
            >
              {latestScore}
            </text>
          </g>

        </svg>
      </div>

      {/* ================= BOTTOM SUMMARY ================= */}

      <div className="flex items-center justify-between border-t border-[#E8EEEB] bg-white/70 px-3 py-2.5 sm:px-4">

        <div className="flex items-center gap-1.5">

          <span className="h-1.5 w-1.5 rounded-full bg-[#08A66B]" />

          <span className="text-[7px] text-[#75847E] sm:text-[8px]">
            Current SEO Health
          </span>

          <span className="text-[8px] font-bold text-[#253A33] sm:text-[9px]">
            {latestScore}
          </span>

        </div>

        <div
          className={`text-[7px] font-semibold sm:text-[8px] ${
            change >= 0
              ? "text-[#07945F]"
              : "text-[#DC4B48]"
          }`}
        >
          {change >= 0 ? "↑" : "↓"}{" "}
          {Math.abs(change)} points
          <span className="ml-1 font-normal text-[#8A9893]">
            since start
          </span>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   HEALTH CARD
========================================================= */

function HealthCard({
  onOpenReport,
}) {
  return (
    <div className="rounded-lg border border-[#E4E9E7] bg-white p-3">

      <div className="text-[11px] font-bold text-[#1B2C27]">
        Overall SEO Health
      </div>

      <div className="mt-2 flex items-center gap-4">

        <ScoreRing
          score={93}
          size={92}
          stroke={8}
        />

        <div className="min-w-0">

          <div className="text-[9px] leading-3 text-[#60716B]">
            Your website is in great shape! Keep it up.
          </div>

          <div className="mt-2 text-[10px] font-bold text-[#07945F]">
            ↑ 5 points
          </div>

          <div className="text-[8px] text-[#73817C]">
            since last audit
          </div>

          

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TOP ISSUES CARD
========================================================= */
function TopIssuesCard({ onOpenIssues }) {
  const [category, setCategory] = useState("All Categories");

  const filteredIssues = issueData
    .filter((item) => {
      if (category === "All Categories") return true;
      return item.category === category;
    })
    .slice(0, 8);

  const getSeverityStyle = (severity) => {
    if (severity === "Critical") {
      return "bg-[#FFE8E8] text-[#E24E4C]";
    }

    if (severity === "High") {
      return "bg-[#FFF0E1] text-[#E28A18]";
    }

    if (severity === "Medium") {
      return "bg-[#FFF4DC] text-[#C99612]";
    }

    return "bg-[#E8F8F0] text-[#07945F]";
  };

  const getSeverityIcon = (severity) => {
    if (severity === "Critical") {
      return "alert";
    }

    return "warning";
  };

  const categories = [
    "All Categories",
    ...Array.from(
      new Set(issueData.map((item) => item.category))
    ),
  ];

  return (
    <section className="rounded-lg border border-[#E4E9E7] bg-white p-3 shadow-[0_1px_3px_rgba(18,45,38,0.02)]">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

        <div className="min-w-0">
          <h2 className="text-[11px] font-bold tracking-[-0.1px] text-[#182A25]">
            Top Issues by Severity
          </h2>

          <p className="mt-0.5 text-[7px] text-[#7B8984]">
            Most important SEO issues found during your latest audit.
          </p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-7 min-w-[125px] rounded-md border border-[#DDE5E1] bg-white px-2 text-[7px] font-medium text-[#435650] outline-none transition hover:border-[#08A66B] focus:border-[#08A66B]"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>


      {/* =====================================================
          DESKTOP / TABLE VIEW
      ===================================================== */}
      <div className="hidden overflow-hidden rounded-md border border-[#E5EBE8] md:block">

        {/* TABLE HEADER */}
        <div
          className="grid items-center bg-[#FAFCFC] px-2.5 py-2 text-[7px] font-semibold text-[#667872]"
          style={{
            gridTemplateColumns:
              "0.35fr 1.8fr 1fr 0.85fr 0.8fr 0.7fr",
          }}
        >
          <span>#</span>
          <span>Issue</span>
          <span>Category</span>
          <span>Severity</span>
          <span className="text-center">
            Affected Pages
          </span>
          <span className="text-right">
            Action
          </span>
        </div>


        {/* TABLE ROWS */}
        {filteredIssues.map((item, index) => {
const affectedPages =
  item.affectedPages ??
  parseInt(item.affected, 10) ??
  0;

          return (
            <div
              key={item.id}
              className="grid min-h-[28px] items-center border-t border-[#EDF1EF] px-2.5 py-1.5 text-[7.5px] text-[#4C5F58] transition hover:bg-[#F8FBF9]"
              style={{
                gridTemplateColumns:
                  "0.35fr 1.8fr 1fr 0.85fr 0.8fr 0.7fr",
              }}
            >

              {/* NUMBER */}
              <span className="text-[#64756F]">
                {index + 1}
              </span>


              {/* ISSUE */}
              <div className="flex min-w-0 items-center gap-1.5">

                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                    item.severity === "Critical"
                      ? "bg-[#FFF0EF] text-[#E24E4C]"
                      : item.severity === "High"
                      ? "bg-[#FFF5E8] text-[#E29A20]"
                      : "bg-[#FFF8E6] text-[#D39A12]"
                  }`}
                >
                  <Icon
                    name={getSeverityIcon(item.severity)}
                    size={10}
                  />
                </span>

                <span className="truncate font-medium text-[#30443C]">
                  {item.title}
                </span>

              </div>


              {/* CATEGORY */}
              <span className="truncate text-[#53665F]">
                {item.category}
              </span>


              {/* SEVERITY */}
              <span
                className={`w-fit rounded-full px-2 py-[3px] text-[6.5px] font-semibold ${getSeverityStyle(
                  item.severity
                )}`}
              >
                {item.severity}
              </span>


              {/* AFFECTED PAGES */}
              <span className="text-center font-medium text-[#53665F]">
                {affectedPages}
              </span>


              {/* ACTION */}
              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={onOpenIssues}
                  className="flex h-[22px] items-center gap-1 rounded-md border border-[#DDE6E2] bg-white px-2 text-[7px] font-semibold text-[#435650] transition hover:border-[#08A66B] hover:bg-[#F1FAF6] hover:text-[#07945F]"
                >
                  View
                  <Icon
                    name="arrowRight"
                    size={9}
                  />
                </button>

              </div>

            </div>
          );
        })}


        {/* EMPTY STATE */}
        {filteredIssues.length === 0 && (
          <div className="py-8 text-center text-[8px] text-[#7B8984]">
            No issues found for this category.
          </div>
        )}

      </div>


      {/* =====================================================
          MOBILE CARD VIEW
      ===================================================== */}
      <div className="space-y-1.5 md:hidden">

        {filteredIssues.map((item, index) => {

const affectedPages =
  item.affectedPages ??
  parseInt(item.affected, 10) ??
  0;
          return (
            <div
              key={item.id}
              className="rounded-md border border-[#E7ECEA] bg-[#FCFDFC] p-2.5 transition hover:border-[#BFE5D4]"
            >

              {/* TOP */}
              <div className="flex items-start gap-2">

                <span className="pt-1 text-[7px] text-[#89958F]">
                  {index + 1}
                </span>

                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    item.severity === "Critical"
                      ? "bg-[#FFF0EF] text-[#E24E4C]"
                      : item.severity === "High"
                      ? "bg-[#FFF5E8] text-[#E29A20]"
                      : "bg-[#FFF8E6] text-[#D39A12]"
                  }`}
                >
                  <Icon
                    name={getSeverityIcon(item.severity)}
                    size={13}
                  />
                </span>

                <div className="min-w-0 flex-1">

                  <div className="text-[8px] font-semibold text-[#30443C]">
                    {item.title}
                  </div>

                  <div className="mt-0.5 text-[7px] text-[#7B8984]">
                    {item.category}
                  </div>

                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[6.5px] font-semibold ${getSeverityStyle(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </span>

              </div>


              {/* BOTTOM */}
              <div className="mt-2 flex items-center justify-between border-t border-[#EDF1EF] pt-2">

                <span className="text-[7px] text-[#7B8984]">
                  Affected Pages:
                  <span className="ml-1 font-semibold text-[#435650]">
                    {affectedPages}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={onOpenIssues}
                  className="flex items-center gap-1 text-[7px] font-semibold text-[#07945F]"
                >
                  View
                  <Icon
                    name="arrowRight"
                    size={9}
                  />
                </button>

              </div>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <div className="mt-2 flex items-center justify-between border-t border-[#EDF1EF] pt-2">

        <span className="text-[7px] text-[#89958F]">
          Showing {filteredIssues.length} of{" "}
          {issueData.length} issues
        </span>

        <button
          type="button"
          onClick={onOpenIssues}
          className="text-[7px] font-semibold text-[#07945F] transition hover:text-[#057C50]"
        >
          View All Issues →
        </button>

      </div>

    </section>
  );
}

/* =========================================================
   PAGES OVERVIEW PREVIEW
========================================================= */

function PagesOverviewPreview({
  onOpenPages,
}) {
  return (
    <section className="rounded-lg border border-[#E4E9E7] bg-white p-3">

      <div className="mb-2 flex items-center justify-between">

        <div>
          <h2 className="text-[11px] font-bold text-[#1B2C27]">
            Pages Overview
          </h2>

          <p className="text-[7px] text-[#7B8984]">
            Top pages with issues.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPages}
          className="text-[8px] font-semibold text-[#07945F]"
        >
          View All →
        </button>

      </div>

      <div className="overflow-x-auto rounded-md border border-[#E7ECEA]">

        <div className="min-w-[760px]">

          <div
            className="grid bg-[#FAFCFC] px-2 py-1.5 text-[7px] font-semibold text-[#667872]"
            style={{
              gridTemplateColumns:
                ".3fr 1.5fr .65fr .65fr .7fr 1fr .5fr",
            }}
          >
            <span>#</span>
            <span>Page URL</span>
            <span>Issues</span>
            <span>Health</span>
            <span>Page Speed</span>
            <span>Last Checked</span>
            <span className="text-right">
              Actions
            </span>
          </div>

          {pageData.slice(0, 5).map(
            (page) => (
              <div
                key={page.id}
                className="grid items-center border-t border-[#EEF1F0] px-2 py-1.5 text-[7px] text-[#42554E]"
                style={{
                  gridTemplateColumns:
                    ".3fr 1.5fr .65fr .65fr .7fr 1fr .5fr",
                }}
              >

                <span>{page.id}</span>

                <div className="flex min-w-0 items-center gap-1.5">

                  <span className="truncate text-[#345F7E]">
                    {page.url}
                  </span>

                  <span className="rounded-full bg-[#EDF4F1] px-1.5 py-0.5 text-[6px] text-[#688079]">
                    {page.type}
                  </span>

                </div>

                <span
                  className={
                    page.issues > 0
                      ? "text-[#DC4B48]"
                      : "text-[#07945F]"
                  }
                >
                  {page.issues}
                </span>

                <TinyRing
                  score={page.health}
                />

                <TinyRing
                  score={page.speed}
                />

                <span>{page.date}</span>

                <button
                  type="button"
                  onClick={onOpenPages}
                  className="justify-self-end text-[#596A64]"
                >
                  <Icon
                    name="chevron"
                    size={11}
                  />
                </button>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SUMMARY
========================================================= */

function SummaryPage({
  setTab,
  onOpenIssues,
  onOpenPages,
  onOpenReport,
}) {
  return (
    <>
      {/* Top metrics */}
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.55fr_1fr_1fr_1fr]">

        <HealthCard
          onOpenReport={onOpenReport}
        />

        <StatCard
          icon="alert"
          value="12"
          label="Critical Issues"
          tone="red"
          change="−4 since last audit"
        />

        <StatCard
          icon="warning"
          value="28"
          label="Warnings"
          tone="amber"
          change="−8 since last audit"
        />

        <StatCard
          icon="check"
          value="156"
          label="Passed Checks"
          tone="green"
          change="+12 since last audit"
        />

      </div>

      {/* Second metrics */}
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon="page"
          value="257"
          label="Pages Crawled"
          tone="blue"
          change="Total pages"
        />

        <StatCard
          icon="link"
          value="243"
          label="Indexed Pages"
          tone="purple"
          change="94% indexed"
        />

        <StatCard
          icon="speed"
          value="86"
          label="Page Speed (Mobile)"
          tone="purple"
          change="Good"
        />

        <StatCard
          icon="shield"
          value="Passed"
          label="Core Web Vitals"
          tone="green"
          change="All metrics good"
        />

      </div>

      {/* Trend + Issues */}
      <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-[1.35fr_.9fr]">

        <section className="rounded-lg border border-[#E4E9E7] bg-white p-3">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="text-[11px] font-bold text-[#1B2C27]">
                SEO Health Trend
              </h2>

              <p className="text-[7px] text-[#7B8984]">
                Your website's health score over time.
              </p>
            </div>

            <select className="rounded-md border border-[#DFE6E3] bg-white px-2 py-1 text-[7px] text-[#60716B] outline-none">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
            </select>

          </div>

          <TrendChart />

        </section>

        <TopIssuesCard
          onOpenIssues={onOpenIssues}
        />

      </div>


      {/* Pages */}
      <div className="mt-2">

        <PagesOverviewPreview
          onOpenPages={onOpenPages}
        />

      </div>
    </>
  );
}


/* =========================================================
   SEARCH BOX
========================================================= */

function SearchBox({
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="flex h-7 min-w-[180px] items-center gap-1.5 rounded-md border border-[#DFE6E3] bg-white px-2 text-[#87958F]">

      <Icon
        name="search"
        size={11}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full bg-transparent text-[8px] outline-none"
      />

    </label>
  );
}


/* =========================================================
   SELECT
========================================================= */

function Select({
  value,
  onChange,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="h-7 rounded-md border border-[#DFE6E3] bg-white px-2 text-[8px] text-[#60716B] outline-none"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}


/* =========================================================
   SEVERITY
========================================================= */

function Severity({
  value,
}) {
  const classes = {
    Critical:
      "bg-[#FFE8E7] text-[#D83F3D]",
    High:
      "bg-[#FFF0E2] text-[#D77A13]",
    Medium:
      "bg-[#FFF7DF] text-[#C79513]",
    Low:
      "bg-[#EDF8F1] text-[#07945F]",
  };

  return (
    <span
      className={`w-fit rounded-full px-2 py-1 text-[7px] font-semibold ${
        classes[value] ||
        classes.Low
      }`}
    >
      {value}
    </span>
  );
}


/* =========================================================
   IMPACT
========================================================= */

function Impact({
  value,
}) {
  const classes = {
    High:
      "bg-[#FFF0E2] text-[#D77A13]",
    Medium:
      "bg-[#FFF7DF] text-[#C79513]",
    Low:
      "bg-[#EDF8F1] text-[#07945F]",
  };

  return (
    <span
      className={`w-fit rounded-full px-2 py-1 text-[7px] font-semibold ${
        classes[value] ||
        classes.Low
      }`}
    >
      {value}
    </span>
  );
}


/* =========================================================
   PAGE TYPE BADGE
========================================================= */

function PageType({
  value,
}) {
  return (
    <span className="w-fit rounded-full bg-[#EDF4F1] px-2 py-1 text-[7px] font-medium text-[#60756D]">
      {value}
    </span>
  );
}


/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  page,
  totalPages,
  onChange,
}) {
  const pages = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="mt-3 flex items-center justify-between text-[7px] text-[#7C8A85]">

      <span>
        Page {page} of {totalPages}
      </span>

      <div className="flex items-center gap-1">

        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            onChange(page - 1)
          }
          className="page-btn disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>

        {pages.map(
          (number) => (
            <button
              type="button"
              key={number}
              onClick={() =>
                onChange(number)
              }
              className={`page-btn ${
                page === number
                  ? "active"
                  : ""
              }`}
            >
              {number}
            </button>
          )
        )}

        <button
          type="button"
          disabled={
            page === totalPages
          }
          onClick={() =>
            onChange(page + 1)
          }
          className="page-btn disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   TOP ISSUES PAGE
========================================================= */

function IssuesPage({
  onBack,
  onOpenIssue,
}) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [severity, setSeverity] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [page, setPage] =
    useState(1);

  const pageSize = 5;

  const filteredIssues = useMemo(
    () => {
      return issueData.filter(
        (item) => {
          const matchesSearch =
            !search ||
            `${item.title} ${item.category} ${item.pageUrl}`
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category === "All" ||
            item.category === category;

          const matchesSeverity =
            severity === "All" ||
            item.severity === severity;

          const matchesStatus =
            status === "All" ||
            item.status === status;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesSeverity &&
            matchesStatus
          );
        }
      );
    },
    [
      search,
      category,
      severity,
      status,
    ]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredIssues.length /
        pageSize
    )
  );

  const currentPage =
    Math.min(page, totalPages);

  const visibleIssues =
    filteredIssues.slice(
      (currentPage - 1) *
        pageSize,
      currentPage * pageSize
    );

  const criticalCount =
    filteredIssues.filter(
      (x) => x.severity === "Critical"
    ).length;

  const highCount =
    filteredIssues.filter(
      (x) => x.severity === "High"
    ).length;

  return (
    <div>

      {/* Header */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DFE6E3] bg-white text-[#263C35] hover:bg-[#F4F8F6]"
          >
            <Icon
              name="arrowLeft"
              size={16}
            />
          </button>

          <div>

            <h1 className="text-[18px] font-bold tracking-[-0.3px] text-[#172722]">
              Top Issues to Fix
            </h1>

            <p className="mt-0.5 text-[8px] text-[#71807A]">
              Detailed list of SEO issues found on your website.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            downloadCSV(
              filteredIssues,
              "top-issues.csv"
            )
          }
          className="action-btn"
        >
          <Icon
            name="download"
            size={11}
          />
          Export CSV
        </button>

      </div>

      {/* Metrics */}
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon="alert"
          value={criticalCount}
          label="Critical Issues"
          tone="red"
        />

        <StatCard
          icon="warning"
          value={highCount}
          label="Warnings"
          tone="amber"
        />

        <StatCard
          icon="check"
          value="156"
          label="Passed Checks"
          tone="green"
        />

        <StatCard
          icon="target"
          value={filteredIssues.length + 156}
          label="Total Checks"
          tone="blue"
        />

      </div>

      {/* Main */}
      <section className="rounded-lg border border-[#E4E9E7] bg-white p-3">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">

          <SearchBox
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search issues..."
          />

          <Select
            value={category}
            onChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
            options={[
              "All",
              "Meta",
              "HTML",
              "Images",
              "Internal Links",
              "Performance",
              "Content",
              "Technical",
            ]}
          />

          <Select
            value={severity}
            onChange={(value) => {
              setSeverity(value);
              setPage(1);
            }}
            options={[
              "All",
              "Critical",
              "High",
              "Medium",
              "Low",
            ]}
          />

          <Select
            value={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            options={[
              "All",
              "Open",
              "Resolved",
            ]}
          />

        </div>

        {/* Table */}
        <div className="mt-3 overflow-x-auto rounded-md border border-[#E5EBE8]">

          <div className="min-w-[1050px]">

            <div
              className="grid bg-[#FAFCFC] px-2 py-2 text-[7px] font-semibold text-[#667872]"
              style={{
                gridTemplateColumns:
                  ".3fr .1fr 1.5fr 1fr 1.15fr .75fr .7fr .7fr .55fr",
              }}
            >
              <span>#</span>
              <span>✓</span>
              <span>Issue</span>
              <span>Page URL</span>
              <span>Category</span>
              <span>Severity</span>
              <span>Impact</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {visibleIssues.map(
              (item) => (
                <div
                  key={item.id}
                  className="grid items-center border-t border-[#EDF1EF] px-2 py-2 text-[8px] text-[#53645E]"
                  style={{
                    gridTemplateColumns:
                      ".3fr .1fr 1.5fr 1fr 1.15fr .75fr .7fr .7fr .55fr",
                  }}
                >

                  <span>
                    {item.id}
                  </span>

                  <input
                    type="checkbox"
                    className="h-3 w-3 accent-[#08A66B]"
                  />

                  <span className="font-semibold text-[#30443C]">
                    {item.title}
                  </span>

                  <span className="truncate text-[#315F7D]">
                    {item.pageUrl}
                  </span>

                  <span>
                    {item.category}
                  </span>

                  <Severity
                    value={
                      item.severity
                    }
                  />

                  <Impact
                    value={item.impact}
                  />

                  <span className="rounded-full bg-[#FFF5E5] px-2 py-1 text-[7px] font-semibold text-[#D18F14]">
                    {item.status}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenIssue(item)
                    }
                    className="font-semibold text-[#07945F] hover:underline"
                  >
                    View →
                  </button>

                </div>
              )
            )}

            {visibleIssues.length ===
              0 && (
              <div className="px-4 py-10 text-center text-[9px] text-[#7C8A85]">
                No issues found for the selected filters.
              </div>
            )}

          </div>

        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

      </section>

    </div>
  );
}


/* =========================================================
   PAGES OVERVIEW PAGE
========================================================= */

function PagesPage({
  onBack,
  onOpenPage,
}) {
  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("All");

  const [health, setHealth] =
    useState("All");

  const [sort, setSort] =
    useState("All");

  const [page, setPage] =
    useState(1);

  const pageSize = 5;

  const filteredPages =
    useMemo(() => {
      let result =
        pageData.filter(
          (item) => {
            const matchesSearch =
              !search ||
              item.url
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesType =
              type === "All" ||
              item.type === type;

            const matchesHealth =
              health === "All" ||
              (health === "Good" &&
                item.health >= 80) ||
              (health === "Needs Attention" &&
                item.health < 80);

            return (
              matchesSearch &&
              matchesType &&
              matchesHealth
            );
          }
        );

      if (sort === "Health (High to Low)") {
        result.sort(
          (a, b) =>
            b.health - a.health
        );
      }

      if (sort === "Issues (High to Low)") {
        result.sort(
          (a, b) =>
            b.issues - a.issues
        );
      }

      if (sort === "Speed (High to Low)") {
        result.sort(
          (a, b) =>
            b.speed - a.speed
        );
      }

      return result;
    }, [
      search,
      type,
      health,
      sort,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPages.length /
        pageSize
    )
  );

  const currentPage =
    Math.min(page, totalPages);

  const visiblePages =
    filteredPages.slice(
      (currentPage - 1) *
        pageSize,
      currentPage * pageSize
    );

  const validPages =
    filteredPages.filter(
      (p) => p.issues === 0
    ).length;

  const issuePages =
    filteredPages.filter(
      (p) => p.issues > 0
    ).length;

  const blockedPages =
    filteredPages.filter(
      (p) => p.health < 60
    ).length;

  return (
    <div>

      {/* Header */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DFE6E3] bg-white text-[#263C35] hover:bg-[#F4F8F6]"
          >
            <Icon
              name="arrowLeft"
              size={16}
            />
          </button>

          <div>

            <h1 className="text-[18px] font-bold tracking-[-0.3px] text-[#172722]">
              Pages Overview
            </h1>

            <p className="mt-0.5 text-[8px] text-[#71807A]">
              All crawled pages with SEO metrics and issues.
            </p>

          </div>

        </div>

        <div className="flex gap-1.5">

          <button
            type="button"
            onClick={() =>
              downloadCSV(
                filteredPages,
                "pages-overview.csv"
              )
            }
            className="action-btn"
          >
            <Icon
              name="download"
              size={11}
            />
            Export CSV
          </button>

          <button
            type="button"
            className="action-btn"
          >
            <Icon
              name="settings"
              size={11}
            />
            Columns
          </button>

        </div>

      </div>

      {/* Metrics */}
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon="page"
          value="124"
          label="Total Pages"
          tone="blue"
        />

        <StatCard
          icon="check"
          value={validPages || 98}
          label="Valid Pages"
          tone="green"
        />

        <StatCard
          icon="alert"
          value={issuePages || 18}
          label="Pages with Issues"
          tone="red"
        />

        <StatCard
          icon="warning"
          value={blockedPages || 8}
          label="Blocked Pages"
          tone="amber"
        />

      </div>

      {/* Table card */}
      <section className="rounded-lg border border-[#E4E9E7] bg-white p-3">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">

          <SearchBox
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search pages..."
          />

          <Select
            value={type}
            onChange={(value) => {
              setType(value);
              setPage(1);
            }}
            options={[
              "All",
              "Blog",
              "Service",
              "Other",
            ]}
          />

          <Select
            value={health}
            onChange={(value) => {
              setHealth(value);
              setPage(1);
            }}
            options={[
              "All",
              "Good",
              "Needs Attention",
            ]}
          />

          <Select
            value={sort}
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
            options={[
              "All",
              "Health (High to Low)",
              "Issues (High to Low)",
              "Speed (High to Low)",
            ]}
          />

        </div>

        {/* Table */}
        <div className="mt-3 overflow-x-auto rounded-md border border-[#E5EBE8]">

          <div className="min-w-[950px]">

            <div
              className="grid bg-[#FAFCFC] px-2 py-2 text-[7px] font-semibold text-[#667872]"
              style={{
                gridTemplateColumns:
                  ".3fr 1.5fr .75fr .65fr .75fr .75fr 1fr .55fr",
              }}
            >
              <span>#</span>
              <span>Page URL</span>
              <span>Page Type</span>
              <span>Issues</span>
              <span>Health Score</span>
              <span>Page Speed</span>
              <span>Last Checked</span>
              <span>Action</span>
            </div>

            {visiblePages.map(
              (item) => (
                <div
                  key={item.id}
                  className="grid items-center border-t border-[#EDF1EF] px-2 py-2 text-[8px] text-[#53645E]"
                  style={{
                    gridTemplateColumns:
                      ".3fr 1.5fr .75fr .65fr .75fr .75fr 1fr .55fr",
                  }}
                >

                  <span>
                    {item.id}
                  </span>

                  <span className="truncate text-[#315F7D]">
                    {item.url}
                  </span>

                  <PageType
                    value={item.type}
                  />

                  <span
                    className={
                      item.issues > 0
                        ? "font-semibold text-[#DC4B48]"
                        : "text-[#07945F]"
                    }
                  >
                    {item.issues}
                  </span>

                  <TinyRing
                    score={
                      item.health
                    }
                  />

                  <TinyRing
                    score={
                      item.speed
                    }
                  />

                  <span>
                    {item.date}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenPage(item)
                    }
                    className="font-semibold text-[#07945F] hover:underline"
                  >
                    View →
                  </button>

                </div>
              )
            )}

          </div>

        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

      </section>

    </div>
  );
}


/* =========================================================
   GENERIC AUDIT PAGE
========================================================= */

function GenericAuditPage({
  title,
  description,
  items,
  icon = "audit",
}) {
  return (
    <section className="rounded-lg border border-[#E4E9E7] bg-white p-3">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-[13px] font-bold text-[#1B2C27]">
            {title}
          </h2>

          <p className="mt-0.5 text-[8px] text-[#7B8984]">
            {description}
          </p>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E8F8F0] text-[#07945F]">
          <Icon
            name={icon}
            size={15}
          />
        </span>

      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">

        {items.map(
          (item) => (
            <div
              key={item.name}
              className="rounded-md border border-[#E6EBE9] p-3 hover:border-[#B9DED0]"
            >

              <div className="flex items-center gap-2">

                <span className="text-[#07945F]">
                  <Icon
                    name={
                      item.icon ||
                      icon
                    }
                    size={14}
                  />
                </span>

                <span className="text-[9px] font-semibold text-[#344740]">
                  {item.name}
                </span>

              </div>

              <div className="mt-2 text-[17px] font-bold text-[#16231F]">
                {item.value}
              </div>

              <div className="mt-0.5 text-[7px] text-[#7B8984]">
                {item.note}
              </div>

            </div>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   ISSUE DETAILS MODAL
========================================================= */

function IssueModal({
  issue,
  onClose,
}) {
  if (!issue) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#003E35]/40 p-4">

      <div className="w-full max-w-[520px] rounded-xl border border-[#DFE6E3] bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#E8ECEA] px-4 py-3">

          <div>
            <div className="text-[12px] font-bold text-[#1B2C27]">
              Issue Details
            </div>

            <div className="mt-0.5 text-[8px] text-[#7B8984]">
              Website audit finding
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#60716B] hover:bg-[#F3F7F5]"
          >
            <Icon
              name="close"
              size={15}
            />
          </button>

        </div>

        <div className="space-y-3 p-4">

          <div>
            <div className="text-[13px] font-bold text-[#1B2C27]">
              {issue.title}
            </div>

            <div className="mt-1 text-[9px] text-[#71807A]">
              {issue.affected}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">

            <div className="rounded-md bg-[#F7FAF9] p-3">
              <div className="text-[7px] text-[#7B8984]">
                Category
              </div>
              <div className="mt-1 text-[9px] font-semibold text-[#344740]">
                {issue.category}
              </div>
            </div>

            <div className="rounded-md bg-[#F7FAF9] p-3">
              <div className="text-[7px] text-[#7B8984]">
                Severity
              </div>
              <div className="mt-1">
                <Severity
                  value={issue.severity}
                />
              </div>
            </div>

            <div className="rounded-md bg-[#F7FAF9] p-3">
              <div className="text-[7px] text-[#7B8984]">
                Page
              </div>
              <div className="mt-1 text-[9px] font-semibold text-[#315F7D]">
                {issue.pageUrl}
              </div>
            </div>

            <div className="rounded-md bg-[#F7FAF9] p-3">
              <div className="text-[7px] text-[#7B8984]">
                Impact
              </div>
              <div className="mt-1">
                <Impact
                  value={issue.impact}
                />
              </div>
            </div>

          </div>

          <div className="rounded-md border border-[#DDEBE5] bg-[#F1FAF6] p-3">

            <div className="flex gap-2">

              <span className="mt-0.5 text-[#07945F]">
                <Icon
                  name="lightbulb"
                  size={14}
                />
              </span>

              <div>

                <div className="text-[9px] font-bold text-[#244239]">
                  Recommended Action
                </div>

                <p className="mt-1 text-[8px] leading-4 text-[#60716B]">
                  Review the affected page and make the recommended SEO improvement. Re-run the audit after making the change to verify the result.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="flex justify-end gap-2 border-t border-[#E8ECEA] px-4 py-3">

          <button
            type="button"
            onClick={onClose}
            className="action-btn"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#08A66B] px-4 py-2 text-[8px] font-semibold text-white hover:bg-[#07945F]"
          >
            Mark as Resolved
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PAGE DETAILS MODAL
========================================================= */

function PageModal({
  page,
  onClose,
}) {
  if (!page) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#003E35]/40 p-4">

      <div className="w-full max-w-[520px] rounded-xl border border-[#DFE6E3] bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#E8ECEA] px-4 py-3">

          <div>
            <div className="text-[12px] font-bold text-[#1B2C27]">
              Page Details
            </div>

            <div className="mt-0.5 text-[8px] text-[#7B8984]">
              SEO page audit information
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#60716B] hover:bg-[#F3F7F5]"
          >
            <Icon
              name="close"
              size={15}
            />
          </button>

        </div>

        <div className="space-y-3 p-4">

          <div className="rounded-md bg-[#F4F8F6] p-3">

            <div className="text-[7px] text-[#7B8984]">
              Page URL
            </div>

            <div className="mt-1 break-all text-[10px] font-semibold text-[#315F7D]">
              {page.url}
            </div>

          </div>

          <div className="grid grid-cols-3 gap-2">

            <div className="rounded-md border border-[#E5EBE8] p-3 text-center">
              <div className="text-[7px] text-[#7B8984]">
                Health
              </div>

              <div className="mt-1 text-[16px] font-bold text-[#16231F]">
                {page.health}
              </div>
            </div>

            <div className="rounded-md border border-[#E5EBE8] p-3 text-center">
              <div className="text-[7px] text-[#7B8984]">
                Speed
              </div>

              <div className="mt-1 text-[16px] font-bold text-[#16231F]">
                {page.speed}
              </div>
            </div>

            <div className="rounded-md border border-[#E5EBE8] p-3 text-center">
              <div className="text-[7px] text-[#7B8984]">
                Issues
              </div>

              <div className="mt-1 text-[16px] font-bold text-[#DC4B48]">
                {page.issues}
              </div>
            </div>

          </div>

          <div className="rounded-md border border-[#E5EBE8] p-3">

            <div className="flex items-center justify-between">

              <span className="text-[8px] text-[#7B8984]">
                Page Type
              </span>

              <PageType
                value={page.type}
              />

            </div>

            <div className="mt-2 flex items-center justify-between">

              <span className="text-[8px] text-[#7B8984]">
                Last Checked
              </span>

              <span className="text-[8px] font-semibold text-[#344740]">
                {page.date}
              </span>

            </div>

          </div>

        </div>

        <div className="flex justify-end border-t border-[#E8ECEA] px-4 py-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#08A66B] px-4 py-2 text-[8px] font-semibold text-white hover:bg-[#07945F]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SITEMAP MODAL
========================================================= */

function SitemapModal({
  url,
  onClose,
  onNotice,
}) {
  const sitemapUrl =
    `${url.replace(/\/$/, "")}/sitemap.xml`;

  const copySitemap = async () => {
    try {
      await navigator.clipboard.writeText(
        sitemapUrl
      );

      onNotice(
        "Sitemap URL copied to clipboard."
      );
    } catch {
      onNotice(
        "Unable to copy sitemap URL."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#003E35]/40 p-4">

      <div className="w-full max-w-[480px] rounded-xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#E8ECEA] px-4 py-3">

          <div className="text-[12px] font-bold text-[#1B2C27]">
            Sitemap
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#60716B]"
          >
            <Icon
              name="close"
              size={15}
            />
          </button>

        </div>

        <div className="p-4">

          <p className="text-[8px] leading-4 text-[#71807A]">
            Your website sitemap is expected at the following location:
          </p>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#DDE6E2] bg-[#F7FAF9] p-2">

            <span className="min-w-0 flex-1 truncate text-[8px] text-[#315F7D]">
              {sitemapUrl}
            </span>

            <button
              type="button"
              onClick={copySitemap}
              className="rounded-md bg-[#08A66B] px-3 py-1.5 text-[8px] font-semibold text-white hover:bg-[#07945F]"
            >
              Copy
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   CSV DOWNLOAD
========================================================= */

function downloadCSV(
  data,
  filename
) {
  if (!data?.length) {
    return;
  }

  const headers =
    Object.keys(data[0]);

  const csvRows = [
    headers.join(","),
    ...data.map(
      (row) =>
        headers
          .map((header) => {
            const value =
              row[header] ?? "";

            return `"${String(value).replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
    ),
  ];

  const blob = new Blob(
    [csvRows.join("\n")],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const link =
    document.createElement("a");

  const url =
    URL.createObjectURL(blob);

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}


/* =========================================================
   GENERIC TAB DATA
========================================================= */

function getGenericPage(
  activeTab
) {
  switch (activeTab) {
    case "Content":
      return {
        title: "Content Analysis",
        description:
          "Content quality, metadata and page-level content signals.",
        icon: "content",
        items: [
          {
            name: "Content Score",
            value: "82/100",
            note: "Good overall quality",
            icon: "content",
          },
          {
            name: "Duplicate Titles",
            value: "14",
            note: "Pages need attention",
            icon: "alert",
          },
          {
            name: "Low Word Count",
            value: "9",
            note: "Pages below target",
            icon: "warning",
          },
          {
            name: "Meta Descriptions",
            value: "12",
            note: "Descriptions need improvement",
            icon: "page",
          },
          {
            name: "H1 Coverage",
            value: "92%",
            note: "Good heading coverage",
            icon: "code",
          },
          {
            name: "Recommendations",
            value: "18",
            note: "Suggested improvements",
            icon: "lightbulb",
          },
        ],
      };

    case "Technical":
      return {
        title: "Technical SEO",
        description:
          "Technical crawl, HTML, indexing and internal-link health.",
        icon: "technical",
        items: [
          {
            name: "Technical Score",
            value: "78/100",
            note: "Good overall health",
            icon: "technical",
          },
          {
            name: "Broken Links",
            value: "6",
            note: "Internal links affected",
            icon: "link",
          },
          {
            name: "Missing H1",
            value: "8",
            note: "Pages affected",
            icon: "code",
          },
          {
            name: "Indexability",
            value: "94%",
            note: "243 of 257 pages indexed",
            icon: "sitemap",
          },
          {
            name: "Structured Data",
            value: "5",
            note: "Pages need schema",
            icon: "code",
          },
          {
            name: "Crawl Errors",
            value: "3",
            note: "Need attention",
            icon: "alert",
          },
        ],
      };

    case "Performance":
      return {
        title: "Performance",
        description:
          "Page speed and Core Web Vitals across crawled pages.",
        icon: "speed",
        items: [
          {
            name: "Mobile Speed",
            value: "86",
            note: "Good",
            icon: "speed",
          },
          {
            name: "Desktop Speed",
            value: "93",
            note: "Excellent",
            icon: "speed",
          },
          {
            name: "LCP",
            value: "1.8s",
            note: "Good",
            icon: "check",
          },
          {
            name: "INP",
            value: "145ms",
            note: "Good",
            icon: "check",
          },
          {
            name: "CLS",
            value: "0.06",
            note: "Good",
            icon: "check",
          },
          {
            name: "Slow Pages",
            value: "9",
            note: "Need optimization",
            icon: "warning",
          },
        ],
      };

    case "Security":
      return {
        title: "Security",
        description:
          "Security checks and website trust signals.",
        icon: "shield",
        items: [
          {
            name: "Security Score",
            value: "92/100",
            note: "Excellent",
            icon: "shield",
          },
          {
            name: "HTTPS",
            value: "Passed",
            note: "Secure connection detected",
            icon: "check",
          },
          {
            name: "Mixed Content",
            value: "0",
            note: "No issues found",
            icon: "check",
          },
          {
            name: "Safe Browsing",
            value: "Passed",
            note: "No warnings detected",
            icon: "shield",
          },
          {
            name: "Redirects",
            value: "2",
            note: "Review redirect chain",
            icon: "external",
          },
          {
            name: "Security Issues",
            value: "0",
            note: "Everything looks good",
            icon: "check",
          },
        ],
      };

    case "Recommendations":
      return {
        title: "Recommendations",
        description:
          "Prioritized actions to improve your website's SEO health.",
        icon: "lightbulb",
        items: [
          {
            name: "High Priority",
            value: "8",
            note: "Fix these first",
            icon: "alert",
          },
          {
            name: "Medium Priority",
            value: "17",
            note: "Improve performance",
            icon: "warning",
          },
          {
            name: "Quick Wins",
            value: "12",
            note: "Easy improvements",
            icon: "check",
          },
          {
            name: "Content Actions",
            value: "9",
            note: "Content opportunities",
            icon: "content",
          },
          {
            name: "Technical Actions",
            value: "7",
            note: "Technical improvements",
            icon: "technical",
          },
          {
            name: "Expected Impact",
            value: "High",
            note: "Strong potential gain",
            icon: "target",
          },
        ],
      };

    default:
      return null;
  }
}


/* =========================================================
   MAIN WEBSITE AUDIT
========================================================= */

export default function WebsiteAudit() {

  const [activeTab, setActiveTab] =
    useState("Summary");

  const [pageView, setPageView] =
    useState("summary");

  const [url, setUrl] =
    useState("https://example.com");

  const [notice, setNotice] =
    useState("");

  const [isAuditing, setIsAuditing] =
    useState(false);

  const [lastAudited, setLastAudited] =
    useState(
      "Sep 15, 2026, 10:24 AM"
    );

  const [showMore, setShowMore] =
    useState(false);

  const [showSitemap, setShowSitemap] =
    useState(false);

  const [selectedIssue, setSelectedIssue] =
    useState(null);

  const [selectedPage, setSelectedPage] =
    useState(null);

  const showNotice = (
    message
  ) => {
    setNotice(message);

    window.setTimeout(
      () => setNotice(""),
      2500
    );
  };


  /* =======================================================
     RUN AUDIT
  ======================================================= */

  const runAudit = () => {
    if (!url.trim()) {
      showNotice(
        "Please enter a website URL."
      );
      return;
    }

    setIsAuditing(true);

    showNotice(
      `Audit started for ${url}`
    );

    window.setTimeout(() => {

      const now =
        new Date();

      const formatted =
        now.toLocaleString(
          "en-IN",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      setLastAudited(
        formatted
      );

      setIsAuditing(false);

      showNotice(
        "Website audit completed successfully."
      );

    }, 1800);
  };


  /* =======================================================
     TAB HANDLER
  ======================================================= */

  const openTab = (
    tab
  ) => {
    setActiveTab(tab);

    if (
      tab === "Issues (40)"
    ) {
      setPageView("issues");
    } else if (
      tab === "Pages (124)"
    ) {
      setPageView("pages");
    } else {
      setPageView("summary");
    }
  };


  /* =======================================================
     SUMMARY
  ======================================================= */

  const goSummary = () => {
    setActiveTab("Summary");
    setPageView("summary");
  };


  /* =======================================================
     SHARE REPORT
  ======================================================= */

  const shareReport = async () => {
    const shareData = {
      title: "TN SEO Website Audit",
      text: `Website audit report for ${url}`,
    };

    try {
      if (
        navigator.share
      ) {
        await navigator.share(
          shareData
        );

        showNotice(
          "Report shared successfully."
        );
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        showNotice(
          "Report link copied to clipboard."
        );
      }
    } catch {
      showNotice(
        "Share cancelled."
      );
    }
  };


  /* =======================================================
     DOWNLOAD REPORT
  ======================================================= */

  const downloadReport = () => {
    const report = [
      "TN SEO - Website Audit Report",
      "",
      `Website: ${url}`,
      `Last Audited: ${lastAudited}`,
      "",
      "Overall SEO Health: 93/100",
      "",
      "Critical Issues: 12",
      "Warnings: 28",
      "Passed Checks: 156",
      "Pages Crawled: 257",
      "Indexed Pages: 243",
      "Mobile Page Speed: 86",
      "",
      "Top Issues:",
      ...issueData.map(
        (issue) =>
          `- ${issue.title} | ${issue.severity} | ${issue.pageUrl}`
      ),
    ].join("\n");

    const blob = new Blob(
      [report],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "tn-seo-audit-report.txt";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    showNotice(
      "Audit report downloaded."
    );
  };


  /* =======================================================
     GENERIC PAGE
  ======================================================= */

  const genericPage =
    getGenericPage(
      activeTab
    );


  /* =======================================================
     RENDER SUB PAGE
  ======================================================= */

  let content;

  if (
    pageView === "issues"
  ) {
    content = (
      <IssuesPage
        onBack={goSummary}
        onOpenIssue={
          setSelectedIssue
        }
      />
    );
  } else if (
    pageView === "pages"
  ) {
    content = (
      <PagesPage
        onBack={goSummary}
        onOpenPage={
          setSelectedPage
        }
      />
    );
  } else if (
    genericPage
  ) {
    content = (
      <GenericAuditPage
        title={
          genericPage.title
        }
        description={
          genericPage.description
        }
        icon={
          genericPage.icon
        }
        items={
          genericPage.items
        }
      />
    );
  } else {
    content = (
      <SummaryPage
        setTab={openTab}
        onOpenIssues={() =>
          openTab("Issues (40)")
        }
        onOpenPages={() =>
          openTab("Pages (124)")
        }
        onOpenReport={() =>
          showNotice(
            "You are viewing the complete Website Audit report."
          )
        }
      />
    );
  }


  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1B2C27]">

      <Sidebar
        active="Website Audit"
      />

      <TopBar
        url={url}
        setUrl={setUrl}
        onRunAudit={runAudit}
      />

      <main className="lg:ml-[184px]">

        <div className="mx-auto max-w-[1400px] px-3 pb-6 pt-3">

          {/* Notification */}
          {notice && (
            <div className="fixed right-4 top-[68px] z-[120] rounded-md bg-[#003E35] px-3 py-2 text-[9px] font-semibold text-white shadow-lg">
              {notice}
            </div>
          )}


          {/* =================================================
              MAIN HEADER
          ================================================= */}

          <div className="mb-2 flex flex-wrap items-end justify-between gap-3">

            <div className="flex items-center gap-2">

              {pageView !== "summary" && (
                <button
                  type="button"
                  onClick={goSummary}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DFE6E3] bg-white text-[#263C35] hover:bg-[#F4F8F6]"
                >
                  <Icon
                    name="arrowLeft"
                    size={16}
                  />
                </button>
              )}

              <div>

                <h1 className="text-[18px] font-bold tracking-[-0.3px] text-[#172722]">

                  {pageView ===
                  "issues"
                    ? "Top Issues to Fix"
                    : pageView ===
                      "pages"
                    ? "Pages Overview"
                    : "Website Audit"}

                </h1>

                <p className="mt-0.5 text-[8px] text-[#71807A]">

                  {pageView ===
                  "issues"
                    ? "Detailed list of SEO issues found on your website."
                    : pageView ===
                      "pages"
                    ? "All crawled pages with SEO metrics and issues."
                    : "Find and fix SEO issues to improve your website's performance."}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-[7px] text-[#7A8883]">

              <span>
                Last audited{" "}
                {lastAudited}
              </span>

              <button
                type="button"
                onClick={runAudit}
                disabled={isAuditing}
                className="font-semibold text-[#07945F] disabled:opacity-50"
              >
                {isAuditing
                  ? "Auditing..."
                  : "↻ Re-run Audit"}
              </button>

            </div>

          </div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          {pageView ===
            "summary" && (
            <div className="mb-2 flex flex-wrap items-center justify-end gap-1.5">

              <button
                type="button"
                onClick={() =>
                  setShowSitemap(true)
                }
                className="action-btn"
              >
                <Icon
                  name="sitemap"
                  size={11}
                />
                Sitemap
              </button>

              <button
                type="button"
                onClick={
                  downloadReport
                }
                className="action-btn"
              >
                <Icon
                  name="download"
                  size={11}
                />
                Download Report
              </button>

              <button
                type="button"
                onClick={
                  shareReport
                }
                className="action-btn"
              >
                <Icon
                  name="share"
                  size={11}
                />
                Share Report
              </button>

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setShowMore(
                      (value) =>
                        !value
                    )
                  }
                  className="action-btn"
                >
                  <Icon
                    name="more"
                    size={13}
                  />
                </button>

                {showMore && (
                  <div className="absolute right-0 top-8 z-50 w-44 overflow-hidden rounded-lg border border-[#DFE6E3] bg-white shadow-xl">

                    <button
                      type="button"
                      onClick={() => {
                        downloadCSV(
                          issueData,
                          "issues.csv"
                        );

                        setShowMore(
                          false
                        );

                        showNotice(
                          "Issues CSV downloaded."
                        );
                      }}
                      className="block w-full px-3 py-2 text-left text-[8px] text-[#52645D] hover:bg-[#F5F8F7]"
                    >
                      Export Issues CSV
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        downloadCSV(
                          pageData,
                          "pages.csv"
                        );

                        setShowMore(
                          false
                        );

                        showNotice(
                          "Pages CSV downloaded."
                        );
                      }}
                      className="block w-full px-3 py-2 text-left text-[8px] text-[#52645D] hover:bg-[#F5F8F7]"
                    >
                      Export Pages CSV
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        window.print();

                        setShowMore(
                          false
                        );
                      }}
                      className="block w-full px-3 py-2 text-left text-[8px] text-[#52645D] hover:bg-[#F5F8F7]"
                    >
                      Print Report
                    </button>

                  </div>
                )}

              </div>

            </div>
          )}


          {/* =================================================
              TABS
          ================================================= */}

          <div className="mb-2 flex gap-5 overflow-x-auto border-b border-[#DFE6E3] px-1">

            {auditTabs.map(
              (tab) => {
                const selected =
                  activeTab ===
                  tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() =>
                      openTab(tab)
                    }
                    className={`relative h-8 whitespace-nowrap text-[8px] font-semibold ${
                      selected
                        ? "text-[#07945F]"
                        : "text-[#667872]"
                    }`}
                  >
                    {tab}

                    {selected && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full bg-[#08A66B]" />
                    )}
                  </button>
                );
              }
            )}

          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="mt-2">

            {isAuditing ? (
              <div className="flex min-h-[350px] items-center justify-center rounded-lg border border-[#E4E9E7] bg-white">

                <div className="text-center">

                  <div className="mx-auto flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-[#DDEBE5] border-t-[#08A66B]" />

                  <div className="mt-3 text-[11px] font-bold text-[#1B2C27]">
                    Running Website Audit
                  </div>

                  <div className="mt-1 text-[8px] text-[#7B8984]">
                    Crawling pages and checking SEO signals...
                  </div>

                </div>

              </div>
            ) : (
              content
            )}

          </div>

        </div>

      </main>


      {/* =====================================================
          MODALS
      ===================================================== */}

      <IssueModal
        issue={selectedIssue}
        onClose={() =>
          setSelectedIssue(null)
        }
      />

      <PageModal
        page={selectedPage}
        onClose={() =>
          setSelectedPage(null)
        }
      />

      {showSitemap && (
        <SitemapModal
          url={url}
          onClose={() =>
            setShowSitemap(false)
          }
          onNotice={showNotice}
        />
      )}


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 27px;
          padding: 0 9px;
          border: 1px solid #DFE6E3;
          border-radius: 6px;
          background: #FFFFFF;
          color: #435650;
          font-size: 8px;
          font-weight: 600;
          white-space: nowrap;
          transition: all .15s ease;
        }

        .action-btn:hover {
          background: #F4F8F6;
          border-color: #C8DCD4;
        }

        .page-btn {
          display: flex;
          height: 22px;
          min-width: 22px;
          align-items: center;
          justify-content: center;
          border: 1px solid #DFE6E3;
          border-radius: 4px;
          background: #FFFFFF;
          color: #667872;
          font-size: 7px;
        }

        .page-btn:hover {
          background: #F3F8F6;
        }

        .page-btn.active {
          border-color: #08A66B;
          background: #08A66B;
          color: #FFFFFF;
        }

        @media print {

          aside,
          header,
          button,
          nav {
            display: none !important;
          }

          main {
            margin-left: 0 !important;
          }

          body {
            background: white !important;
          }
        }

      `}</style>

    </div>
  );
}