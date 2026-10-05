import React, { useCallback, useEffect, useMemo, useState } from "react";

/* =========================================================
   API CONFIGURATION
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_ROUTES = {
  keywords: "/keywords",
  stats: "/keywords/stats",
  suggestions: "/keywords/suggestions",
  rankings: "/keywords/rankings",
  difficulty: "/keywords/difficulty-distribution",
  intent: "/keywords/search-intent",
  trend: "/keywords/volume-trend",
  opportunities: "/keywords/opportunities",
  aiSuggestions: "/keywords/ai-suggestions",
};

async function apiRequest(path, options = {}) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof data === "object"
        ? data.message || data.error || "Request failed"
        : data || "Request failed"
    );
  }

  return data;
}

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const text = query.toString();
  return text ? `?${text}` : "";
};

const normalizeKeyword = (item, index = 0) => ({
  id: item.id || item._id || index + 1,
  keyword: item.keyword || item.term || "",
  volume: item.volume ?? item.searchVolume ?? 0,
  difficulty: Number(item.difficulty ?? item.keywordDifficulty ?? 0),
  cpc: item.cpc ?? 0,
  intent: item.intent || "Informational",
  trend: Number(item.trend ?? item.trendScore ?? 0),
});

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  return payload?.data || payload?.items || payload?.keywords || payload?.results || [];
};

const emptyStats = {
  totalKeywords: 0,
  totalSearchVolume: 0,
  averageDifficulty: 0,
  averageCpc: 0,
};

const emptyDashboardData = {
  difficulty: [],
  intent: [],
  volumeTrend: [],
  opportunities: [],
};

/* =========================================================
   ICONS
========================================================= */

function Icon({ name, size = 18 }) {
  const icons = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    audit: (
      <>
        <path d="M5 4h10l4 4v12H5z" />
        <path d="M15 4v5h4" />
        <path d="M8 13h7M8 17h5" />
      </>
    ),

    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),

    keyword: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
      </>
    ),

    technical: (
      <>
        <path d="M12 3 4 7l8 4 8-4-8-4Z" />
        <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
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
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 7 20l1.1-1.1" />
      </>
    ),

    rank: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-8M22 19V3" />
      </>
    ),

    competitor: (
      <>
        <circle cx="9" cy="9" r="4" />
        <circle cx="17" cy="15" r="4" />
        <path d="M12 12l2 2" />
      </>
    ),

    report: (
      <>
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 15a2 2 0 0 0 .3 2l-2 2a2 2 0 0 0-2-.3 2 2 0 0 0-1.3 1.8h-3a2 2 0 0 0-1.3-1.8 2 2 0 0 0-2 .3l-2-2a2 2 0 0 0 .3-2A2 2 0 0 0 4 14v-3a2 2 0 0 0 1.7-1.3 2 2 0 0 0-.3-2l2-2a2 2 0 0 0 2 .3A2 2 0 0 0 11 4V3h3v1a2 2 0 0 0 1.3 1.7 2 2 0 0 0 2-.3l2 2a2 2 0 0 0-.3 2A2 2 0 0 0 20 11v3a2 2 0 0 0-1 1Z" />
      </>
    ),

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),

    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,

    arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M4 20h16" />
      </>
    ),

    spark: (
      <>
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
      </>
    ),

    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

/* =========================================================
   LOGO
========================================================= */

function TNLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#10b66c] text-[#10b66c]">
        <span className="text-sm font-black">↗</span>
      </div>

      <div>
        <div className="text-[14px] font-bold leading-none tracking-wide">
          TN SEO<sup className="text-[7px]">®</sup>
        </div>

        <div className="mt-1 text-[7px] tracking-[2.5px]">
          MODULE
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ active }) {
  const items = [
    ["Dashboard", "home"],
    ["Website Audit", "audit"],
    ["Keyword Research", "keyword"],
    ["Technical SEO", "technical"],
    ["Content / AI Writer", "content"],
    ["On-Page SEO", "page"],
    ["Backlink Analysis", "link"],
    ["Rank Tracking", "rank"],
    ["Competitor Analysis", "competitor"],
    ["Reports", "report"],
    ["Settings", "settings"],
  ];

  const navigate = (label) => {
    const routes = {
      Dashboard: "/",
      "Website Audit": "/website-audit",
      "Keyword Research": "/keyword-research",
      "Technical SEO": "/technical-seo",
      "Content / AI Writer": "/content",
      "On-Page SEO": "/on-page-seo",
      "Backlink Analysis": "/backlinks",
      "Rank Tracking": "/rank-tracking",
      "Competitor Analysis": "/competitor-analysis",
      Reports: "/reports",
      Settings: "/settings",
    };

    if (routes[label]) {
      window.location.href = routes[label];
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[184px] bg-[#003e35] text-white lg:block">
      <div className="flex h-[57px] items-center border-b border-white/10 px-4">
        <TNLogo />
      </div>

      <nav className="space-y-0.5 px-2 py-3">
        {items.map(([label, icon]) => {
          const isActive = active === label;

          return (
            <button
              key={label}
              type="button"
              onClick={() => navigate(label)}
              className={`flex h-8 w-full items-center gap-2.5 rounded-md px-3 text-left text-[10px] transition ${
                isActive
                  ? "bg-[#08a66b] font-semibold text-white"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              <Icon name={icon} size={14} />
              <span className="truncate">{label}</span>
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

function TopBar({ search, setSearch, onSearch }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getUser = () => {
    try {
      const localUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      const sessionUser = JSON.parse(
        sessionStorage.getItem("user") || "null"
      );

      return localUser || sessionUser;
    } catch {
      return null;
    }
  };

  const user = getUser();

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "Utsav";

  const firstName = userName.split(" ")[0];

  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => item.charAt(0).toUpperCase())
      .join("") || "U";

  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-20 h-[57px] border-b border-[#e6ecef] bg-white/95 px-4 backdrop-blur">
      <div className="flex h-full items-center gap-3">

        {/* Page title */}
        <div className="shrink-0">
          <h1 className="text-[13px] font-semibold text-[#0b173a]">
            Keyword Research
          </h1>
        </div>

        {/* Back Home */}
        <button
          type="button"
          onClick={handleBackHome}
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-[#dbe4e7] bg-white px-3 text-[10px] font-semibold text-[#324a70] transition hover:bg-[#f5f8f7]"
        >
          <Icon name="home" size={13} />
          Back to Home
        </button>

        {/* Search */}
        <div className="flex h-8 w-full max-w-[520px] min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dbe4e7] bg-white px-3">
          <span className="shrink-0 text-[#00a66a]">
            <Icon name="search" size={14} />
          </span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Enter a keyword or topic (e.g. SEO services)"
            className="w-full bg-transparent text-[10px] text-[#17325a] outline-none placeholder:text-[#8d9793]"
          />
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={onSearch}
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-[#08a66b] px-3.5 text-[10px] font-semibold text-white transition hover:bg-[#078f5d]"
        >
          Search Keywords
          <Icon name="arrowRight" size={13} />
        </button>

        {/* Right */}
        <div className="ml-auto flex shrink-0 items-center gap-4">

          {/* Notification */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowNotifications((value) => !value)
              }
              className="relative flex h-8 w-8 items-center justify-center rounded-md text-[#07153b] hover:bg-[#f4f7f5]"
              aria-label="Notifications"
            >
              <Icon name="bell" size={19} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border border-white bg-red-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-10 z-50 w-[310px] overflow-hidden rounded-xl border border-[#dfe7e4] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <div className="border-b border-[#edf1ef] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[12px] font-bold text-[#12251f]">
                      Notifications
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setShowNotifications(false)
                      }
                      className="text-[#84908b]"
                    >
                      <Icon name="close" size={15} />
                    </button>
                  </div>

                  <p className="mt-1 text-[9px] text-[#84908b]">
                    Your latest SEO activity
                  </p>
                </div>

                <div className="divide-y divide-[#edf1ef]">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      window.location.href =
                        "/keyword-research";
                    }}
                    className="flex w-full gap-3 px-4 py-3 text-left hover:bg-[#f8faf9]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f8f1] text-[#07945f]">
                      <Icon name="search" size={14} />
                    </span>

                    <span>
                      <span className="block text-[10px] font-semibold text-[#18201d]">
                        New keyword opportunities
                      </span>

                      <span className="mt-1 block text-[9px] text-[#71807a]">
                        New keyword opportunities are ready to review.
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      window.location.href =
                        "/website-audit";
                    }}
                    className="flex w-full gap-3 px-4 py-3 text-left hover:bg-[#f8faf9]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#315b9b]">
                      <Icon name="audit" size={14} />
                    </span>

                    <span>
                      <span className="block text-[10px] font-semibold text-[#18201d]">
                        Website audit available
                      </span>

                      <span className="mt-1 block text-[9px] text-[#71807a]">
                        Your latest audit report is ready.
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button
            type="button"
            onClick={() => {
              window.location.href = "/settings";
            }}
            className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-[#f5f8f7]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003e35] text-[10px] font-semibold text-white">
              {initials}
            </div>

            <div className="hidden text-[10px] leading-4 sm:block">
              <div className="text-[#324a70]">
                Good Evening,
              </div>

              <div className="font-bold text-[#0b173a]">
                {firstName} 👋
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   MINI TREND
========================================================= */

function MiniTrend({ color = "#00a768" }) {
  return (
    <svg
      width="66"
      height="28"
      viewBox="0 0 66 28"
      fill="none"
    >
      <path
        d="M2 23 11 19 19 20 28 14 37 15 46 8 55 11 64 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <circle
        cx="64"
        cy="3"
        r="2"
        fill={color}
      />
    </svg>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  change,
  changeColor = "text-emerald-600",
  iconColor = "text-emerald-600",
  iconBg = "bg-emerald-50",
  trendColor = "#00a768",
}) {
  return (
    <div className="min-w-0 rounded-lg border border-[#e4e9eb] bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
        >
          <Icon name={icon} size={17} />
        </div>

        <div className="min-w-0">
          <div className="text-[17px] font-bold leading-none text-[#0a1638]">
            {value}
          </div>

          <div className="mt-1 whitespace-nowrap text-[9px] text-[#344b70]">
            {label}
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-end justify-between">
        <span
          className={`text-[9px] font-semibold ${changeColor}`}
        >
          {change}
        </span>

        <MiniTrend color={trendColor} />
      </div>
    </div>
  );
}

/* =========================================================
   DIFFICULTY BADGE
========================================================= */

function DifficultyBadge({ value }) {
  let className = "";

  if (value <= 40) {
    className = "bg-emerald-50 text-emerald-600";
  } else if (value <= 60) {
    className = "bg-[#e8f4ed] text-[#52996d]";
  } else if (value <= 70) {
    className = "bg-amber-50 text-amber-600";
  } else {
    className = "bg-red-50 text-red-500";
  }

  return (
    <span
      className={`inline-flex min-w-[28px] items-center justify-center rounded-md px-1.5 py-1 text-[9px] font-semibold ${className}`}
    >
      {value}
    </span>
  );
}

/* =========================================================
   INTENT BADGE
========================================================= */

function IntentBadge({ value }) {
  const styles = {
    Commercial: "bg-[#fff0e5] text-[#d77721]",
    Informational: "bg-[#eaf3ff] text-[#4280bd]",
    Transactional: "bg-[#e7f8ed] text-[#19965c]",
    Navigational: "bg-[#f0eafb] text-[#7653a7]",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-[8px] font-medium ${
        styles[value] || "bg-slate-50 text-slate-500"
      }`}
    >
      {value}
    </span>
  );
}

/* =========================================================
   SPARKLINE
========================================================= */

function Sparkline({ trend = 80 }) {
  const color = trend >= 80 ? "#00a768" : "#8b3dff";

  return (
    <svg
      width="46"
      height="21"
      viewBox="0 0 46 21"
      fill="none"
    >
      <path
        d="M1 18 7 14 13 16 19 10 25 12 32 6 38 8 45 2"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   KEYWORD TABLE
========================================================= */

function KeywordTable({
  rows,
  selectedKeywords,
  setSelectedKeywords,
  onAnalyze,
  onMore,
}) {
  const toggleKeyword = (id) => {
    setSelectedKeywords((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    if (selectedKeywords.length === rows.length) {
      setSelectedKeywords([]);
    } else {
      setSelectedKeywords(rows.map((row) => row.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#e4e9eb]">
      <div className="grid grid-cols-[30px_1.7fr_1fr_.75fr_1fr_1fr_.7fr_.65fr] items-center border-b border-[#e9eeec] bg-[#f8fafb] px-3 py-2 text-[8px] font-semibold text-[#526784]">
        <div>
          <input
            type="checkbox"
            checked={
              rows.length > 0 &&
              selectedKeywords.length === rows.length
            }
            onChange={toggleAll}
            className="accent-[#08a66b]"
          />
        </div>

        <div>Keyword</div>
        <div>Search Volume</div>
        <div>Difficulty</div>
        <div>CPC</div>
        <div>Intent</div>
        <div>Trend</div>
        <div className="text-right">Actions</div>
      </div>

      {rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[30px_1.7fr_1fr_.75fr_1fr_1fr_.7fr_.65fr] items-center border-b border-[#edf1f2] px-3 py-1.5 last:border-0 hover:bg-[#fbfdfc]"
        >
          <div>
            <input
              type="checkbox"
              checked={selectedKeywords.includes(row.id)}
              onChange={() => toggleKeyword(row.id)}
              className="accent-[#08a66b]"
            />
          </div>

          <div className="truncate pr-2 text-[9px] font-medium text-[#18355e]">
            {row.keyword}
          </div>

          <div className="text-[9px] text-[#3c567d]">
            {row.volume}
          </div>

          <div>
            <DifficultyBadge value={row.difficulty} />
          </div>

          <div className="text-[9px] text-[#3c567d]">
            {row.cpc}
          </div>

          <div>
            <IntentBadge value={row.intent} />
          </div>

          <div>
            <Sparkline trend={row.trend} />
          </div>

          <div className="flex justify-end gap-1">
            <button
              type="button"
              title="Analyze keyword"
              onClick={() => onAnalyze?.(row)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#00a768] hover:bg-[#e9f8f1]"
            >
              <Icon name="search" size={12} />
            </button>

            <button
              type="button"
              title="More actions"
              onClick={() => onMore?.(row)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#7c8984] hover:bg-[#f0f4f2]"
            >
              <Icon name="more" size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   DIFFICULTY DISTRIBUTION
========================================================= */

function DifficultyDistribution({ data = [], total = 0 }) {
  const segments = data.length
    ? data
    : [
        { label: "Easy [0-29]", value: 0, color: "#10a96b" },
        { label: "Moderate [30-49]", value: 0, color: "#72b98b" },
        { label: "Hard [50-69]", value: 0, color: "#e4a54d" },
        { label: "Very Hard [70-100]", value: 0, color: "#e96b64" },
      ];
  const totalPercent = segments.reduce((sum, item) => sum + Number(item.value || 0), 0) || 1;
  let offset = 0;

  return (
    <div className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-[#101d3e]">Keyword Difficulty Distribution</h3>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[112px] w-[112px] shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="43" fill="none" stroke="#edf1ef" strokeWidth="14" />
            {segments.map((item) => {
              const percentage = Number(item.value || 0);
              const dash = (percentage / 100) * 270;
              const currentOffset = offset;
              offset += dash;
              return (
                <circle key={item.label} cx="60" cy="60" r="43" fill="none" stroke={item.color || "#10a96b"} strokeWidth="14" strokeDasharray={`${dash} 270`} strokeDashoffset={-currentOffset} />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold text-[#101d3e]">{Number(total).toLocaleString()}</span>
            <span className="text-[8px] text-[#73819a]">Keywords</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {segments.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color || "#10a96b" }} />
                <span className="text-[8px] text-[#526784]">{item.label}</span>
              </div>
              <span className="text-[8px] font-semibold text-[#3c567d]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH INTENT
========================================================= */

function SearchIntentBreakdown({ data = [] }) {
  const colors = { Informational: "bg-[#3e82bd]", Commercial: "bg-[#5a9cc9]", Transactional: "bg-[#e0a43f]", Navigational: "bg-[#8b55bf]" };
  return (
    <div className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <h3 className="text-[11px] font-bold text-[#101d3e]">Search Intent Breakdown</h3>
      <div className="mt-4 space-y-3">
        {data.length ? data.map((item) => {
          const label = item.label || item.intent || "Unknown";
          const value = Number(item.value ?? item.percentage ?? 0);
          return (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[8px] text-[#526784]">{label}</span>
                <span className="text-[8px] font-semibold text-[#3c567d]">{value}%</span>
              </div>
              <div className="h-[6px] overflow-hidden rounded-full bg-[#edf1ef]">
                <div className={`h-full rounded-full ${colors[label] || "bg-[#08a66b]"}`} style={{ width: `${Math.min(100, value)}%` }} />
              </div>
            </div>
          );
        }) : <p className="text-[8px] text-[#7b8aa1]">No intent data available.</p>}
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH VOLUME TREND
========================================================= */

function SearchVolumeTrend({ data = [], range = "Last 30 days", onRangeChange }) {
  const points = data.map((item, index) => ({ label: item.label || item.date || index + 1, value: Number(item.value ?? item.volume ?? 0) }));
  const max = Math.max(...points.map((p) => p.value), 1);
  const polyline = points.map((point, index) => {
    const x = points.length <= 1 ? 350 : 35 + (index * 655) / (points.length - 1);
    const y = 88 - (point.value / max) * 76;
    return `${x},${y}`;
  }).join(" ");
  return (
    <section className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <div className="flex items-center justify-between">
        <div><h3 className="text-[11px] font-bold text-[#101d3e]">Search Volume Trend</h3><p className="text-[8px] text-[#7b8aa1]">Keyword volume over time</p></div>
        <select value={range} onChange={(e) => onRangeChange?.(e.target.value)} className="rounded-md border border-[#dce5e9] bg-white px-2 py-1 text-[8px] text-[#526784] outline-none">
          <option>Last 30 days</option><option>Last 90 days</option><option>Last 6 months</option>
        </select>
      </div>
      <div className="mt-3 h-[105px] w-full rounded-md bg-[#f8fbf9] px-2 py-2">
        <svg viewBox="0 0 700 105" className="h-full w-full" preserveAspectRatio="none">
          <line x1="35" y1="20" x2="690" y2="20" stroke="#e3eae7"/><line x1="35" y1="50" x2="690" y2="50" stroke="#e3eae7"/><line x1="35" y1="80" x2="690" y2="80" stroke="#e3eae7"/>
          {points.length > 1 && <polyline points={polyline} fill="none" stroke="#00a768" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          {points.map((point, index) => { const x = points.length <= 1 ? 350 : 35 + (index * 655) / (points.length - 1); const y = 88 - (point.value / max) * 76; return <circle key={`${point.label}-${index}`} cx={x} cy={y} r="3" fill="#00a768" />; })}
        </svg>
      </div>
      <div className="mt-1 flex justify-between pl-7 text-[7px] text-[#8a96a8]">
        {points.slice(-5).map((point, index) => <span key={`${point.label}-${index}`}>{point.label}</span>)}
      </div>
    </section>
  );
}

/* =========================================================
   TOP OPPORTUNITIES
========================================================= */

function TopKeywordOpportunities({ data = [], onViewAll }) {
  return (
    <section className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <div className="flex items-center justify-between"><h3 className="text-[11px] font-bold text-[#101d3e]">Top Keyword Opportunities</h3><button type="button" onClick={onViewAll} className="text-[8px] font-semibold text-[#00a768] hover:underline">View All →</button></div>
      <div className="mt-2">
        <div className="grid grid-cols-[24px_1.6fr_1fr_.65fr] border-b border-[#edf1ef] px-1 py-1.5 text-[7px] font-semibold text-[#7a899f]"><span>#</span><span>Keyword</span><span>Search Volume</span><span>Difficulty</span></div>
        {data.map((item, index) => <div key={item.id || item._id || index} className="grid grid-cols-[24px_1.6fr_1fr_.65fr] items-center border-b border-[#f0f3f1] px-1 py-1.5 last:border-0"><span className="text-[8px] text-[#73819a]">{index + 1}</span><span className="truncate text-[8px] font-medium text-[#18355e]">{item.keyword || item.term}</span><span className="text-[8px] text-[#526784]">{item.volume ?? item.searchVolume ?? 0}</span><DifficultyBadge value={Number(item.difficulty || 0)} /></div>)}
        {!data.length && <p className="px-1 py-5 text-center text-[8px] text-[#7b8aa1]">No opportunities available.</p>}
      </div>
    </section>
  );
}

/* =========================================================
   AI KEYWORD BANNER
========================================================= */

function AIKeywordBanner({ onGenerate }) {
  return (
    <section className="flex items-center justify-between rounded-lg border border-[#cde9dc] bg-[#f0fbf5] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9f5e7] text-[#08a66b]">
          <Icon name="spark" size={18} />
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-[#18352d]">
            Get More Keyword Ideas with AI
          </h3>

          <p className="mt-0.5 text-[8px] text-[#688077]">
            Discover content ideas, long-tail keywords and new opportunities.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="flex h-7 items-center gap-1.5 rounded-md bg-[#08a66b] px-3 text-[8px] font-semibold text-white hover:bg-[#078f5d]"
      >
        Generate Ideas
        <Icon name="arrowRight" size={11} />
      </button>
    </section>
  );
}


/* =========================================================
   KEYWORD SUGGESTIONS + RANKING HISTORY
   ---------------------------------------------------------
   Integrated from the earlier Keyword Suggestions /
   Ranking History source while keeping the existing
   Keyword Research home UI unchanged.
========================================================= */

const keywordSuggestionRows = [];
const rankingHistoryRows = [];

function KeywordSuggestionControls({ query, setQuery, country, setCountry, onSearch }) {
  return (
    <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_220px_100px]">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
        className="h-9 rounded-md border border-[#dfe7e4] bg-white px-3 text-[9px] text-[#17325a] outline-none focus:border-[#08a66b]"
      />

      <select
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        className="h-9 rounded-md border border-[#dfe7e4] bg-white px-3 text-[9px] text-[#526784] outline-none"
      >
        <option>🇮🇳 Google (India)</option>
        <option>🇺🇸 Google (United States)</option>
        <option>🇬🇧 Google (United Kingdom)</option>
      </select>

      <button
        type="button"
        onClick={onSearch}
        className="rounded-md bg-[#08a66b] text-[9px] font-semibold text-white hover:bg-[#078f5d]"
      >
        Search
      </button>
    </div>
  );
}

function SuggestionFilters({ filters, setFilters }) {
  const update = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-5">
      <select
        value={filters.intent}
        onChange={(event) => update("intent", event.target.value)}
        className="h-8 rounded-md border border-[#dfe7e4] bg-white px-2 text-[8px] text-[#526784]"
      >
        <option>Intent: All</option>
        <option>Commercial</option>
        <option>Transactional</option>
        <option>Informational</option>
      </select>

      <select
        value={filters.difficulty}
        onChange={(event) => update("difficulty", event.target.value)}
        className="h-8 rounded-md border border-[#dfe7e4] bg-white px-2 text-[8px] text-[#526784]"
      >
        <option>Difficulty: All</option>
        <option>0 - 40</option>
        <option>41 - 60</option>
        <option>61 - 100</option>
      </select>

      <select
        value={filters.volume}
        onChange={(event) => update("volume", event.target.value)}
        className="h-8 rounded-md border border-[#dfe7e4] bg-white px-2 text-[8px] text-[#526784]"
      >
        <option>Search Volume: All</option>
        <option>1K+</option>
        <option>5K+</option>
        <option>10K+</option>
      </select>

      <select
        value={filters.cpc}
        onChange={(event) => update("cpc", event.target.value)}
        className="h-8 rounded-md border border-[#dfe7e4] bg-white px-2 text-[8px] text-[#526784]"
      >
        <option>CPC: All</option>
        <option>₹0 - ₹50</option>
        <option>₹51 - ₹80</option>
        <option>₹81+</option>
      </select>

      <button
        type="button"
        onClick={() =>
          setFilters({
            intent: "Intent: All",
            difficulty: "Difficulty: All",
            volume: "Search Volume: All",
            cpc: "CPC: All",
          })
        }
        className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-[#dfe7e4] bg-white px-2 text-[8px] text-[#526784] hover:bg-[#f7faf8]"
      >
        <Icon name="close" size={11} />
        Clear Filters
      </button>
    </div>
  );
}

function KeywordSuggestionsView({ onBack, notify }) {
  const [query, setQuery] = useState("seo services");
  const [country, setCountry] = useState("🇮🇳 Google (India)");
  const [filters, setFilters] = useState({
    intent: "Intent: All",
    difficulty: "Difficulty: All",
    volume: "Search Volume: All",
    cpc: "CPC: All",
  });
  const [added, setAdded] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const [rows, setRows] = useState([]);
  const [suggestionStats, setSuggestionStats] = useState({});
  const [loading, setLoading] = useState(false);

  const loadSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest(`${API_ROUTES.suggestions}${buildQuery({ query, country })}`);
      const source = normalizeList(response);
      setSuggestionStats(response?.stats || response?.data?.stats || {});
      setRows(source.map((item, index) => [
        item.keyword || item.term || "",
        item.volume ?? item.searchVolume ?? 0,
        String(item.difficulty ?? 0),
        item.cpc ?? 0,
        item.intent || "Informational",
        item.trend || "green",
      ]));
    } catch (error) {
      notify(error.message || "Unable to load keyword suggestions.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [query, country, notify]);

  useEffect(() => { loadSuggestions(); }, [loadSuggestions]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((row) => {
      const keywordMatch = !q || row[0].toLowerCase().includes(q);

      const intentMatch =
        filters.intent === "Intent: All" || row[4] === filters.intent;

      const difficultyMatch =
        filters.difficulty === "Difficulty: All" ||
        (filters.difficulty === "0 - 40" && Number(row[2]) <= 40) ||
        (filters.difficulty === "41 - 60" &&
          Number(row[2]) >= 41 &&
          Number(row[2]) <= 60) ||
        (filters.difficulty === "61 - 100" && Number(row[2]) >= 61);

      const volume = Number(row[1].replace(/,/g, ""));
      const volumeMatch =
        filters.volume === "Search Volume: All" ||
        (filters.volume === "1K+" && volume >= 1000) ||
        (filters.volume === "5K+" && volume >= 5000) ||
        (filters.volume === "10K+" && volume >= 10000);

      const cpc = Number(row[3].replace(/[₹,]/g, ""));
      const cpcMatch =
        filters.cpc === "CPC: All" ||
        (filters.cpc === "₹0 - ₹50" && cpc <= 50) ||
        (filters.cpc === "₹51 - ₹80" && cpc >= 51 && cpc <= 80) ||
        (filters.cpc === "₹81+" && cpc >= 81);

      return (
        keywordMatch &&
        intentMatch &&
        difficultyMatch &&
        volumeMatch &&
        cpcMatch
      );
    });
  }, [query, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / rowsPerPage)
  );

  const visibleRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const runSearch = () => {
    setPage(1);
    loadSuggestions();
    notify(
      query.trim()
        ? `Searching keyword suggestions for "${query.trim()}".`
        : "Showing all keyword suggestions."
    );
  };

  const toggleAdd = (keyword) => {
    setAdded((current) =>
      current.includes(keyword)
        ? current.filter((item) => item !== keyword)
        : [...current, keyword]
    );

    notify(
      added.includes(keyword)
        ? `"${keyword}" removed from tracking.`
        : `"${keyword}" added to tracking.`
    );
  };

  return (
    <section className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dfe7e4] text-[#324a70] hover:bg-[#f7faf8]"
            title="Back to Keyword Research"
          >
            <Icon name="arrowLeft" size={13} />
          </button>

          <div>
            <h2 className="text-[14px] font-bold text-[#101d3e]">
              Keyword Suggestions
            </h2>
            <p className="mt-0.5 text-[8px] text-[#7c8aa0]">
              Discover relevant keyword ideas to grow your organic traffic.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const header = ["Keyword", "Search Volume", "Difficulty", "CPC", "Intent"];
            const csv = [header, ...filteredRows.map((row) => row.slice(0, 5))]
              .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
              .join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "keyword-suggestions.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            notify("Keyword suggestions exported.");
          }}
          className="flex h-7 items-center gap-1.5 rounded-md border border-[#dfe7e4] bg-white px-3 text-[8px] font-semibold text-[#324a70] hover:bg-[#f7faf8]"
        >
          <Icon name="download" size={11} />
          Export
        </button>
      </div>

      <KeywordSuggestionControls
        query={query}
        setQuery={setQuery}
        country={country}
        setCountry={setCountry}
        onSearch={runSearch}
      />

      <div className="mb-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
        <StatCard
          icon="search"
          value={Number(suggestionStats.totalKeywords ?? suggestionStats.totalSuggestions ?? filteredRows.length).toLocaleString()}
          label="Keyword Suggestions"
          change={suggestionStats.keywordChange || "—"}
          iconColor="text-[#00a768]"
          iconBg="bg-[#e7f8ef]"
        />

        <StatCard
          icon="chart"
          value={Number(suggestionStats.totalSearchVolume || 0).toLocaleString()}
          label="Total Search Volume"
          change={suggestionStats.volumeChange || "—"}
          iconColor="text-[#15946b]"
          iconBg="bg-[#e8f7f1]"
        />

        <StatCard
          icon="target"
          value={`₹${Number(suggestionStats.averageCpc || 0).toFixed(2)}`}
          label="Avg. CPC"
          change={suggestionStats.cpcChange || "—"}
          iconColor="text-[#d58b19]"
          iconBg="bg-[#fff4dc]"
          trendColor="#d59a30"
        />

        <StatCard
          icon="target"
          value={Number(suggestionStats.averageDifficulty || 0).toFixed(0)}
          label="Avg. Difficulty"
          change={suggestionStats.difficultyChange || "—"}
          changeColor="text-red-500"
          iconColor="text-[#00a768]"
          iconBg="bg-[#e7f8ef]"
        />
      </div>

      <SuggestionFilters
        filters={filters}
        setFilters={(next) => {
          setPage(1);
          setFilters(next);
        }}
      />

      <div className="overflow-hidden rounded-lg border border-[#e4e9eb]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-[9px]">
            <thead className="border-b border-[#e9eeec] bg-[#f8fafb] text-[#526784]">
              <tr>
                <th className="px-3 py-2.5">#</th>
                <th className="px-3 py-2.5">Keyword</th>
                <th className="px-3 py-2.5">Search Volume</th>
                <th className="px-3 py-2.5">Difficulty</th>
                <th className="px-3 py-2.5">CPC</th>
                <th className="px-3 py-2.5">Intent</th>
                <th className="px-3 py-2.5">Trend</th>
                <th className="px-3 py-2.5">Action</th>
              </tr>
            </thead>

            <tbody>
              {visibleRows.map((row, index) => (
                <tr
                  key={row[0]}
                  className="border-b border-[#edf1f2] last:border-0 hover:bg-[#fbfdfc]"
                >
                  <td className="px-3 py-2.5 text-[#7c8aa0]">
                    {(page - 1) * rowsPerPage + index + 1}
                  </td>

                  <td className="px-3 py-2.5 font-medium text-[#18355e]">
                    {row[0]}
                  </td>

                  <td className="px-3 py-2.5 text-[#526784]">
                    {row[1]}
                  </td>

                  <td className="px-3 py-2.5">
                    <DifficultyBadge value={Number(row[2])} />
                  </td>

                  <td className="px-3 py-2.5 text-[#526784]">
                    {row[3]}
                  </td>

                  <td className="px-3 py-2.5">
                    <IntentBadge value={row[4]} />
                  </td>

                  <td className="px-3 py-2.5">
                    <Sparkline trend={Number(row[2]) < 60 ? 88 : 72} />
                  </td>

                  <td className="px-3 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleAdd(row[0])}
                      className={`flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[8px] font-semibold ${
                        added.includes(row[0])
                          ? "border-[#08a66b] bg-[#e8f8f1] text-[#07945f]"
                          : "border-[#dfe7e4] text-[#08a66b] hover:bg-[#e9f8f1]"
                      }`}
                    >
                      {added.includes(row[0]) ? (
                        <Icon name="check" size={10} />
                      ) : (
                        <Icon name="target" size={10} />
                      )}
                      {added.includes(row[0]) ? "Added" : "Add"}
                    </button>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr><td colSpan="8" className="px-3 py-10 text-center text-[9px] text-[#7c8aa0]">Loading keyword suggestions...</td></tr>
              )}

              {!loading && visibleRows.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-3 py-10 text-center text-[9px] text-[#7c8aa0]"
                  >
                    No keyword suggestions match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#edf1ef] px-3 py-2">
          <span className="text-[8px] text-[#7b8aa1]">
            {filteredRows.length} suggestions
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="flex h-6 w-6 items-center justify-center rounded border border-[#dfe6e3] text-[9px] text-[#60728e] disabled:opacity-40"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`flex h-6 min-w-6 items-center justify-center rounded px-1 text-[8px] ${
                    page === number
                      ? "bg-[#08a66b] text-white"
                      : "border border-[#dfe6e3] text-[#60728e]"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="flex h-6 w-6 items-center justify-center rounded border border-[#dfe6e3] text-[9px] text-[#60728e] disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RankingHistoryView({ onBack, notify }) {
  const [query, setQuery] = useState("seo services");
  const [country, setCountry] = useState("🇮🇳 Google (India)");
  const [range, setRange] = useState("Last 30 days");
  const [appliedQuery, setAppliedQuery] = useState("seo services");
  const [rows, setRows] = useState([]);
  const [rankingStats, setRankingStats] = useState({});
  const [loading, setLoading] = useState(false);

  const loadRankingHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest(`${API_ROUTES.rankings}${buildQuery({ query, country, range })}`);
      const source = normalizeList(response);
      setRankingStats(response?.stats || response?.data?.stats || {});
      setRows(source.map((item) => [
        item.keyword || item.term || "",
        String(item.currentPosition ?? item.position ?? "-"),
        String(item.previousPosition ?? "-"),
        item.change || "-",
        String(item.bestPosition ?? "-"),
        item.updatedOn || item.updatedAt || "-",
        Boolean(item.isDown || String(item.change || "").includes("↓")),
      ]));
    } catch (error) {
      notify(error.message || "Unable to load ranking history.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [query, country, range, notify]);

  useEffect(() => { loadRankingHistory(); }, [loadRankingHistory]);

  const filteredRows = useMemo(() => {
    const q = appliedQuery.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((row) =>
      row[0].toLowerCase().includes(q)
    );
  }, [appliedQuery]);

  const updateRanking = () => {
    setAppliedQuery(query);
    loadRankingHistory();
    notify(`Ranking history updated for ${country}.`);
  };

  return (
    <section className="rounded-lg border border-[#e4e9eb] bg-white p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dfe7e4] text-[#324a70] hover:bg-[#f7faf8]"
            title="Back to Keyword Research"
          >
            <Icon name="arrowLeft" size={13} />
          </button>

          <div>
            <h2 className="text-[14px] font-bold text-[#101d3e]">
              Ranking History
            </h2>
            <p className="mt-0.5 text-[8px] text-[#7c8aa0]">
              Track your keyword rankings over time and see how they perform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const header = ["Keyword", "Current Position", "Previous Position", "Change", "Best Position", "Updated On"];
            const csv = [header, ...filteredRows.map((row) => row.slice(0, 6))]
              .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
              .join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "ranking-history.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            notify("Ranking history exported.");
          }}
          className="flex h-7 items-center gap-1.5 rounded-md border border-[#dfe7e4] bg-white px-3 text-[8px] font-semibold text-[#324a70] hover:bg-[#f7faf8]"
        >
          <Icon name="download" size={11} />
          Export
        </button>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1.2fr)_1fr_1fr_auto]">
        <div className="flex h-9 items-center rounded-md border border-[#dfe7e4] px-3">
          <Icon name="search" size={13} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="ml-2 w-full text-[9px] outline-none"
            placeholder="Search keyword"
          />
        </div>

        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="h-9 rounded-md border border-[#dfe7e4] bg-white px-3 text-[9px]"
        >
          <option>🇮🇳 Google (India)</option>
          <option>🇺🇸 Google (United States)</option>
          <option>🇬🇧 Google (United Kingdom)</option>
        </select>

        <select
          value={range}
          onChange={(event) => setRange(event.target.value)}
          className="h-9 rounded-md border border-[#dfe7e4] bg-white px-3 text-[9px]"
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>

        <button
          type="button"
          onClick={updateRanking}
          className="rounded-md bg-[#079b62] px-4 text-[9px] font-semibold text-white"
        >
          Update
        </button>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
        <StatCard
          icon="target"
          value={rankingStats.currentPosition ?? "—"}
          label="Current Position"
          change={rankingStats.positionChange || "—"}
          iconColor="text-[#315b9b]"
          iconBg="bg-[#eef4ff]"
        />

        <StatCard
          icon="rank"
          value={rankingStats.bestPosition ?? "—"}
          label="Best Position"
          change={rankingStats.bestLabel || "—"}
          iconColor="text-[#00a768]"
          iconBg="bg-[#e7f8ef]"
        />

        <StatCard
          icon="chart"
          value={rankingStats.averagePosition ?? "—"}
          label="Average Position"
          change={rankingStats.averageChange || "—"}
          changeColor="text-red-500"
          iconColor="text-[#d58b19]"
          iconBg="bg-[#fff4dc]"
          trendColor="#d59a30"
        />

        <StatCard
          icon="chart"
          value={rankingStats.visibility != null ? `${rankingStats.visibility}%` : "—"}
          label="Visibility"
          change={rankingStats.visibilityLabel || range}
          iconColor="text-[#00a768]"
          iconBg="bg-[#e7f8ef]"
        />
      </div>

      <div className="mb-3 rounded-lg border border-[#e4e9eb] p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-[#101d3e]">
            Ranking Position Trend
          </h3>

          <span className="rounded-md bg-[#f7faf8] px-2 py-1 text-[8px] text-[#68736f]">
            {range}
          </span>
        </div>

        <div className="relative h-[190px] overflow-hidden rounded-md bg-[#f8fbf9] p-4">
          <div className="absolute inset-x-4 top-8 border-t border-[#e3eae7]" />
          <div className="absolute inset-x-4 top-1/3 border-t border-[#e3eae7]" />
          <div className="absolute inset-x-4 top-1/2 border-t border-[#e3eae7]" />
          <div className="absolute inset-x-4 top-2/3 border-t border-[#e3eae7]" />

          <svg
            viewBox="0 0 700 180"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <polygon
              points="0,145 50,145 100,140 150,128 200,120 250,120 300,115 350,110 400,95 450,98 500,82 550,65 600,50 650,42 700,40 700,180 0,180"
              fill="#d1fae5"
            />

            <polyline
              points="0,145 50,145 100,140 150,128 200,120 250,120 300,115 350,110 400,95 450,98 500,82 550,65 600,50 650,42 700,40"
              fill="none"
              stroke="#059669"
              strokeWidth="3"
            />

            <circle cx="550" cy="65" r="5" fill="#059669" />
          </svg>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#e4e9eb]">
        <div className="border-b border-[#edf1ef] px-3 py-2.5">
          <h3 className="text-[11px] font-bold text-[#101d3e]">
            Keyword Ranking History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-[9px]">
            <thead className="bg-[#f8fafb] text-[#526784]">
              <tr>
                <th className="px-3 py-2.5">#</th>
                <th className="px-3 py-2.5">Keyword</th>
                <th className="px-3 py-2.5">Current Position</th>
                <th className="px-3 py-2.5">Previous Position</th>
                <th className="px-3 py-2.5">Change</th>
                <th className="px-3 py-2.5">Best Position</th>
                <th className="px-3 py-2.5">Updated On</th>
                <th className="px-3 py-2.5">Trend</th>
                <th className="px-3 py-2.5">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row, index) => (
                <tr
                  key={row[0]}
                  className="border-b border-[#edf1f2] last:border-0 hover:bg-[#fbfdfc]"
                >
                  <td className="px-3 py-2.5">{index + 1}</td>
                  <td className="px-3 py-2.5 font-medium text-[#18355e]">
                    {row[0]}
                  </td>
                  <td className="px-3 py-2.5">{row[1]}</td>
                  <td className="px-3 py-2.5">{row[2]}</td>
                  <td
                    className={`px-3 py-2.5 font-semibold ${
                      row[6] ? "text-red-500" : "text-[#07945f]"
                    }`}
                  >
                    {row[3]}
                  </td>
                  <td className="px-3 py-2.5">{row[4]}</td>
                  <td className="px-3 py-2.5">{row[5]}</td>
                  <td className="px-3 py-2.5">
                    <Sparkline trend={row[6] ? 45 : 88} />
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        notify(`Viewing ranking history for "${row[0]}".`)
                      }
                      className="rounded-md border border-[#dfe6e3] px-2.5 py-1 text-[8px] hover:bg-[#f7faf8]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-3 py-10 text-center text-[9px] text-[#7c8aa0]"
                  >
                    No ranking history matches your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function KeywordResearch() {
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get("keyword") || "");
  const [activeTab, setActiveTab] = useState("Keyword Research");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [page, setPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [stats, setStats] = useState(emptyStats);
  const [dashboardData, setDashboardData] = useState(emptyDashboardData);
  const [loading, setLoading] = useState(true);
  const [searchRange, setSearchRange] = useState("Last 30 days");
  const [totalKeywords, setTotalKeywords] = useState(0);

  const rowsPerPage = 8;

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [statsResponse, distributionResponse, intentResponse, opportunitiesResponse, trendResponse] = await Promise.all([
        apiRequest(`${API_ROUTES.stats}`),
        apiRequest(`${API_ROUTES.difficulty}`),
        apiRequest(`${API_ROUTES.intent}`),
        apiRequest(`${API_ROUTES.opportunities}`),
        apiRequest(`${API_ROUTES.trend}${buildQuery({ range: searchRange })}`),
      ]);
      setStats({ ...emptyStats, ...(statsResponse?.data || statsResponse || {}) });
      setDashboardData({
        difficulty: normalizeList(distributionResponse),
        intent: normalizeList(intentResponse),
        volumeTrend: normalizeList(trendResponse),
        opportunities: normalizeList(opportunitiesResponse),
      });
    } catch (error) {
      showMessage(error.message || "Unable to load keyword dashboard.");
    } finally {
      setLoading(false);
    }
  }, [searchRange]);

  const loadKeywords = useCallback(async () => {
    try {
      const response = await apiRequest(`${API_ROUTES.keywords}${buildQuery({ query: search, page, limit: rowsPerPage })}`);
      const list = normalizeList(response).map(normalizeKeyword);
      setKeywords(list);
      setTotalKeywords(Number(response?.total ?? response?.pagination?.total ?? list.length));
    } catch (error) {
      setKeywords([]);
      setTotalKeywords(0);
      showMessage(error.message || "Unable to load keywords.");
    }
  }, [search, page]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);
  useEffect(() => { loadKeywords(); }, [loadKeywords]);

  const filteredKeywords = keywords;

  const totalPages = Math.max(1, Math.ceil((totalKeywords || filteredKeywords.length) / rowsPerPage));

  const visibleKeywords = filteredKeywords;

  const showMessage = (text) => {
    setMessage(text);

    window.clearTimeout(
      window.__tnSeoKeywordMessageTimer
    );

    window.__tnSeoKeywordMessageTimer = window.setTimeout(
      () => setMessage(""),
      2200
    );
  };

  const handleSearch = () => {
    setPage(1);

    if (search.trim()) {
      showMessage(`Searching for "${search.trim()}"`);
    } else {
      showMessage("Showing all keywords.");
    }
  };

  const handleAnalyzeKeyword = (row) => {
    showMessage(`Analyzing "${row.keyword}".`);
    const params = new URLSearchParams({ keyword: row.keyword });
    window.location.href = `/keyword-research?${params.toString()}`;
  };

  const handleMoreKeyword = (row) => {
    showMessage(`More actions for "${row.keyword}" are ready for backend wiring.`);
  };

  const exportKeywords = (format = "csv") => {
    if (format === "csv") {
      const header = [
        "Keyword",
        "Search Volume",
        "Difficulty",
        "CPC",
        "Intent",
      ];

      const data = filteredKeywords.map((item) => [
        item.keyword,
        item.volume,
        item.difficulty,
        item.cpc,
        item.intent,
      ]);

      const csv = [header, ...data]
        .map((row) =>
          row
            .map((value) =>
              `"${String(value).replace(/"/g, '""')}"`
            )
            .join(",")
        )
        .join("\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "keyword-research.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      showMessage("Keyword CSV exported.");
    } else if (format === "excel") {
      const header = [
        "Keyword",
        "Search Volume",
        "Difficulty",
        "CPC",
        "Intent",
      ];

      const rows = filteredKeywords.map((item) => [
        item.keyword,
        item.volume,
        item.difficulty,
        item.cpc,
        item.intent,
      ]);

      const escapeHtml = (value) =>
        String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");

      const table = `
        <html>
          <head><meta charset="UTF-8" /></head>
          <body>
            <table border="1">
              <thead><tr>${header.map((item) => `<th>${escapeHtml(item)}</th>`).join("")}</tr></thead>
              <tbody>${rows.map((row) => `<tr>${row.map((item) => `<td>${escapeHtml(item)}</td>`).join("")}</tr>`).join("")}</tbody>
            </table>
          </body>
        </html>`;

      const blob = new Blob([table], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "keyword-research.xls";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      showMessage("Keyword Excel file exported.");
    }

    setShowExportMenu(false);
  };

  const handleGenerateAI = async () => {
    try {
      const response = await apiRequest(`${API_ROUTES.aiSuggestions}`, {
        method: "POST",
        body: JSON.stringify({ query: search }),
      });
      showMessage(response?.message || "AI keyword ideas generated.");
      loadKeywords();
    } catch (error) {
      showMessage(error.message || "Unable to generate AI keyword ideas.");
    }
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    setPage(1);

    if (tab === "Ranking History") {
      showMessage("Ranking History selected.");
    }

    if (tab === "Keyword Suggestions") {
      showMessage("Keyword Suggestions selected.");
    }
  };

  const handleViewAll = () => {
    setActiveTab("Keyword Research");
    window.requestAnimationFrame(() => {
      document
        .getElementById("keyword-opportunities")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    });
    showMessage("Showing keyword opportunities.");
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-[#07153b]">

      {/* Sidebar */}
      <Sidebar active="Keyword Research" />

      {/* Main */}
      <main className="ml-[184px] min-h-screen min-w-0">

        {/* Top Bar */}
        <TopBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

        {/* Page Content */}
        <div className="space-y-3 p-4 xl:p-5">

          {/* Page heading */}
          <div>
            <h1 className="text-[20px] font-bold tracking-[-0.4px] text-[#07153b]">
              Keyword Research
            </h1>

            <p className="mt-0.5 text-[9px] text-[#60728e]">
              Find high-performing keywords, analyze competition, and discover new opportunities.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">

            <StatCard
              icon="search"
              value={Number(stats.totalKeywords ?? totalKeywords).toLocaleString()}
              label="Total Keywords"
              change={stats.keywordChange || "—"}
              iconColor="text-[#00a768]"
              iconBg="bg-[#e7f8ef]"
            />

            <StatCard
              icon="chart"
              value={Number(stats.totalSearchVolume || 0).toLocaleString()}
              label="Total Search Volume"
              change={stats.volumeChange || "—"}
              iconColor="text-[#15946b]"
              iconBg="bg-[#e8f7f1]"
            />

            <StatCard
              icon="target"
              value={Number(stats.averageDifficulty || 0).toFixed(0)}
              label="Average Difficulty"
              change={stats.difficultyChange || "—"}
              changeColor={String(stats.difficultyChange || "").includes("↓") ? "text-red-500" : "text-emerald-600"}
              iconColor="text-[#d58b19]"
              iconBg="bg-[#fff4dc]"
              trendColor="#d59a30"
            />

            <StatCard
              icon="chart"
              value={`₹${Number(stats.averageCpc || 0).toFixed(2)}`}
              label="Average CPC"
              change={stats.cpcChange || "—"}
              iconColor="text-[#00a768]"
              iconBg="bg-[#e7f8ef]"
            />
          </div>

          {/* Tabs */}
          <div className="flex h-8 items-end gap-5 border-b border-[#dfe7e4]">
            {[
              "Keyword Research",
              "Keyword Suggestions",
              "Ranking History",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTab(tab)}
                className={`relative h-8 px-1 text-[9px] font-semibold transition ${
                  activeTab === tab
                    ? "text-[#00a768]"
                    : "text-[#6d7d92] hover:text-[#17325a]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full bg-[#00a768]" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "Keyword Research" && (
            <>
                        {/* Main keyword area */}
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)] gap-3">

                          {/* Left */}
                          <section className="min-w-0 rounded-lg border border-[#e4e9eb] bg-white p-3">

                            <div className="mb-2 flex items-center justify-between gap-3">
                              <div>
                                <h2 className="text-[14px] font-bold text-[#101d3e]">
                                  Keywords
                                </h2>

                                <p className="text-[8px] text-[#7c8aa0]">
                                  {Number(totalKeywords || filteredKeywords.length).toLocaleString()} keywords found
                                </p>
                              </div>

                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowExportMenu((value) => !value)
                                  }
                                  className="flex h-7 items-center gap-1.5 rounded-md bg-[#08a66b] px-3 text-[8px] font-semibold text-white hover:bg-[#078f5d]"
                                >
                                  <Icon name="download" size={11} />
                                  Export
                                  <span>↓</span>
                                </button>

                                {showExportMenu && (
                                  <div className="absolute right-0 top-8 z-20 w-[130px] overflow-hidden rounded-md border border-[#dfe7e4] bg-white shadow-lg">
                                    <button
                                      type="button"
                                      onClick={() => exportKeywords("csv")}
                                      className="flex w-full px-3 py-2 text-left text-[9px] text-[#324a70] hover:bg-[#f4f8f6]"
                                    >
                                      Export CSV
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => exportKeywords("excel")}
                                      className="flex w-full px-3 py-2 text-left text-[9px] text-[#324a70] hover:bg-[#f4f8f6]"
                                    >
                                      Export Excel
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Table */}
                            {loading ? (
                              <div className="rounded-lg border border-[#e4e9eb] px-3 py-10 text-center text-[9px] text-[#7c8aa0]">Loading keywords...</div>
                            ) : (
                            <KeywordTable
                              rows={visibleKeywords}
                              selectedKeywords={selectedKeywords}
                              setSelectedKeywords={setSelectedKeywords}
                              onAnalyze={handleAnalyzeKeyword}
                              onMore={handleMoreKeyword}
                            />
                            )}

                            {/* Pagination */}
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-[8px] text-[#7b8aa1]">
                                Showing{" "}
                                {totalKeywords === 0
                                  ? 0
                                  : (page - 1) * rowsPerPage + 1}
                                –
                                {Math.min(page * rowsPerPage, totalKeywords || filteredKeywords.length)}{" "}
                                of {totalKeywords || filteredKeywords.length}
                              </span>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePageChange(page - 1)
                                  }
                                  disabled={page === 1}
                                  className="flex h-6 w-6 items-center justify-center rounded border border-[#dfe6e3] text-[9px] text-[#60728e] disabled:opacity-40"
                                >
                                  ‹
                                </button>

                                {Array.from(
                                  { length: totalPages },
                                  (_, index) => index + 1
                                ).map((number) => (
                                  <button
                                    key={number}
                                    type="button"
                                    onClick={() =>
                                      handlePageChange(number)
                                    }
                                    className={`flex h-6 min-w-6 items-center justify-center rounded px-1 text-[8px] ${
                                      page === number
                                        ? "bg-[#08a66b] text-white"
                                        : "border border-[#dfe6e3] text-[#60728e] hover:bg-[#f3f7f5]"
                                    }`}
                                  >
                                    {number}
                                  </button>
                                ))}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePageChange(page + 1)
                                  }
                                  disabled={page === totalPages}
                                  className="flex h-6 w-6 items-center justify-center rounded border border-[#dfe6e3] text-[9px] text-[#60728e] disabled:opacity-40"
                                >
                                  ›
                                </button>
                              </div>
                            </div>
                          </section>

                          {/* Right column */}
                          <div className="space-y-3">
                            <DifficultyDistribution data={dashboardData.difficulty} total={stats.totalKeywords || totalKeywords} />

                            <SearchIntentBreakdown data={dashboardData.intent} />
                          </div>
                        </div>

                        {/* Bottom row */}
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)] gap-3">

                          <SearchVolumeTrend data={dashboardData.volumeTrend} range={searchRange} onRangeChange={setSearchRange} />

                          <div id="keyword-opportunities">
                            <TopKeywordOpportunities
                              data={dashboardData.opportunities}
                              onViewAll={handleViewAll}
                            />
                          </div>
                        </div>

            </>
          )}

          {activeTab === "Keyword Suggestions" && (
            <KeywordSuggestionsView
              onBack={() => setActiveTab("Keyword Research")}
              notify={showMessage}
            />
          )}

          {activeTab === "Ranking History" && (
            <RankingHistoryView
              onBack={() => setActiveTab("Keyword Research")}
              notify={showMessage}
            />
          )}

          {activeTab === "Keyword Research" && (
            <>
              {/* AI */}
              <AIKeywordBanner
                onGenerate={handleGenerateAI}
              />
            </>
          )}

        </div>
      </main>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#003e35] px-4 py-2.5 text-[9px] font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}