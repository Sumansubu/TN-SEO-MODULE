import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================================================================
   OTHER BACKLINK PAGES
================================================================ */

import Backlinkmonitoring from "./Backlinkmonitoring";
import Backlinkopportunities from "./Backlinkopportunities";
import Anchortextanalysis from "./Anchortextanalysis";
import Competitorbacklinks from "./Competitiorbacklinks";
import Linkgapanalysis from "./Linkgapanalysis";

/* ================================================================
   COLORS
================================================================ */

const G = "#0f8a4b";
const GD = "#0b5d36";

/* ================================================================
   TABS
================================================================ */

const tabs = [
  "Overview",
  "Backlink Monitoring",
  "Competitor Backlinks",
  "Backlink Opportunities",
  "Anchor Text Analysis",
  "Link Gap Analysis",
];

/* ================================================================
   ICON COMPONENT
================================================================ */

const Svg = ({
  children,
  className = "w-4 h-4",
  sw = 2,
  fill = "none",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

/* ================================================================
   ICONS
================================================================ */

const LinkIcon = (p) => (
  <Svg {...p}>
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </Svg>
);

const ShareIcon = (p) => (
  <Svg {...p}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </Svg>
);

const CrownIcon = (p) => (
  <Svg {...p}>
    <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z" />
  </Svg>
);

const PlusIcon = (p) => (
  <Svg {...p} sw={2.5}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

const MinusCircle = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8" />
  </Svg>
);

const ShieldAlert = (p) => (
  <Svg {...p}>
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
    <path d="M12 8v5M12 16.5v.01" />
  </Svg>
);

const BellIcon = (p) => (
  <Svg {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Svg>
);

const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </Svg>
);

/* ================================================================
   HOME ICON
================================================================ */

const HomeIcon = (p) => (
  <Svg {...p}>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </Svg>
);

const ArrowRight = (p) => (
  <Svg {...p} sw={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

const ExternalIcon = (p) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Svg>
);

const TargetIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </Svg>
);

const SearchChart = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3M8 13l2-2 2 1.5 2-3" />
  </Svg>
);

const BarChartIcon = (p) => (
  <Svg {...p}>
    <path d="M6 20V11M12 20V5M18 20v-7" />
  </Svg>
);

const ChainIcon = (p) => (
  <Svg {...p}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
  </Svg>
);

const ArrowUp = () => (
  <svg
    viewBox="0 0 10 10"
    className="w-2 h-2"
    fill="currentColor"
  >
    <path d="M5 1l4 6H1z" />
  </svg>
);

const ArrowDown = () => (
  <svg
    viewBox="0 0 10 10"
    className="w-2 h-2"
    fill="currentColor"
  >
    <path d="M5 9L1 3h8z" />
  </svg>
);

/* ================================================================
   DATA
================================================================ */

const baseDomains = [
  { d: "medium.com", b: 842, da: 94, t: "Dofollow" },
  { d: "linkedin.com", b: 621, da: 98, t: "Dofollow" },
  { d: "github.com", b: 518, da: 96, t: "Nofollow" },
  { d: "techcrunch.com", b: 432, da: 92, t: "Dofollow" },
  { d: "reddit.com", b: 389, da: 92, t: "Nofollow" },
  { d: "forbes.com", b: 356, da: 95, t: "Dofollow" },
  { d: "wordpress.org", b: 298, da: 96, t: "Nofollow" },
  { d: "quora.com", b: 276, da: 87, t: "Nofollow" },
  { d: "dev.to", b: 245, da: 87, t: "Nofollow" },
  { d: "stackoverflow.com", b: 231, da: 93, t: "Nofollow" },
];

const baseToxic = [
  ["spamlinks.net", 92],
  ["cheap-seo.xyz", 88],
  ["bad-directory.info", 85],
  ["linkfarm.com", 82],
  ["seo-spam.org", 78],
];

const baseOpportunities = [
  ["hubspot.com", 92, "High"],
  ["businessinsider.com", 91, "High"],
  ["entrepreneur.com", 88, "Medium"],
  ["neilpatel.com", 87, "High"],
  ["moz.com", 85, "Medium"],
];

const linkTypes = [
  {
    name: "Dofollow",
    pct: 68,
    color: "#16a34a",
  },
  {
    name: "Nofollow",
    pct: 24,
    color: "#2f80ed",
  },
  {
    name: "Sponsored",
    pct: 5,
    color: "#f5b82e",
  },
  {
    name: "UGC",
    pct: 3,
    color: "#ef4444",
  },
];

const anchorTemplates = [
  ["{domain}", 2476, "17.2%"],
  ["{host}", 1876, "15.0%"],
  ["SEO tools", 1024, "8.2%"],
  ["SEO services", 842, "6.8%"],
  ["Visit here", 621, "5.0%"],
  ["Click here", 518, "4.1%"],
  ["Digital marketing", 436, "3.5%"],
  ["AI SEO tool", 389, "3.1%"],
  ["Website optimization", 356, "2.9%"],
  ["Other", 2678, "21.5%"],
];

/* ================================================================
   HELPER DATA FUNCTIONS
================================================================ */

const toneBg = {
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-500",
  red: "bg-red-50 text-red-500",
};

const seededNumber = (text) => {
  let total = 0;

  for (let i = 0; i < text.length; i += 1) {
    total = (total * 31 + text.charCodeAt(i)) % 100000;
  }

  return total;
};

const formatDomain = (value) => {
  const clean = value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0];

  return clean || "tn-seo-module.web.app";
};

const formatShortDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const formatFullDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getRangeDays = (range) => {
  if (range === "Last 2 weeks") return 14;
  if (range === "Last 3 months") return 90;

  return 30;
};

const getDateRange = (range, endDate = new Date()) => {
  const days = getRangeDays(range);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));

  return {
    start,
    end,
  };
};

const getChartLabels = (start, end) => {
  const labels = [];

  const total = Math.max(
    1,
    Math.floor((end - start) / 86400000)
  );

  for (let i = 0; i < 5; i += 1) {
    const date = new Date(start);

    date.setDate(
      start.getDate() +
        Math.round((total * i) / 4)
    );

    labels.push(formatShortDate(date));
  }

  return labels;
};

const getDatePoints = (start, end, count) => {
  const points = [];

  const total = Math.max(
    1,
    Math.floor((end - start) / 86400000)
  );

  for (let i = 0; i < count; i += 1) {
    const date = new Date(start);

    date.setDate(
      start.getDate() +
        Math.round(
          (total * i) /
            Math.max(1, count - 1)
        )
    );

    points.push(date);
  }

  return points;
};

/* ================================================================
   CREATE DYNAMIC DATA
================================================================ */

const createDynamicData = (
  domain,
  range,
  endDate
) => {
  const seed = seededNumber(domain);
  const days = getRangeDays(range);

  const { start, end } = getDateRange(
    range,
    endDate
  );

  const totalBacklinks =
    8000 + (seed % 7500);

  const referringDomains =
    700 + (seed % 700);

  const authority =
    35 + (seed % 25);

  const newBacklinks = Math.round(
    totalBacklinks *
      (0.018 + (seed % 8) / 1000)
  );

  const lostBacklinks =
    25 + (seed % 55);

  const toxicLinks =
    10 + (seed % 30);

  const stats = [
    {
      label: "Total Backlinks",
      value: totalBacklinks.toLocaleString(),
      change: `${8 + (seed % 10)}%`,
      up: true,
      good: true,
      icon: LinkIcon,
      tone: "green",
    },
    {
      label: "Referring Domains",
      value: referringDomains.toLocaleString(),
      change: `${5 + (seed % 8)}%`,
      up: true,
      good: true,
      icon: ShareIcon,
      tone: "green",
    },
    {
      label: "Domain Authority",
      value: String(authority),
      change: `${2 + (seed % 5)}%`,
      up: true,
      good: true,
      icon: CrownIcon,
      tone: "amber",
    },
    {
      label: "New Backlinks",
      value: newBacklinks.toLocaleString(),
      change: `${15 + (seed % 15)}%`,
      up: true,
      good: true,
      icon: PlusIcon,
      tone: "green",
    },
    {
      label: "Lost Backlinks",
      value: lostBacklinks.toLocaleString(),
      change: `${8 + (seed % 12)}%`,
      up: false,
      good: false,
      icon: MinusCircle,
      tone: "red",
    },
    {
      label: "Toxic Links",
      value: toxicLinks.toLocaleString(),
      change: `${18 + (seed % 18)}%`,
      up: false,
      good: false,
      icon: ShieldAlert,
      tone: "red",
    },
  ];

  const count = days;

  const growth = [];
  const referring = [];

  let backlinkValue =
    totalBacklinks *
    (0.76 + (seed % 10) / 100);

  let domainValue =
    referringDomains *
    (0.75 + (seed % 8) / 100);

  for (let i = 0; i < count; i += 1) {
    const wave =
      Math.sin((i + seed) / 4) *
      0.012;

    backlinkValue +=
      totalBacklinks *
      (0.004 + wave / 2);

    domainValue +=
      referringDomains *
      (0.003 + wave / 2);

    growth.push(
      Math.max(
        0,
        +(backlinkValue / 1000).toFixed(2)
      )
    );

    referring.push(
      Math.max(
        0,
        Math.round(domainValue)
      )
    );
  }

  const labels = getChartLabels(
    start,
    end
  );

  const datePoints = getDatePoints(
    start,
    end,
    count
  );

  const domains = baseDomains.map(
    (item, index) => ({
      ...item,
      b: Math.max(
        80,
        item.b +
          (seed % 120) -
          index * 8
      ),
      da: Math.min(
        99,
        Math.max(
          40,
          item.da -
            (seed % 4) +
            (index % 3)
        )
      ),
    })
  );

  const anchors = anchorTemplates.map(
    ([text, value, pct], index) => [
      text
        .replace("{domain}", domain)
        .replace("{host}", domain),
      Math.max(
        100,
        value +
          (seed % 180) -
          index * 7
      ),
      pct,
    ]
  );

  const toxic = baseToxic.map(
    ([name, score], index) => [
      name,
      Math.min(
        99,
        Math.max(
          50,
          score +
            (seed % 7) -
            index
        )
      ),
    ]
  );

  const opportunities =
    baseOpportunities.map(
      ([name, da, relevance], index) => [
        name,
        Math.min(
          99,
          Math.max(
            70,
            da +
              (seed % 5) -
              index
          )
        ),
        relevance,
      ]
    );

  return {
    stats,
    growth,
    referring,
    domains,
    anchors,
    toxic,
    opportunities,
    linkTypes,
    labels,
    datePoints,

    maxGrowth: Math.max(
      20,
      Math.ceil(
        Math.max(...growth) / 5
      ) * 5
    ),

    maxReferring: Math.max(
      1500,
      Math.ceil(
        Math.max(...referring) /
          250
      ) * 250
    ),

    lastGrowth:
      growth[growth.length - 1],

    lastReferring:
      referring[
        referring.length - 1
      ],

    start,
    end,
  };
};

/* ================================================================
   SMALL COMPONENTS
================================================================ */

const Card = ({
  className = "",
  children,
}) => (
  <div
    className={`bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(16,24,40,0.06)] ${className}`}
  >
    {children}
  </div>
);

const Pill = ({ type }) => (
  <span
    className={`inline-block w-[58px] text-center text-[10px] font-medium py-[3px] rounded ${
      type === "Dofollow"
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-600"
    }`}
  >
    {type}
  </span>
);

const ActionBtn = ({
  children,
  variant = "green",
}) => (
  <button
    type="button"
    className={`text-[10px] font-medium px-2.5 py-[3px] rounded border ${
      variant === "red"
        ? "bg-red-50 text-red-500 border-red-100"
        : "bg-green-50 text-green-700 border-green-200"
    }`}
  >
    {children}
  </button>
);

/* ================================================================
   LINE CHART
================================================================ */

function LineChart({
  data,
  color,
  ticks,
  tickFmt,
  xLabels,
  tipLabel,
  tipValue,
  max,
}) {
  const W = 300;
  const H = 132;
  const L = 34;
  const R = 292;
  const T = 10;
  const B = 104;

  const step =
    (R - L) /
    Math.max(1, data.length - 1);

  const pts = data.map(
    (v, i) => [
      L + i * step,
      B -
        (v / max) *
          (B - T),
    ]
  );

  const line = pts
    .map(
      (p, i) =>
        `${i ? "L" : "M"}${p[0].toFixed(
          1
        )},${p[1].toFixed(1)}`
    )
    .join(" ");

  const area =
    `${line} L${R},${B} L${L},${B} Z`;

  const last =
    pts[pts.length - 1];

  const id = `grad-${color.replace(
    "#",
    ""
  )}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
    >
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity="0.28"
          />

          <stop
            offset="100%"
            stopColor={color}
            stopOpacity="0.02"
          />
        </linearGradient>
      </defs>

      {ticks.map((t) => {
        const y =
          B -
          (t / max) *
            (B - T);

        return (
          <g key={t}>
            <line
              x1={L}
              x2={R}
              y1={y}
              y2={y}
              stroke="#eef0f3"
              strokeWidth="1"
            />

            <text
              x={L - 6}
              y={y + 3}
              textAnchor="end"
              fontSize="7.5"
              fill="#6b7280"
            >
              {tickFmt(t)}
            </text>
          </g>
        );
      })}

      <path
        d={area}
        fill={`url(#${id})`}
      />

      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <circle
        cx={last[0]}
        cy={last[1]}
        r="3.2"
        fill="#fff"
        stroke={color}
        strokeWidth="1.8"
      />

      <g
        transform={`translate(${
          last[0] - 42
        }, ${last[1] - 42})`}
      >
        <rect
          width="38"
          height="26"
          rx="4"
          fill="#fff"
          stroke="#e5e7eb"
        />

        <text
          x="19"
          y="12"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#111827"
        >
          {tipValue}
        </text>

        <text
          x="19"
          y="21"
          textAnchor="middle"
          fontSize="6.5"
          fill="#6b7280"
        >
          {tipLabel}
        </text>
      </g>

      {xLabels.map((x, i) => (
        <text
          key={`${x}-${i}`}
          x={
            L +
            (i *
              (R - L)) /
              Math.max(
                1,
                xLabels.length - 1
              )
          }
          y={B + 14}
          textAnchor="middle"
          fontSize="7.5"
          fill="#6b7280"
        >
          {x}
        </text>
      ))}
    </svg>
  );
}

/* ================================================================
   OVERVIEW PAGE
================================================================ */

function BacklinksOverview({
  data,
  range,
  setRange,
  selectedDomain,
  onChangeTab,
}) {
  let acc = 0;

  const segs =
    data.linkTypes.map((s) => {
      const seg = {
        ...s,
        offset: -acc,
      };

      acc += s.pct;

      return seg;
    });

  return (
    <>
      {/* STAT CARDS */}

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {data.stats.map((s) => {
          const Icon = s.icon;

          return (
            <Card
              key={s.label}
              className="p-3"
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${toneBg[s.tone]}`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>

                <div className="min-w-0">
                  <div className="text-[10.5px] text-gray-600 whitespace-nowrap">
                    {s.label}
                  </div>

                  <div className="text-[19px] font-bold text-gray-900 leading-tight">
                    {s.value}
                  </div>

                  <div className="flex items-center gap-1 text-[9px] whitespace-nowrap mt-0.5">
                    <span
                      className={`flex items-center gap-0.5 font-semibold ${
                        s.good
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {s.up ? (
                        <ArrowUp />
                      ) : (
                        <ArrowDown />
                      )}

                      {s.change}
                    </span>

                    <span className="text-gray-400">
                      vs last month
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.92fr] gap-3">
        {/* Backlinks Growth */}

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900">
              Backlinks Growth
            </h3>

            <select
              value={range}
              onChange={(e) =>
                setRange(e.target.value)
              }
              className="appearance-none border border-gray-200 rounded-md px-2.5 py-1 pr-7 text-[12px] text-gray-600 bg-white outline-none cursor-pointer"
            >
              <option>
                Last 2 weeks
              </option>

              <option>
                Last 30 days
              </option>

              <option>
                Last 3 months
              </option>
            </select>
          </div>

          <div className="mt-1">
            <LineChart
              data={data.growth}
              color="#16a34a"
              max={data.maxGrowth}
              ticks={[
                0,
                data.maxGrowth * 0.25,
                data.maxGrowth * 0.5,
                data.maxGrowth * 0.75,
                data.maxGrowth,
              ]}
              tickFmt={(t) =>
                t === 0
                  ? "0"
                  : `${Number(t).toFixed(
                      1
                    )}K`
              }
              xLabels={data.labels}
              tipLabel={range}
              tipValue={`${data.lastGrowth.toFixed(
                2
              )}K`}
            />
          </div>
        </Card>

        {/* Referring Domains */}

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900">
              Referring Domains
            </h3>

            <select
              value={range}
              onChange={(e) =>
                setRange(e.target.value)
              }
              className="appearance-none border border-gray-200 rounded-md px-2.5 py-1 pr-7 text-[12px] text-gray-600 bg-white outline-none cursor-pointer"
            >
              <option>
                Last 2 weeks
              </option>

              <option>
                Last 30 days
              </option>

              <option>
                Last 3 months
              </option>
            </select>
          </div>

          <div className="mt-1">
            <LineChart
              data={data.referring}
              color="#2f80ed"
              max={data.maxReferring}
              ticks={[
                0,
                data.maxReferring * 0.25,
                data.maxReferring * 0.5,
                data.maxReferring * 0.75,
                data.maxReferring,
              ]}
              tickFmt={(t) =>
                t === 0
                  ? "0"
                  : t >= 1000
                  ? `${(
                      t / 1000
                    ).toFixed(1)}K`
                  : `${Math.round(t)}`
              }
              xLabels={data.labels}
              tipLabel={range}
              tipValue={data.lastReferring.toLocaleString()}
            />
          </div>
        </Card>

        {/* Link Type Distribution */}

        <Card className="p-4">
          <h3 className="text-[14px] font-bold text-gray-900">
            Link Type Distribution
          </h3>

          <div className="flex items-center gap-5 mt-3">
            <div className="relative w-[128px] h-[128px] shrink-0">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full -rotate-90"
              >
                {segs.map((s) => (
                  <circle
                    key={s.name}
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="12"
                    pathLength="100"
                    strokeDasharray={`${s.pct - 0.6} ${
                      100 - s.pct + 0.6
                    }`}
                    strokeDashoffset={s.offset}
                  />
                ))}
              </svg>

              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <div className="text-[18px] font-bold text-gray-900 leading-none">
                    {data.stats[0].value}
                  </div>

                  <div className="text-[10px] text-gray-500 mt-1">
                    Backlinks
                  </div>
                </div>
              </div>
            </div>

            <ul className="flex-1 space-y-2.5">
              {data.linkTypes.map(
                (s) => (
                  <li
                    key={s.name}
                    className="flex items-center text-[12px] text-gray-700"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-[3px] mr-2"
                      style={{
                        background:
                          s.color,
                      }}
                    />

                    <span className="flex-1">
                      {s.name}
                    </span>

                    <span className="font-semibold text-gray-900">
                      {s.pct}%
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </Card>
      </div>

      {/* TABLES */}

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_0.65fr] gap-3">
        {/* Top Referring Domains */}

        <Card className="p-4 overflow-x-auto">
          <div className="flex items-center mb-2.5">
            <h3 className="text-[14px] font-bold text-gray-900">
              Top Referring Domains
            </h3>
          </div>

          <table className="w-full text-[12px] min-w-[520px]">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-[10px] font-semibold">
                <th className="text-left py-1.5 pl-2 rounded-l">
                  Domain
                </th>

                <th className="text-center">
                  Backlinks
                </th>

                <th className="text-center">
                  Domain Authority
                </th>

                <th className="text-center">
                  Link Type
                </th>

                <th className="rounded-r w-6" />
              </tr>
            </thead>

            <tbody>
              {data.domains.map(
                (r) => (
                  <tr
                    key={r.d}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-[7px] pl-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${r.d}&sz=32`}
                          alt=""
                          className="w-[18px] h-[18px] rounded object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";

                            if (
                              e.currentTarget
                                .nextElementSibling
                            ) {
                              e.currentTarget.nextElementSibling.style.display =
                                "grid";
                            }
                          }}
                        />

                        <span className="w-[18px] h-[18px] rounded bg-gray-100 text-gray-500 text-[9px] font-bold place-items-center hidden">
                          {r.d
                            .charAt(0)
                            .toUpperCase()}
                        </span>

                        <span className="text-gray-800">
                          {r.d}
                        </span>
                      </div>
                    </td>

                    <td className="text-center text-gray-700">
                      {r.b}
                    </td>

                    <td className="text-center text-gray-700">
                      {r.da}
                    </td>

                    <td className="text-center">
                      <Pill type={r.t} />
                    </td>

                    <td className="text-gray-500">
                      <ExternalIcon className="w-3 h-3" />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>

        {/* Anchor Text */}

        <Card className="p-4 overflow-x-auto">
          <div className="flex items-center mb-2.5">
            <h3 className="text-[14px] font-bold text-gray-900">
              Anchor Text Analysis
            </h3>
          </div>

          <table className="w-full text-[12px] min-w-[350px]">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-[10px] font-semibold">
                <th className="text-left py-1.5 pl-2 rounded-l">
                  Anchor Text
                </th>

                <th className="text-center">
                  Backlinks
                </th>

                <th className="text-center rounded-r">
                  Percentage
                </th>
              </tr>
            </thead>

            <tbody>
              {data.anchors.map(
                ([a, b, p]) => (
                  <tr
                    key={a}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-[9px] pl-2 text-gray-800">
                      {a}
                    </td>

                    <td className="text-center text-gray-700">
                      {b.toLocaleString()}
                    </td>

                    <td className="text-center text-gray-700">
                      {p}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>

        {/* Right Column */}

        <div className="space-y-3">
          {/* Toxic Backlinks */}

          <Card className="p-4 overflow-x-auto">
            <div className="flex items-center mb-2.5">
              <h3 className="text-[14px] font-bold text-gray-900">
                Toxic Backlinks
              </h3>
            </div>

            <table className="w-full text-[12px] min-w-[300px]">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-[10px] font-semibold">
                  <th className="text-left py-1.5 pl-2 rounded-l">
                    Domain
                  </th>

                  <th className="text-center">
                    Toxic Score
                  </th>

                  <th className="text-center rounded-r">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.toxic.map(
                  ([d, s]) => (
                    <tr
                      key={d}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-[6px] pl-2 text-gray-800">
                        {d}
                      </td>

                      <td className="text-center">
                        <span className="inline-block w-7 text-center bg-red-100 text-red-500 font-semibold text-[10px] rounded py-0.5">
                          {s}
                        </span>
                      </td>

                      <td className="text-center">
                        <ActionBtn variant="red">
                          Remove
                        </ActionBtn>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>

          {/* Opportunities */}

          <Card className="p-4 overflow-x-auto">
            <div className="flex items-center mb-2.5">
              <h3 className="text-[14px] font-bold text-gray-900">
                Backlink Opportunities
              </h3>
            </div>

            <table className="w-full text-[12px] min-w-[430px]">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-[10px] font-semibold">
                  <th className="text-left py-1.5 pl-2 rounded-l">
                    Domain
                  </th>

                  <th className="text-center">
                    Domain Authority
                  </th>

                  <th className="text-center">
                    Relevance
                  </th>

                  <th className="text-center rounded-r">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.opportunities.map(
                  ([d, da, rel]) => (
                    <tr
                      key={d}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-[6px] pl-2 text-gray-800">
                        {d}
                      </td>

                      <td className="text-center text-gray-700">
                        {da}
                      </td>

                      <td className="text-center">
                        <span
                          className={`inline-block w-[42px] text-center text-[10px] font-medium rounded py-0.5 ${
                            rel === "High"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {rel}
                        </span>
                      </td>

                      <td className="text-center">
                        <ActionBtn>
                          Outreach
                        </ActionBtn>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* FEATURE CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            icon: SearchChart,
            tone: "bg-green-50 text-green-600",
            title:
              "Find Backlink Opportunities",
            text:
              "Discover high-authority websites to get quality backlinks.",
            btn:
              "Find Opportunities",
            tab:
              "Backlink Opportunities",
          },
          {
            icon: BarChartIcon,
            tone:
              "bg-purple-50 text-purple-600",
            title:
              "Analyze Competitor Backlinks",
            text:
              "See where your competitors are getting their backlinks.",
            btn:
              "Analyze Competitors",
            tab:
              "Competitor Backlinks",
          },
          {
            icon: ChainIcon,
            tone:
              "bg-orange-50 text-orange-500",
            title:
              "Link Gap Analysis",
            text:
              "Find missing backlinks your competitors have.",
            btn:
              "Find Link Gaps",
            tab:
              "Link Gap Analysis",
          },
        ].map((f) => {
          const Icon = f.icon;

          return (
            <Card
              key={f.title}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg grid place-items-center shrink-0 ${f.tone}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-[14px] font-bold text-gray-900">
                    {f.title}
                  </div>

                  <div className="text-[12px] text-gray-600 mt-0.5">
                    {f.text}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={() =>
                    onChangeTab(f.tab)
                  }
                  className="flex items-center gap-2 px-6 py-1.5 rounded-md border border-green-300 bg-green-50 text-green-700 text-[12px] font-semibold hover:bg-green-100 transition"
                >
                  {f.btn}

                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI BANNER */}

      <div className="relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 via-white to-green-50 px-5 py-4">
        <svg
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0 55 C200 20 350 80 600 45 S1000 20 1200 50 V80 H0Z"
            fill="#dcf3e4"
          />

          <path
            d="M0 65 C250 40 400 85 650 60 S1000 40 1200 65 V80 H0Z"
            fill="#c9ecd6"
            opacity="0.7"
          />
        </svg>

        <div className="relative flex items-center gap-3">
          <TargetIcon className="w-9 h-9 text-green-700" />

          <div>
            <div className="text-[14px] font-bold text-gray-900">
              Build a Stronger Backlink Profile with AI
            </div>

            <div className="text-[12px] text-gray-600">
              Get personalized backlink opportunities and monitoring alerts powered by AI.
            </div>
          </div>
        </div>

        <button
          type="button"
          className="relative flex items-center gap-2 text-white text-[13px] font-semibold px-5 py-2.5 rounded-md"
          style={{
            background: GD,
          }}
        >
          Upgrade Plan

          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}

/* ================================================================
   MAIN BACKLINKS FINDER
================================================================ */

export default function BacklinksFinder({
  onBackToDashboard,
  onMenuClick,
}) {
  /*
    HOME/DASHBOARD NAVIGATION
    This directly navigates to the Dashboard route.
  */
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("Overview");

  const [domainInput, setDomainInput] =
    useState("tn-seo-module.web.app");

  const [selectedDomain, setSelectedDomain] =
    useState("tn-seo-module.web.app");

  const [range, setRange] =
    useState("Last 30 days");

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  const [customEndDate, setCustomEndDate] =
    useState(new Date());

  const data = useMemo(
    () =>
      createDynamicData(
        selectedDomain,
        range,
        customEndDate
      ),
    [
      selectedDomain,
      range,
      customEndDate,
    ]
  );

  /* ==============================================================
     DOMAIN ANALYSIS
  ============================================================== */

  const analyzeDomain = () => {
    const cleanDomain =
      formatDomain(domainInput);

    setSelectedDomain(cleanDomain);
    setActiveTab("Overview");
  };

  const handleDomainKeyDown = (
    event
  ) => {
    if (event.key === "Enter") {
      analyzeDomain();
    }
  };

  /* ==============================================================
     DATE RANGE
  ============================================================== */

  const handleRangeChange = (
    nextRange
  ) => {
    setRange(nextRange);
    setCalendarOpen(false);
  };

  /* ==============================================================
     HOME
     ONLY CHANGE: DIRECTLY OPEN DASHBOARD
  ============================================================== */

  const goHome = () => {
    navigate("/");
  };

  /* ==============================================================
     TAB CHANGE
  ============================================================== */

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==============================================================
     RENDER
  ============================================================== */

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-sans text-gray-800 p-4">
      <div className="max-w-[1280px] mx-auto space-y-3.5">

        {/* ========================================================
            DOMAIN SEARCH
            This remains inside the normal Backlinks page.
            It is not added to the main Layout navbar.
        ======================================================== */}

        <div className="flex items-center gap-3">
          <div className="flex flex-1 max-w-[470px] bg-white border border-gray-200 rounded-lg overflow-hidden h-9">
            <input
              value={domainInput}
              onChange={(e) =>
                setDomainInput(
                  e.target.value
                )
              }
              onKeyDown={
                handleDomainKeyDown
              }
              className="flex-1 px-3 text-[13px] outline-none placeholder-gray-500 min-w-0"
              placeholder="Enter a domain to analyze backlinks (e.g. example.com)"
            />

            <button
              type="button"
              onClick={analyzeDomain}
              className="flex items-center gap-2 px-4 text-white text-[13px] font-semibold shrink-0"
              style={{
                background: G,
              }}
            >
              Analyze Backlinks

              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            PAGE HEADER
        ======================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
              {activeTab === "Overview"
                ? "Backlinks Analysis"
                : activeTab}
            </h1>

            <p className="text-[14px] text-gray-600 mt-0.5">
              {activeTab === "Overview"
                ? "Analyze, monitor, and build high-quality backlinks to improve your search rankings."
                : "Manage and analyze your backlink data."}
            </p>
          </div>

          {/* Header controls */}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

            {/* Selected domain */}

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10 text-[13px] font-medium text-gray-700 w-[205px]">
              <span className="text-[16px] font-bold text-blue-500">
                G
              </span>

              <span className="flex-1 text-left truncate">
                {selectedDomain}
              </span>
            </div>

            {/* Calendar */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setCalendarOpen(
                    (open) => !open
                  )
                }
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10 text-[13px] font-medium text-gray-700 w-[245px]"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-gray-600" />

                <span className="flex-1 text-left">
                  {formatFullDate(
                    data.start
                  )}{" "}
                  -{" "}
                  {formatFullDate(
                    data.end
                  )}
                </span>

                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {calendarOpen && (
                <div className="absolute right-0 top-12 z-50 w-[285px] rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                  <div className="text-[12px] font-bold text-gray-900 mb-2">
                    Select date range
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[
                      "Last 2 weeks",
                      "Last 30 days",
                      "Last 3 months",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          handleRangeChange(
                            item
                          )
                        }
                        className={`rounded-md border px-2 py-2 text-[10px] font-medium ${
                          range === item
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-[10px] text-gray-500">
                      End date

                      <input
                        type="date"
                        value={customEndDate
                          .toISOString()
                          .slice(
                            0,
                            10
                          )}
                        onChange={(e) => {
                          if (
                            e.target.value
                          ) {
                            const next =
                              new Date(
                                `${e.target.value}T00:00:00`
                              );

                            setCustomEndDate(
                              next
                            );
                          }
                        }}
                        className="mt-1 w-full rounded-md border border-gray-200 px-2 py-1.5 text-[10px] text-gray-700 outline-none focus:border-green-500"
                      />
                    </label>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarOpen(
                            false
                          )
                        }
                        className="w-full rounded-md bg-green-700 py-1.5 text-[10px] font-semibold text-white"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            TABS
        ======================================================== */}

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() =>
                handleTabChange(tab)
              }
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-md text-[12px] font-medium border transition ${
                activeTab === tab
                  ? "text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              style={
                activeTab === tab
                  ? {
                      background: GD,
                    }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ========================================================
            OVERVIEW
        ======================================================== */}

        {activeTab === "Overview" && (
          <BacklinksOverview
            data={data}
            range={range}
            setRange={setRange}
            selectedDomain={
              selectedDomain
            }
            onChangeTab={
              handleTabChange
            }
          />
        )}

        {/* ========================================================
            BACKLINK MONITORING
        ======================================================== */}

        {activeTab ===
          "Backlink Monitoring" && (
          <Backlinkmonitoring
            selectedDomain={
              selectedDomain
            }
          />
        )}

        {/* ========================================================
            COMPETITOR BACKLINKS
        ======================================================== */}

        {activeTab ===
          "Competitor Backlinks" && (
          <Competitorbacklinks
            selectedDomain={
              selectedDomain
            }
          />
        )}

        {/* ========================================================
            BACKLINK OPPORTUNITIES
        ======================================================== */}

        {activeTab ===
          "Backlink Opportunities" && (
          <Backlinkopportunities
            selectedDomain={
              selectedDomain
            }
          />
        )}

        {/* ========================================================
            ANCHOR TEXT ANALYSIS
        ======================================================== */}

        {activeTab ===
          "Anchor Text Analysis" && (
          <Anchortextanalysis
            selectedDomain={
              selectedDomain
            }
          />
        )}

        {/* ========================================================
            LINK GAP ANALYSIS
        ======================================================== */}

        {activeTab ===
          "Link Gap Analysis" && (
          <Linkgapanalysis
            selectedDomain={
              selectedDomain
            }
          />
        )}
      </div>
    </div>
  );
}