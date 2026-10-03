import React, { useMemo, useState } from "react";

import {
  Search,
  Trophy,
  CheckCircle2,
  BarChart3,
  Search as SearchIcon,
  Download,
  MoreHorizontal,
  ArrowUp,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =========================================================
   INITIAL KEYWORDS
========================================================= */

const INITIAL_KEYWORDS = [
  {
    keyword: "seo tools",
    current: 8,
    previous: 11,
    best: 5,
    volume: "18,100",
    url: "/seo-tools",
  },
  {
    keyword: "keyword research tool",
    current: 14,
    previous: 18,
    best: 10,
    volume: "12,100",
    url: "/keyword-research",
  },
  {
    keyword: "backlink checker",
    current: 21,
    previous: 24,
    best: 16,
    volume: "9,900",
    url: "/backlink-checker",
  },
  {
    keyword: "rank tracking software",
    current: 6,
    previous: 9,
    best: 4,
    volume: "8,100",
    url: "/rank-tracking",
  },
  {
    keyword: "technical seo",
    current: 11,
    previous: 15,
    best: 7,
    volume: "6,600",
    url: "/technical-seo",
  },
  {
    keyword: "on page seo",
    current: 17,
    previous: 20,
    best: 12,
    volume: "5,400",
    url: "/on-page-seo",
  },
  {
    keyword: "seo audit tool",
    current: 9,
    previous: 12,
    best: 6,
    volume: "4,800",
    url: "/website-audit",
  },
  {
    keyword: "competitor analysis",
    current: 26,
    previous: 31,
    best: 22,
    volume: "4,200",
    url: "/competitor-analysis",
  },
  {
    keyword: "website seo checker",
    current: 19,
    previous: 23,
    best: 14,
    volume: "3,900",
    url: "/website-seo-checker",
  },
  {
    keyword: "seo ranking checker",
    current: 13,
    previous: 17,
    best: 9,
    volume: "3,600",
    url: "/rank-checker",
  },
  {
    keyword: "local seo",
    current: 24,
    previous: 29,
    best: 18,
    volume: "3,200",
    url: "/local-seo",
  },
  {
    keyword: "seo analytics",
    current: 16,
    previous: 21,
    best: 11,
    volume: "2,900",
    url: "/seo-analytics",
  },
  {
    keyword: "google ranking checker",
    current: 28,
    previous: 34,
    best: 20,
    volume: "2,500",
    url: "/google-ranking",
  },
  {
    keyword: "seo competitor checker",
    current: 31,
    previous: 37,
    best: 25,
    volume: "2,200",
    url: "/competitor-checker",
  },
  {
    keyword: "backlink monitoring",
    current: 12,
    previous: 16,
    best: 8,
    volume: "1,900",
    url: "/backlink-monitoring",
  },
];

/* =========================================================
   CREATE A DETERMINISTIC SEED
========================================================= */

const getKeywordSeed = (keyword = "") => {
  return keyword
    .split("")
    .reduce((total, char, index) => {
      return total + char.charCodeAt(0) * (index + 1);
    }, 0);
};

/* =========================================================
   CREATE DYNAMIC KEYWORD DATA
========================================================= */

const createKeywordData = (row) => {
  const seed = getKeywordSeed(row.keyword);

  const currentVariation = seed % 4;
  const previousVariation = seed % 5;

  const current = Math.max(
    1,
    row.current + currentVariation - 2
  );

  const previous = Math.max(
    current + 1,
    row.previous + previousVariation - 2
  );

  const best = Math.max(
    1,
    Math.min(current, row.best + (seed % 3) - 1)
  );

  return {
    ...row,
    current,
    previous,
    best,
    up: previous > current,
  };
};

/* =========================================================
   DYNAMIC GRAPH DATA
========================================================= */

const createTrendData = (keywordRow, range) => {
  const seed = getKeywordSeed(keywordRow.keyword);

  let pointCount = 7;

  if (range === "Last 30 days") {
    pointCount = 10;
  }

  if (range === "Last 90 days") {
    pointCount = 15;
  }

  const data = [];

  /*
    Starting values are different for every keyword.
    Therefore selecting another keyword changes the graph.
  */

  let top3Value =
    10 + (seed % 15);

  let top10Value =
    35 + (seed % 20);

  let top50Value =
    70 + (seed % 20);

  /*
    Bring the graph slightly closer to the
    selected keyword's actual ranking.
  */

  const currentPosition = Number(keywordRow.current) || 20;

  top3Value += Math.min(currentPosition, 30) * 0.15;
  top10Value += Math.min(currentPosition, 30) * 0.2;
  top50Value += Math.min(currentPosition, 50) * 0.15;

  for (let i = 0; i < pointCount; i++) {
    const top3Change =
      ((seed + i * 17) % 9) - 4;

    const top10Change =
      ((seed + i * 13) % 11) - 5;

    const top50Change =
      ((seed + i * 19) % 13) - 6;

    top3Value +=
      top3Change +
      (i % 3 === 0 ? 2 : 0);

    top10Value +=
      top10Change +
      (i % 2 === 0 ? 2 : 0);

    top50Value +=
      top50Change +
      (i % 4 === 0 ? 2 : 0);

    let top3 = Math.round(
      Math.min(
        100,
        Math.max(5, top3Value)
      )
    );

    let top10 = Math.round(
      Math.min(
        100,
        Math.max(top3 + 8, top10Value)
      )
    );

    let top50 = Math.round(
      Math.min(
        100,
        Math.max(top10 + 10, top50Value)
      )
    );

    let day;

    if (range === "Last 7 days") {
      day = `Day ${i + 1}`;
    } else if (range === "Last 30 days") {
      day = `Day ${(i + 1) * 3}`;
    } else {
      day = `Day ${(i + 1) * 6}`;
    }

    data.push({
      day,
      top3,
      top10,
      top50,
    });
  }

  return data;
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-bold text-gray-900">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs font-medium text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon
            size={22}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SPARKLINE
========================================================= */

const Sparkline = ({ up = true }) => {
  const points = up
    ? "2,18 8,16 14,17 20,11 26,12 32,7 38,9 44,4"
    : "2,6 8,8 14,7 20,12 26,10 32,16 38,14 44,19";

  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      className="overflow-visible"
    >
      <polyline
        points={points}
        fill="none"
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const KeywordRankings = ({ rows }) => {
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [search, setSearch] =
    useState("");

  const [trendRange, setTrendRange] =
    useState("Last 30 days");

  const [keywords, setKeywords] =
    useState(() =>
      INITIAL_KEYWORDS.map(
        createKeywordData
      )
    );

  const [selectedKeyword, setSelectedKeyword] =
    useState(
      INITIAL_KEYWORDS[0]
    );

  const [menuKeyword, setMenuKeyword] =
    useState(null);

  const [selectedRows, setSelectedRows] =
    useState([]);

  /* =====================================================
     USE PARENT ROWS IF PROVIDED
  ===================================================== */

  const sourceKeywords = useMemo(() => {
    if (
      Array.isArray(rows) &&
      rows.length > 0
    ) {
      return rows.map((row) => {
        return createKeywordData({
          keyword:
            row.keyword ||
            row.name ||
            "keyword",

          current:
            Number(
              row.current ??
                row.position ??
                20
            ),

          previous:
            Number(
              row.previous ??
                row.previousPosition ??
                25
            ),

          best:
            Number(
              row.best ??
                row.bestPosition ??
                10
            ),

          volume:
            row.volume ||
            row.searchVolume ||
            "1,000",

          url:
            row.url ||
            "/",
        });
      });
    }

    return keywords;
  }, [rows, keywords]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredKeywords = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      return sourceKeywords;
    }

    return sourceKeywords.filter(
      (item) =>
        item.keyword
          .toLowerCase()
          .includes(value) ||
        item.url
          .toLowerCase()
          .includes(value)
    );
  }, [search, sourceKeywords]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredKeywords.length /
        pageSize
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const paginatedKeywords =
    useMemo(() => {
      const start =
        (safePage - 1) *
        pageSize;

      return filteredKeywords.slice(
        start,
        start + pageSize
      );
    }, [
      filteredKeywords,
      safePage,
      pageSize,
    ]);

  /* =====================================================
     DYNAMIC STATS
  ===================================================== */

  const stats = useMemo(() => {
    const total =
      sourceKeywords.length;

    const top10 =
      sourceKeywords.filter(
        (item) =>
          Number(item.current) <= 10
      ).length;

    const top50 =
      sourceKeywords.filter(
        (item) =>
          Number(item.current) <= 50
      ).length;

    const improving =
      sourceKeywords.filter(
        (item) =>
          Number(item.previous) >
          Number(item.current)
      ).length;

    return {
      total,
      top10,
      top50,
      improving,
    };
  }, [sourceKeywords]);

  /* =====================================================
     SELECTED GRAPH KEYWORD
  ===================================================== */

  const selectedKeywordData =
    useMemo(() => {
      const found =
        sourceKeywords.find(
          (item) =>
            item.keyword ===
            selectedKeyword.keyword
        );

      return found || sourceKeywords[0];
    }, [
      sourceKeywords,
      selectedKeyword,
    ]);

  /* =====================================================
     DYNAMIC GRAPH
  ===================================================== */

  const trendData = useMemo(() => {
    if (!selectedKeywordData) {
      return [];
    }

    return createTrendData(
      selectedKeywordData,
      trendRange
    );
  }, [
    selectedKeywordData,
    trendRange,
  ]);

  /* =====================================================
     SEARCH CHANGE
  ===================================================== */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);

    const firstMatch =
      sourceKeywords.find((item) =>
        item.keyword
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
      );

    if (firstMatch) {
      setSelectedKeyword(
        firstMatch
      );
    }
  };

  /* =====================================================
     PAGE SIZE
  ===================================================== */

  const handlePageSizeChange = (
    value
  ) => {
    setPageSize(Number(value));
    setPage(1);
  };

  /* =====================================================
     SELECT ALL
  ===================================================== */

  const handleSelectAll = (
    checked
  ) => {
    if (checked) {
      setSelectedRows(
        paginatedKeywords.map(
          (item) =>
            item.keyword
        )
      );
    } else {
      setSelectedRows([]);
    }
  };

  /* =====================================================
     SELECT SINGLE
  ===================================================== */

  const handleSelectRow = (
    keyword,
    checked
  ) => {
    if (checked) {
      setSelectedRows(
        (previous) => [
          ...previous,
          keyword,
        ]
      );
    } else {
      setSelectedRows(
        (previous) =>
          previous.filter(
            (item) =>
              item !== keyword
          )
      );
    }
  };

  /* =====================================================
     EXPORT CSV
  ===================================================== */

  const handleExport = () => {
    const header = [
      "Keyword",
      "Current Position",
      "Previous Position",
      "Best Position",
      "Search Volume",
      "URL",
    ];

    const csvRows =
      filteredKeywords.map(
        (item) => [
          item.keyword,
          item.current,
          item.previous,
          item.best,
          item.volume,
          item.url,
        ]
      );

    const csv = [
      header,
      ...csvRows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "keyword-rankings.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     PAGINATION BUTTONS
  ===================================================== */

  const goToPage = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      setPage(newPage);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="w-full space-y-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Keyword Rankings
          </h1>

          <p className="mt-1 text-sm font-medium text-gray-500">
            Monitor your keyword positions
            and ranking performance.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <Download size={17} />
          Export
        </button>
      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Keywords"
          value={stats.total}
          subtitle="Tracked keywords"
          icon={SearchIcon}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Top 10"
          value={stats.top10}
          subtitle="Keywords in top 10"
          icon={Trophy}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />

        <StatCard
          title="Top 50"
          value={stats.top50}
          subtitle="Keywords in top 50"
          icon={BarChart3}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatCard
          title="Improving"
          value={stats.improving}
          subtitle="Keywords moving up"
          icon={CheckCircle2}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* =================================================
          GRAPH
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Keyword Position Trend
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Ranking trend for{" "}
              <span className="font-bold text-gray-800">
                {selectedKeywordData?.keyword ||
                  "keyword"}
              </span>
            </p>
          </div>

          <select
            value={trendRange}
            onChange={(e) =>
              setTrendRange(
                e.target.value
              )
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-green-500"
          >
            <option>
              Last 7 days
            </option>

            <option>
              Last 30 days
            </option>

            <option>
              Last 90 days
            </option>
          </select>
        </div>

        {/* GRAPH LEGEND */}

        <div className="mb-3 flex flex-wrap items-center gap-5 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            Top 3
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            Top 10
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            Top 50
          </div>
        </div>

        {/* THREE DYNAMIC LINES */}

        <div className="h-[270px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={trendData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 12,
                  fontWeight: 600,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fontSize: 12,
                  fontWeight: 600,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              />

              {/* TOP 3 */}

              <Line
                type="monotone"
                dataKey="top3"
                name="Top 3"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#22c55e",
                }}
                activeDot={{
                  r: 5,
                }}
                isAnimationActive={true}
                animationDuration={700}
              />

              {/* TOP 10 */}

              <Line
                type="monotone"
                dataKey="top10"
                name="Top 10"
                stroke="#60a5fa"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#60a5fa",
                }}
                activeDot={{
                  r: 5,
                }}
                isAnimationActive={true}
                animationDuration={700}
              />

              {/* TOP 50 */}

              <Line
                type="monotone"
                dataKey="top50"
                name="Top 50"
                stroke="#fbbf24"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#fbbf24",
                }}
                activeDot={{
                  r: 5,
                }}
                isAnimationActive={true}
                animationDuration={700}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =================================================
          KEYWORD TABLE CARD
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* TABLE HEADER */}

        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Keyword Rankings
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Click a keyword to update
              the graph.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* SEARCH */}

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                placeholder="Search keyword..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm font-medium outline-none focus:border-green-500 sm:w-[250px]"
              />
            </div>

            {/* EXPORT */}

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      paginatedKeywords.length >
                        0 &&
                      paginatedKeywords.every(
                        (item) =>
                          selectedRows.includes(
                            item.keyword
                          )
                      )
                    }
                    onChange={(e) =>
                      handleSelectAll(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-green-600"
                  />
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Keyword
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Current Position
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Previous Position
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Best Position
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Search Volume
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  URL
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  Trend
                </th>

                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedKeywords.map(
                (item, index) => {
                  const isSelected =
                    selectedKeyword?.keyword ===
                    item.keyword;

                  const isChecked =
                    selectedRows.includes(
                      item.keyword
                    );

                  return (
                    <tr
                      key={`${item.keyword}-${index}`}
                      onClick={() =>
                        setSelectedKeyword(
                          item
                        )
                      }
                      className={`cursor-pointer border-b border-gray-100 transition ${
                        isSelected
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* CHECKBOX */}

                      <td
                        className="px-4 py-3"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectRow(
                              item.keyword,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 accent-green-600"
                        />
                      </td>

                      {/* KEYWORD */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {item.keyword}
                          </span>

                          {isSelected && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                              Selected
                            </span>
                          )}
                        </div>
                      </td>

                      {/* CURRENT */}

                      <td className="px-4 py-3">
                        <span className="text-base font-bold text-gray-900">
                          #{item.current}
                        </span>
                      </td>

                      {/* PREVIOUS */}

                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-gray-700">
                          #{item.previous}
                        </span>
                      </td>

                      {/* BEST */}

                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-gray-900">
                          #{item.best}
                        </span>
                      </td>

                      {/* SEARCH VOLUME */}

                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-gray-700">
                          {item.volume}
                        </span>
                      </td>

                      {/* URL */}

                      <td className="max-w-[220px] px-4 py-3">
                        <span className="block truncate text-sm font-medium text-blue-600">
                          {item.url}
                        </span>
                      </td>

                      {/* TREND */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Sparkline
                            up={item.up}
                          />

                          {item.up ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                              <ArrowUp
                                size={13}
                              />
                              Up
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-red-600">
                              Down
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ACTIONS */}

                      <td
                        className="relative px-4 py-3 text-center"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <button
                          onClick={() =>
                            setMenuKeyword(
                              menuKeyword ===
                                item.keyword
                                ? null
                                : item.keyword
                            )
                          }
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          <MoreHorizontal
                            size={18}
                          />
                        </button>

                        {menuKeyword ===
                          item.keyword && (
                          <div className="absolute right-4 top-11 z-20 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg">
                            <button
                              onClick={() => {
                                setSelectedKeyword(
                                  item
                                );
                                setMenuKeyword(
                                  null
                                );
                              }}
                              className="block w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              View Trend
                            </button>

                            <button
                              onClick={() =>
                                setMenuKeyword(
                                  null
                                )
                              }
                              className="block w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}

              {/* EMPTY STATE */}

              {paginatedKeywords.length ===
                0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-10 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search
                        size={30}
                        className="mb-2 text-gray-300"
                      />

                      <p className="text-sm font-bold text-gray-700">
                        No keywords found
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Try another keyword.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-800">
              {filteredKeywords.length === 0
                ? 0
                : (safePage - 1) *
                    pageSize +
                  1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-gray-800">
              {Math.min(
                safePage * pageSize,
                filteredKeywords.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-800">
              {filteredKeywords.length}
            </span>{" "}
            keywords
          </div>

          <div className="flex items-center gap-3">
            {/* PAGE SIZE */}

            <select
              value={pageSize}
              onChange={(e) =>
                handlePageSizeChange(
                  e.target.value
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm font-semibold text-gray-700 outline-none"
            >
              <option value="5">
                5 / page
              </option>

              <option value="10">
                10 / page
              </option>

              <option value="15">
                15 / page
              </option>
            </select>

            {/* PREVIOUS */}

            <button
              disabled={safePage === 1}
              onClick={() =>
                goToPage(safePage - 1)
              }
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
            >
              Previous
            </button>

            {/* PAGE NUMBER */}

            <span className="text-sm font-bold text-gray-700">
              Page {safePage} of{" "}
              {totalPages}
            </span>

            {/* NEXT */}

            <button
              disabled={
                safePage === totalPages
              }
              onClick={() =>
                goToPage(safePage + 1)
              }
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordRankings;