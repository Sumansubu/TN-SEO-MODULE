import React, { useMemo, useState } from "react";
import {
  Link2,
  Globe2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================================
   FRONTEND DATA
   ========================================================= */

const RANGE_DATA = {
  "Last 7 days": {
    totalBacklinks: "3,248",
    referringDomains: "842",
    newBacklinks: "32",
    lostBacklinks: "7",
    newChange: "8%",
    lostChange: "5%",

    trend: [
      { day: "Sep 25", backlinks: 3180 },
      { day: "Sep 26", backlinks: 3192 },
      { day: "Sep 27", backlinks: 3205 },
      { day: "Sep 28", backlinks: 3218 },
      { day: "Sep 29", backlinks: 3230 },
      { day: "Sep 30", backlinks: 3240 },
      { day: "Oct 1", backlinks: 3248 },
    ],
  },

  "Last 30 days": {
    totalBacklinks: "3,248",
    referringDomains: "842",
    newBacklinks: "124",
    lostBacklinks: "28",
    newChange: "22%",
    lostChange: "15%",

    trend: [
      { day: "Sep 2", backlinks: 2860 },
      { day: "Sep 7", backlinks: 2950 },
      { day: "Sep 12", backlinks: 3035 },
      { day: "Sep 17", backlinks: 3100 },
      { day: "Sep 22", backlinks: 3170 },
      { day: "Sep 27", backlinks: 3220 },
      { day: "Oct 1", backlinks: 3248 },
    ],
  },

  "Last 90 days": {
    totalBacklinks: "3,248",
    referringDomains: "842",
    newBacklinks: "386",
    lostBacklinks: "74",
    newChange: "31%",
    lostChange: "12%",

    trend: [
      { day: "Jul 5", backlinks: 2210 },
      { day: "Jul 20", backlinks: 2390 },
      { day: "Aug 5", backlinks: 2530 },
      { day: "Aug 20", backlinks: 2700 },
      { day: "Sep 5", backlinks: 2950 },
      { day: "Sep 20", backlinks: 3150 },
      { day: "Oct 1", backlinks: 3248 },
    ],
  },
};

/* =========================================================
   SOURCE DATA
   ========================================================= */

const SOURCE_DATA = [
  {
    name: "Dofollow",
    value: 68,
    color: "#22c55e",
  },
  {
    name: "Nofollow",
    value: 24,
    color: "#3b82f6",
  },
  {
    name: "Sponsored",
    value: 5,
    color: "#f59e0b",
  },
  {
    name: "UGC",
    value: 3,
    color: "#ef4444",
  },
];

/* =========================================================
   FRONTEND BACKLINK DATA
   ========================================================= */

const ALL_BACKLINKS = [
  {
    source: "https://medium.com/...",
    domain: "medium.com",
    anchor: "SEO tools",
    type: "Dofollow",
    date: "Sep 15, 2026",
    dateValue: new Date("2026-09-15"),
  },

  {
    source: "https://linkedin.com/...",
    domain: "linkedin.com",
    anchor: "TN SEO",
    type: "Nofollow",
    date: "Sep 14, 2026",
    dateValue: new Date("2026-09-14"),
  },

  {
    source: "https://github.com/...",
    domain: "github.com",
    anchor: "website audit",
    type: "Dofollow",
    date: "Sep 13, 2026",
    dateValue: new Date("2026-09-13"),
  },

  {
    source: "https://techcrunch.com/...",
    domain: "techcrunch.com",
    anchor: "AI SEO",
    type: "Nofollow",
    date: "Sep 12, 2026",
    dateValue: new Date("2026-09-12"),
  },

  {
    source: "https://forbes.com/...",
    domain: "forbes.com",
    anchor: "SEO module",
    type: "Dofollow",
    date: "Sep 10, 2026",
    dateValue: new Date("2026-09-10"),
  },

  {
    source: "https://searchenginejournal.com/...",
    domain: "searchenginejournal.com",
    anchor: "SEO analytics",
    type: "Dofollow",
    date: "Sep 8, 2026",
    dateValue: new Date("2026-09-08"),
  },

  {
    source: "https://reddit.com/...",
    domain: "reddit.com",
    anchor: "SEO platform",
    type: "Nofollow",
    date: "Sep 6, 2026",
    dateValue: new Date("2026-09-06"),
  },

  {
    source: "https://dev.to/...",
    domain: "dev.to",
    anchor: "SEO tools",
    type: "Dofollow",
    date: "Sep 4, 2026",
    dateValue: new Date("2026-09-04"),
  },

  {
    source: "https://hashnode.com/...",
    domain: "hashnode.com",
    anchor: "technical SEO",
    type: "Dofollow",
    date: "Aug 28, 2026",
    dateValue: new Date("2026-08-28"),
  },

  {
    source: "https://quora.com/...",
    domain: "quora.com",
    anchor: "SEO audit",
    type: "Nofollow",
    date: "Aug 20, 2026",
    dateValue: new Date("2026-08-20"),
  },
];

/* =========================================================
   LINK TYPE BADGE
   ========================================================= */

function LinkTypeBadge({ type }) {
  const isDofollow = type === "Dofollow";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        isDofollow
          ? "bg-green-50 text-green-700"
          : "bg-orange-50 text-orange-600"
      }`}
    >
      {type}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function BacklinkMonitoring() {
  const [selectedRange, setSelectedRange] = useState("Last 30 days");

  /* =========================================================
     CURRENT RANGE DATA
     ========================================================= */

  const currentData = useMemo(() => {
    return RANGE_DATA[selectedRange];
  }, [selectedRange]);

  /* =========================================================
     FILTER BACKLINKS
     ========================================================= */

  const filteredBacklinks = useMemo(() => {
    const today = new Date("2026-10-01");

    let days = 30;

    if (selectedRange === "Last 7 days") {
      days = 7;
    }

    if (selectedRange === "Last 90 days") {
      days = 90;
    }

    const startDate = new Date(today);

    startDate.setDate(today.getDate() - days);

    return ALL_BACKLINKS.filter(
      (item) =>
        item.dateValue >= startDate &&
        item.dateValue <= today
    );
  }, [selectedRange]);

  /* =========================================================
     DYNAMIC STAT CARDS
     ========================================================= */

  const STAT_CARDS = useMemo(
    () => [
      {
        label: "Total Backlinks",
        value: currentData.totalBacklinks,
        change: "12%",
        up: true,
        icon: Link2,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      },

      {
        label: "Referring Domains",
        value: currentData.referringDomains,
        change: "8%",
        up: true,
        icon: Globe2,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
      },

      {
        label: "New Backlinks",
        value: currentData.newBacklinks,
        change: currentData.newChange,
        up: true,
        icon: TrendingUp,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-600",
      },

      {
        label: "Lost Backlinks",
        value: currentData.lostBacklinks,
        change: currentData.lostChange,
        up: false,
        icon: TrendingDown,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
      },
    ],
    [currentData]
  );

  return (
    <div className="space-y-6">

      {/* =====================================================
          STAT CARDS
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {STAT_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div
                  className={`rounded-xl ${card.iconBg} p-2.5`}
                >
                  <Icon
                    className={`h-5 w-5 ${card.iconColor}`}
                  />
                </div>

                <span
                  className={`flex items-center gap-1 text-xs font-bold ${
                    card.up
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {card.up ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}

                  {card.change}
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-700">
                {card.label}
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-950">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          TREND + SOURCE DISTRIBUTION
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* ===================================================
            BACKLINK TREND
            =================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-bold text-gray-950">
              Backlinks Trend
            </h3>

            <select
              value={selectedRange}
              onChange={(e) =>
                setSelectedRange(e.target.value)
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>

          </div>

          <div className="mt-4 h-56">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={currentData.trend}>

                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 12,
                    fill: "#374151",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: "#374151",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    `${v / 1000}K`
                  }
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    color: "#111827",
                    fontWeight: 600,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="backlinks"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* ===================================================
            SOURCE DISTRIBUTION
            =================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <h3 className="text-base font-bold text-gray-950">
            Backlink Source Distribution
          </h3>

          <div className="mt-2 flex items-center gap-6">

            <div className="relative h-40 w-40 shrink-0">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={SOURCE_DATA}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {SOURCE_DATA.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-xl font-bold text-gray-950">
                  {currentData.totalBacklinks}
                </span>

                <span className="text-xs font-semibold text-gray-600">
                  Backlinks
                </span>

              </div>
            </div>

            <ul className="flex-1 space-y-2.5">

              {SOURCE_DATA.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >

                  <span className="flex items-center gap-2 font-semibold text-gray-800">

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    {item.name}

                  </span>

                  <span className="font-bold text-gray-950">
                    {item.value}%
                  </span>

                </li>
              ))}

            </ul>

          </div>
        </div>
      </div>

      {/* =====================================================
          LATEST BACKLINKS TABLE
          ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="text-base font-bold text-gray-950">
            Latest Backlinks
          </h3>

        </div>

        <div className="mt-4 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-700">

                <th className="pb-3 pr-4 font-bold">
                  #
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Source Page
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Domain
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Anchor Text
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Link Type
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Found On
                </th>

                <th className="pb-3 font-bold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredBacklinks.length > 0 ? (

                filteredBacklinks.map((row, i) => (

                  <tr
                    key={row.source}
                    className="text-gray-900"
                  >

                    <td className="py-3 pr-4 font-semibold text-gray-700">
                      {i + 1}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-blue-700">
                      {row.source}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-gray-900">
                      {row.domain}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-gray-900">
                      {row.anchor}
                    </td>

                    <td className="py-3 pr-4">
                      <LinkTypeBadge
                        type={row.type}
                      />
                    </td>

                    <td className="py-3 pr-4 font-medium text-gray-700">
                      {row.date}
                    </td>

                    <td className="py-3">

                      <button
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white p-1.5 text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                        title="Open backlink"
                        onClick={() => {
                          console.log(
                            "Opening backlink:",
                            row.source
                          );
                        }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="py-8 text-center text-sm font-semibold text-gray-600"
                  >
                    No backlinks found for this date range.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}