import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

import KeywordRankings from "./Keywordrankings.jsx";
import SerpFeatures from "./Serpfeatures.jsx";
import CompetitorTracking from "./CompetitorTracking.jsx";
import LocationDevices from "./Locationdevices.jsx";

/* ---------- small helpers ---------- */
const G = "#16a34a";
const B = "#3b82f6";
const Y = "#f5b81c";
const R = "#ef4444";

const Spark = ({ color = G, pts }) => (
  <svg width="48" height="16" viewBox="0 0 48 16">
    <polyline
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      points={pts}
    />
  </svg>
);

const up = "0,14 8,11 16,12 24,7 32,8 40,3 48,2";
const pinkUp = "0,10 8,9 16,12 24,6 32,8 40,5 48,4";

const Delta = ({ v, dir = "up", children }) => (
  <span
    className={`whitespace-nowrap text-[10px] font-semibold ${
      dir === "up" ? "text-green-600" : "text-red-500"
    }`}
  >
    {dir === "up" ? "↑" : "↓"} {v}
    <span className="ml-1 font-normal text-gray-500">
      {children}
    </span>
  </span>
);

const Card = ({ className = "", children }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white ${className}`}
  >
    {children}
  </div>
);

const Chk = () => (
  <input
    type="checkbox"
    className="h-3.5 w-3.5 rounded border-gray-300"
  />
);

/* ---------- data ---------- */
const stats = [
  {
    label: "Tracked Keywords",
    value: "125",
    d: "12%",
    bg: "bg-green-50",
    c: "#16a34a",
    icon: "M3 17l6-6 4 4 8-8M15 7h6v6",
  },
  {
    label: "Keywords in Top 3",
    value: "28",
    d: "27%",
    bg: "bg-amber-50",
    c: "#f59e0b",
    icon:
      "M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3",
  },
  {
    label: "Keywords in Top 10",
    value: "67",
    d: "18%",
    bg: "bg-green-50",
    c: "#16a34a",
    icon:
      "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8z",
  },
  {
    label: "Avg. Position",
    value: "12.4",
    d: "3.6",
    dir: "down",
    bg: "bg-green-50",
    c: "#16a34a",
    icon: "M5 20V10M12 20V4M19 20v-7",
  },
  {
    label: "Total Search Volume",
    value: "256K",
    d: "14%",
    bg: "bg-blue-50",
    c: "#3b82f6",
    icon:
      "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5",
  },
];

const rows = [
  [
    "SEO services",
    24,
    "up",
    6,
    13,
    8,
    "12,000",
    "/services/seo",
    2,
    "Desktop",
    "#3b82f6",
    up,
    G,
  ],
  [
    "AI SEO tool",
    11,
    "up",
    2,
    13,
    5,
    "8,000",
    "/ai-seo-tool",
    2,
    "Desktop",
    "#16a34a",
    up,
    G,
  ],
  [
    "SEO company",
    35,
    "down",
    4,
    31,
    12,
    "18,000",
    "/",
    2,
    "Mobile",
    "#8b5cf6",
    pinkUp,
    "#ec4899",
  ],
  [
    "best SEO tools",
    8,
    "up",
    3,
    11,
    4,
    "6,500",
    "/blog/seo-tools",
    2,
    "Desktop",
    "#3b82f6",
    up,
    G,
  ],
  [
    "digital marketing services",
    41,
    "down",
    7,
    34,
    18,
    "22,000",
    "/services/digital...",
    2,
    "Desktop",
    "#111827",
    up,
    G,
  ],
  [
    "SEO audit",
    12,
    "up",
    4,
    16,
    6,
    "9,900",
    "/tools/seo-audit",
    2,
    "Mobile",
    "#3b82f6",
    up,
    G,
  ],
  [
    "local SEO services",
    19,
    "up",
    5,
    24,
    9,
    "5,400",
    "/services/local-seo",
    3,
    "Desktop",
    "#ef4444",
    up,
    G,
  ],
  [
    "SEO consultant",
    27,
    "down",
    3,
    24,
    11,
    "3,600",
    "/consultant",
    3,
    "Mobile",
    "#3b82f6",
    up,
    G,
  ],
  [
    "white label SEO",
    14,
    "up",
    5,
    19,
    6,
    "2,400",
    "/white-label-seo",
    1,
    "Mobile",
    "#3b82f6",
    up,
    G,
  ],
];

const serp = [
  ["Featured Snippet", "18 (14%)", "#3b82f6"],
  ["Sitelinks", "42 (34%)", "#16a34a"],
  ["People Also Ask", "27 (22%)", "#f59e0b"],
  ["Local Pack", "12 (10%)", "#a855f7"],
  ["Images", "31 (25%)", "#3b82f6"],
  ["Videos", "16 (13%)", "#ef4444"],
  ["Reviews", "9 (7%)", "#f59e0b"],
];

const gaining = [
  ["AI SEO tool", 9, 11],
  ["SEO audit", 7, 12],
  ["white label SEO", 5, 14],
  ["best SEO tools", 4, 8],
  ["local SEO services", 4, 19],
];

/* ---------- line chart ---------- */
const X = (i) => 45 + (i * (520 - 45)) / 14;
const Yp = (v) => 120 - (v / 100) * 110;

const line = (arr) =>
  arr.map((v, i) => `${X(i)},${Yp(v)}`).join(" ");

const top3 = [
  6,
  7,
  9,
  11,
  12,
  13,
  14,
  15,
  18,
  20,
  22,
  25,
  27,
  29,
  30,
];

const top10 = [
  35,
  40,
  44,
  50,
  53,
  55,
  56,
  58,
  60,
  62,
  66,
  70,
  76,
  83,
  90,
];

const top50 = [
  21,
  24,
  26,
  28,
  30,
  31,
  32,
  33,
  35,
  38,
  42,
  45,
  49,
  52,
  55,
];

const LineChart = () => (
  <svg viewBox="0 0 540 150" className="w-full">
    {[0, 25, 50, 75, 100].map((t) => (
      <g key={t}>
        <line
          x1="45"
          x2="530"
          y1={Yp(t)}
          y2={Yp(t)}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        <text
          x="30"
          y={Yp(t) + 3}
          fontSize="8"
          fill="#6b7280"
          textAnchor="end"
        >
          {t}
        </text>
      </g>
    ))}

    <polygon
      fill="#3b82f6"
      opacity="0.12"
      points={`${X(0)},${Yp(0)} ${line(top10)} ${X(14)},${Yp(0)}`}
    />

    <polygon
      fill="#f5b81c"
      opacity="0.12"
      points={`${X(0)},${Yp(0)} ${line(top50)} ${X(14)},${Yp(0)}`}
    />

    <polyline
      fill="none"
      stroke={B}
      strokeWidth="1.8"
      points={line(top10)}
    />

    <polyline
      fill="none"
      stroke={Y}
      strokeWidth="1.8"
      points={line(top50)}
    />

    <polyline
      fill="none"
      stroke={G}
      strokeWidth="1.8"
      points={line(top3)}
    />

    {[
      [top10, B],
      [top50, Y],
      [top3, G],
    ].map(([a, c]) =>
      a.map((v, i) => (
        <circle
          key={c + i}
          cx={X(i)}
          cy={Yp(v)}
          r="2.2"
          fill={c}
        />
      ))
    )}

    {[
      ["Aug 16", 0],
      ["Aug 23", 3.5],
      ["Aug 30", 7],
      ["Sep 6", 10.5],
      ["Sep 15", 14],
    ].map(([l, i]) => (
      <text
        key={l}
        x={X(i)}
        y="140"
        fontSize="8"
        fill="#6b7280"
        textAnchor="middle"
      >
        {l}
      </text>
    ))}
  </svg>
);

/* ---------- donut ---------- */
const Donut = () => {
  const segs = [
    [22, G],
    [54, B],
    [18, Y],
    [6, R],
  ];

  const r = 52;
  const c = 2 * Math.PI * r;
  let off = 0;

  return (
    <svg
      viewBox="0 0 140 140"
      className="h-[132px] w-[132px] shrink-0"
    >
      <g transform="rotate(-90 70 70)">
        {segs.map(([p, col]) => {
          const len = (p / 100) * c;

          const el = (
            <circle
              key={col}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={col}
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-off}
            />
          );

          off += len;
          return el;
        })}
      </g>

      <text
        x="70"
        y="68"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#111827"
      >
        125
      </text>

      <text
        x="70"
        y="82"
        textAnchor="middle"
        fontSize="9"
        fill="#6b7280"
      >
        Keywords
      </text>
    </svg>
  );
};

const SerpIcon = () => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-gray-50 text-[8px] text-gray-600">
    ▤
  </span>
);

/* ---------- overview ---------- */
const Overview = () => (
  <>
    <div className="mt-3 grid grid-cols-5 gap-2.5">
      {stats.map((s) => (
        <Card
          key={s.label}
          className="flex items-center gap-2.5 p-3"
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${s.bg}`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke={s.c}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={s.icon} />
            </svg>
          </div>

          <div>
            <div className="whitespace-nowrap text-[10px] text-gray-600">
              {s.label}
            </div>

            <div className="text-[22px] font-extrabold leading-tight">
              {s.value}
            </div>

            <Delta v={s.d} dir={s.dir || "up"}>
              vs last month
            </Delta>
          </div>
        </Card>
      ))}
    </div>

    <div className="mt-3 grid grid-cols-[1fr_320px] gap-2.5">
      <Card className="p-3">
        <div className="flex items-center">
          <h3 className="text-[13px] font-bold">
            Ranking Performance
          </h3>

          <div className="ml-10 flex items-center gap-4 whitespace-nowrap text-[10px]">
            {[
              ["Top 3", G],
              ["Top 10", B],
              ["Top 50", Y],
            ].map(([l, c]) => (
              <span
                key={l}
                className="flex items-center gap-1"
              >
                <i
                  className="h-2 w-2 rounded-full"
                  style={{ background: c }}
                />
                {l}
              </span>
            ))}
          </div>

          <button className="ml-auto rounded-md border border-gray-200 px-2 py-1 text-[10px]">
            Last 30 days ⌄
          </button>
        </div>

        <LineChart />
      </Card>

      <Card className="p-3">
        <h3 className="text-[13px] font-bold">
          Ranking Distribution
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <Donut />

          <div className="space-y-2.5 whitespace-nowrap text-[10px]">
            {[
              ["Top 3", "22% (28)", G],
              ["Top 10", "54% (67)", B],
              ["Top 50", "18% (23)", Y],
              ["Not Ranked", "6% (7)", R],
            ].map(([l, v, c]) => (
              <div
                key={l}
                className="flex items-center gap-1.5"
              >
                <i
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: c }}
                />

                <span className="w-[42px] text-gray-700">
                  {l}
                </span>

                <b className="font-semibold">
                  {v}
                </b>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>

    {/* ---------- KEYWORD RANKINGS + SERP ---------- */}
    <div className="mt-3 grid grid-cols-[1fr_320px] gap-2.5">

      {/* ---------- KEYWORD RANKINGS ---------- */}
      <Card className="p-3">
        <div className="flex items-center">
          <h3 className="text-[18px] font-bold leading-tight">
            Keyword Rankings{" "}
            <span className="text-[12px] font-normal text-gray-500">
              (125 keywords)
            </span>
          </h3>

          <button className="ml-auto rounded-md bg-green-700 px-3 py-1.5 text-[11px] font-semibold text-white">
            ⊞ Add Keywords
          </button>

          <button className="ml-2 rounded-md border border-gray-200 px-3 py-1.5 text-[11px] font-semibold">
            ⇩ Export
          </button>
        </div>

        <div className="w-full overflow-hidden">
          <table className="mt-2 w-full whitespace-nowrap text-left text-[13px]">
            <thead>
              <tr className="bg-gray-50 text-[12px] font-bold text-gray-700">
                <th className="p-1">
                  <Chk />
                </th>

                <th className="p-1">
                  Keyword
                </th>

                <th className="p-1 leading-tight">
                  Current
                  <br />
                  Position
                </th>

                <th className="p-1 leading-tight">
                  Previous
                  <br />
                  Position
                </th>

                <th className="p-1 leading-tight">
                  Best
                  <br />
                  Position
                </th>

                <th className="p-1 leading-tight">
                  Search
                  <br />
                  Volume
                </th>

                <th className="p-1">
                  URL Ranking
                </th>

                <th className="p-1">
                  SERP Features
                </th>

                <th className="p-1">
                  Country/Device
                </th>

                <th className="p-1">
                  Trend
                </th>

                <th className="p-1">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r[0]}
                  className="border-b border-gray-100"
                >
                  <td className="p-1">
                    <Chk />
                  </td>

                  <td className="p-1 text-[13px] font-semibold leading-tight">
                    {r[0]}
                  </td>

                  <td className="p-1 font-bold">
                    {r[1]}{" "}
                    <span
                      className={
                        r[2] === "up"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {r[2] === "up" ? "↑" : "↓"} {r[3]}
                    </span>
                  </td>

                  <td className="p-1">
                    {r[4]}
                  </td>

                  <td className="p-1">
                    {r[5]}
                  </td>

                  <td className="p-1">
                    {r[6]}
                  </td>

                  <td className="p-1 text-gray-700">
                    {r[7]}
                  </td>

                  <td className="p-1">
                    <div className="flex gap-1">
                      {Array.from({
                        length: r[8],
                      }).map((_, i) => (
                        <SerpIcon key={i} />
                      ))}
                    </div>
                  </td>

                  <td className="p-1">
                    <div className="flex items-center gap-1">
                      <i
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          background: r[10],
                        }}
                      />

                      <span className="text-[11px] font-medium leading-tight">
                        India
                        <br />
                        {r[9]}
                      </span>
                    </div>
                  </td>

                  <td className="p-1">
                    <Spark
                      color={r[12]}
                      pts={r[11]}
                    />
                  </td>

                  <td className="p-1 text-[13px] font-bold">
                    •••
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 flex items-center text-[11px]">
          Show

          <span className="mx-2 rounded border border-gray-200 px-2 py-1">
            10 ⌄
          </span>

          per page

          <div className="ml-auto flex items-center gap-1">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "...",
              "13",
              "›",
            ].map((p, i) => (
              <span
                key={i}
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  i === 0
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-gray-200"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="space-y-2">

        {/* ---------- SERP FEATURES ---------- */}
        <Card className="p-3">
          <div className="flex items-center">
            <h3 className="text-[18px] font-bold leading-tight">
              SERP Features
            </h3>

            <span className="ml-auto text-[11px] font-semibold text-green-700">
              View All →
            </span>
          </div>

          <div className="mt-2 space-y-1.5">
            {serp.map(([l, v, c]) => (
              <div
                key={l}
                className="flex items-center text-[14px] leading-tight"
              >
                <i
                  className="mr-2 h-3.5 w-3.5 shrink-0 rounded"
                  style={{
                    background: c,
                  }}
                />

                <span className="flex-1 font-semibold text-gray-800">
                  {l}
                </span>

                <span className="font-semibold text-gray-700">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ---------- TOP GAINING KEYWORDS ---------- */}
        <Card className="p-3">
          <div className="flex items-center">
            <h3 className="text-[18px] font-bold leading-tight">
              Top Gaining Keywords
            </h3>

            <span className="ml-auto text-[11px] font-semibold text-green-700">
              View All →
            </span>
          </div>

          <table className="mt-2 w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 text-[12px] text-gray-700">
                <th className="p-1.5 text-left font-bold">
                  Keyword
                </th>

                <th className="p-1.5 font-bold leading-tight">
                  Position
                  <br />
                  Change
                </th>

                <th className="p-1.5 font-bold leading-tight">
                  Current
                  <br />
                  Position
                </th>
              </tr>
            </thead>

            <tbody>
              {gaining.map(([k, c, p]) => (
                <tr
                  key={k}
                  className="border-b border-gray-100"
                >
                  <td className="p-1.5 font-semibold">
                    {k}
                  </td>

                  <td className="p-1.5 text-center font-bold text-green-600">
                    ↑ {c}
                  </td>

                  <td className="p-1.5 text-center font-semibold">
                    {p}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>

    {/* ---------- bottom banner ---------- */}
    <div className="mt-2 flex items-center rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2.5">
      <div className="mr-3 text-2xl text-green-800">
        ◎
      </div>

      <div>
        <div className="text-[13px] font-bold">
          Track Smarter. Rank Higher.
        </div>

        <div className="text-[10px] text-gray-700">
          Monitor your keyword positions, get real-time alerts,
          and discover new opportunities with AI.
        </div>
      </div>

      <button className="ml-auto rounded-lg bg-green-800 px-4 py-2 text-[11px] font-semibold text-white">
        Upgrade Plan →
      </button>
    </div>
  </>
);

/* ---------- page ---------- */
export default function RankTracking() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Keyword Rankings",
    "SERP Features",
    "Competitor Tracking",
    "Location & Devices",
  ];

  /* ---------- Home button ---------- */
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] px-4 py-3 font-sans text-gray-900">
      <div className="w-full">

        {/* ---------- Top bar ---------- */}
        <div className="flex items-center gap-3">

          {/* HOME BUTTON */}
          <button
            type="button"
            onClick={handleHome}
            title="Home"
            aria-label="Home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-green-700"
          >
            <Home
              size={18}
              strokeWidth={1.8}
            />
          </button>

          {/* SEARCH + TRACK CONTAINER */}
          <div className="flex w-fit max-w-[620px] shrink-0 items-center">
            <div className="flex h-8 w-[360px] items-center rounded-l-lg border border-r-0 border-gray-200 bg-white px-3 text-[10px] text-gray-500">
              Enter a domain or keyword to track (e.g. example.com)
            </div>

            <button className="h-8 shrink-0 rounded-r-lg bg-green-700 px-4 text-[11px] font-semibold text-white">
              Track Rankings →
            </button>
          </div>

        </div>

        {/* ---------- Page heading ---------- */}
        <div className="mt-3 flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">
              Rank Tracking
            </h1>

            <p className="text-[12px] text-gray-600">
              Track your keyword rankings and monitor your SEO performance over time.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex h-9 min-w-[170px] items-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 text-[11px]">
              <span className="font-bold text-blue-500">
                G
              </span>

              tn-seo-module.web.app

              <span className="ml-auto text-[9px]">
                ⌄
              </span>
            </div>

            <div className="flex h-9 min-w-[190px] items-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 text-[11px]">
              📅 Sep 15, 2026 - Sep 15, 2026

              <span className="ml-auto text-[9px]">
                ⌄
              </span>
            </div>

          </div>
        </div>

        {/* ---------- tabs ---------- */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg border px-4 py-2 text-[11px] font-medium transition-colors ${
                activeTab === tab
                  ? "border-green-800 bg-green-800 font-semibold text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------- tab content ---------- */}
        <div className="mt-3">

          {activeTab === "Overview" && (
            <Overview />
          )}

          {activeTab === "Keyword Rankings" && (
            <KeywordRankings />
          )}

          {activeTab === "SERP Features" && (
            <SerpFeatures />
          )}

          {activeTab === "Competitor Tracking" && (
            <CompetitorTracking />
          )}

          {activeTab === "Location & Devices" && (
            <LocationDevices />
          )}

        </div>
      </div>
    </div>
  );
}