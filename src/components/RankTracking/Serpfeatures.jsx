import React, { useMemo, useState } from "react";

import {
  Star,
  MessageSquareQuote,
  HelpCircle,
  MapPin,
  Search,
  Download,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Link2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =========================================================
   KEYWORD DATA
   Frontend-only demo data
========================================================= */

const INITIAL_KEYWORDS = [
  {
    keyword: "SEO services",
    position: 3,
    features: ["star", "ask", "images", "map"],
    volume: "12,000",
    url: "/services/seo",
  },
  {
    keyword: "AI SEO tool",
    position: 8,
    features: ["star", "ask", "map"],
    volume: "8,000",
    url: "/ai-seo-tool",
  },
  {
    keyword: "digital marketing",
    position: 10,
    features: ["ask", "star", "images", "map"],
    volume: "22,000",
    url: "/blog/digital-marketing",
  },
  {
    keyword: "local SEO",
    position: 5,
    features: ["star", "map", "ask"],
    volume: "5,400",
    url: "/services/local-seo",
  },
  {
    keyword: "SEO company",
    position: 12,
    features: ["star", "ask", "map"],
    volume: "18,000",
    url: "/",
  },
  {
    keyword: "keyword research",
    position: 7,
    features: ["star", "ask", "images"],
    volume: "15,000",
    url: "/keyword-research",
  },
  {
    keyword: "backlink checker",
    position: 14,
    features: ["star", "images", "videos"],
    volume: "9,900",
    url: "/backlink-checker",
  },
  {
    keyword: "SEO audit tool",
    position: 6,
    features: ["star", "ask", "map", "images"],
    volume: "7,500",
    url: "/website-audit",
  },
  {
    keyword: "rank tracking",
    position: 4,
    features: ["star", "ask", "sitelinks"],
    volume: "6,800",
    url: "/rank-tracking",
  },
  {
    keyword: "technical SEO",
    position: 11,
    features: ["ask", "images", "videos"],
    volume: "6,200",
    url: "/technical-seo",
  },
  {
    keyword: "on page SEO",
    position: 9,
    features: ["star", "ask", "images"],
    volume: "5,800",
    url: "/on-page-seo",
  },
  {
    keyword: "competitor analysis",
    position: 18,
    features: ["ask", "map", "videos"],
    volume: "4,900",
    url: "/competitor-analysis",
  },
  {
    keyword: "SEO analytics",
    position: 15,
    features: ["star", "images", "sitelinks"],
    volume: "4,500",
    url: "/seo-analytics",
  },
  {
    keyword: "Google ranking checker",
    position: 13,
    features: ["star", "ask", "images"],
    volume: "4,100",
    url: "/google-ranking",
  },
  {
    keyword: "website SEO checker",
    position: 21,
    features: ["ask", "images", "videos"],
    volume: "3,800",
    url: "/website-seo-checker",
  },
  {
    keyword: "local SEO services",
    position: 16,
    features: ["star", "map", "ask"],
    volume: "3,500",
    url: "/local-seo-services",
  },
  {
    keyword: "SEO consultant",
    position: 19,
    features: ["star", "map", "sitelinks"],
    volume: "3,200",
    url: "/seo-consultant",
  },
  {
    keyword: "SEO marketing",
    position: 23,
    features: ["ask", "images", "videos"],
    volume: "3,000",
    url: "/seo-marketing",
  },
  {
    keyword: "free SEO tools",
    position: 17,
    features: ["star", "ask", "images", "videos"],
    volume: "2,900",
    url: "/free-seo-tools",
  },
  {
    keyword: "SERP analysis",
    position: 20,
    features: ["star", "ask", "sitelinks"],
    volume: "2,700",
    url: "/serp-analysis",
  },
  {
    keyword: "SEO reporting",
    position: 25,
    features: ["ask", "images"],
    volume: "2,500",
    url: "/seo-reporting",
  },
  {
    keyword: "SEO ranking",
    position: 22,
    features: ["star", "ask", "map"],
    volume: "2,400",
    url: "/seo-ranking",
  },
  {
    keyword: "search engine optimization",
    position: 27,
    features: ["ask", "images", "videos"],
    volume: "2,200",
    url: "/search-engine-optimization",
  },
  {
    keyword: "SERP features",
    position: 12,
    features: ["star", "ask", "images", "sitelinks"],
    volume: "2,000",
    url: "/serp-features",
  },
  {
    keyword: "SEO strategy",
    position: 16,
    features: ["star", "ask", "map"],
    volume: "1,900",
    url: "/seo-strategy",
  },
  {
    keyword: "SEO optimization",
    position: 18,
    features: ["star", "images", "videos"],
    volume: "1,800",
    url: "/seo-optimization",
  },
];

/* =========================================================
   FEATURE ICONS
========================================================= */

const FEATURE_ICON = {
  star: {
    icon: Star,
    color: "text-amber-500",
  },

  ask: {
    icon: HelpCircle,
    color: "text-red-500",
  },

  images: {
    icon: ImageIcon,
    color: "text-purple-500",
  },

  map: {
    icon: MapPin,
    color: "text-blue-500",
  },

  videos: {
    icon: Video,
    color: "text-red-500",
  },

  sitelinks: {
    icon: Link2,
    color: "text-slate-500",
  },
};

/* =========================================================
   COLORS
========================================================= */

const FEATURE_COLORS = {
  "Featured Snippet": "#22c55e",
  "People Also Ask": "#a855f7",
  "Local Pack": "#3b82f6",
  Images: "#f59e0b",
  Videos: "#ef4444",
  Sitelinks: "#94a3b8",
  Other: "#d1d5db",
};

/* =========================================================
   GET FEATURE NAME
========================================================= */

const getFeatureName = (key) => {
  const names = {
    star: "Featured Snippet",
    ask: "People Also Ask",
    map: "Local Pack",
    images: "Images",
    videos: "Videos",
    sitelinks: "Sitelinks",
  };

  return names[key] || "Other";
};

/* =========================================================
   DETERMINISTIC SEED
========================================================= */

const getSeed = (text = "") => {
  return text
    .split("")
    .reduce(
      (total, char, index) =>
        total +
        char.charCodeAt(0) *
          (index + 1),
      0
    );
};

/* =========================================================
   GENERATE DYNAMIC TREND
========================================================= */

const createTrendData = (
  selectedKeyword,
  range
) => {
  const seed = getSeed(
    selectedKeyword?.keyword || "seo"
  );

  let points = 7;

  if (range === "Last 30 days") {
    points = 10;
  }

  if (range === "Last 90 days") {
    points = 15;
  }

  const data = [];

  let featured =
    15 + (seed % 15);

  let peopleAlso =
    10 + (seed % 12);

  let localPack =
    6 + (seed % 10);

  for (let i = 0; i < points; i++) {
    const featuredChange =
      ((seed + i * 13) % 9) - 3;

    const peopleChange =
      ((seed + i * 17) % 7) - 2;

    const localChange =
      ((seed + i * 19) % 6) - 2;

    featured +=
      featuredChange +
      (i % 3 === 0 ? 2 : 0);

    peopleAlso +=
      peopleChange +
      (i % 4 === 0 ? 2 : 0);

    localPack +=
      localChange +
      (i % 5 === 0 ? 1 : 0);

    let day;

    if (range === "Last 7 days") {
      day = `Day ${i + 1}`;
    } else if (
      range === "Last 30 days"
    ) {
      day = `Day ${(i + 1) * 3}`;
    } else {
      day = `Day ${(i + 1) * 6}`;
    }

    data.push({
      day,
      featured: Math.max(
        5,
        Math.min(100, featured)
      ),
      peopleAlso: Math.max(
        4,
        Math.min(100, peopleAlso)
      ),
      localPack: Math.max(
        3,
        Math.min(100, localPack)
      ),
    });
  }

  return data;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SerpFeatures() {
  /* =======================================================
     STATES
  ======================================================= */

  const [keywords] =
    useState(INITIAL_KEYWORDS);

  const [search, setSearch] =
    useState("");

  const [selectedKeyword, setSelectedKeyword] =
    useState(INITIAL_KEYWORDS[0]);

  const [trendRange, setTrendRange] =
    useState("Last 30 days");

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [menuKeyword, setMenuKeyword] =
    useState(null);

  /* =======================================================
     FILTERED KEYWORDS
  ======================================================= */

  const filteredKeywords =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      if (!value) {
        return keywords;
      }

      return keywords.filter(
        (row) =>
          row.keyword
            .toLowerCase()
            .includes(value) ||
          row.url
            .toLowerCase()
            .includes(value)
      );
    }, [keywords, search]);

  /* =======================================================
     DYNAMIC FEATURE COUNTS
  ======================================================= */

  const featureCounts = useMemo(() => {
    const counts = {
      "Featured Snippet": 0,
      "People Also Ask": 0,
      "Local Pack": 0,
      Images: 0,
      Videos: 0,
      Sitelinks: 0,
    };

    keywords.forEach((row) => {
      row.features.forEach(
        (feature) => {
          const name =
            getFeatureName(feature);

          if (counts[name] !== undefined) {
            counts[name]++;
          }
        }
      );
    });

    return counts;
  }, [keywords]);

  /* =======================================================
     DYNAMIC TOTAL FEATURES
  ======================================================= */

  const totalFeatures = useMemo(() => {
    return keywords.reduce(
      (total, row) =>
        total + row.features.length,
      0
    );
  }, [keywords]);

  /* =======================================================
     DYNAMIC STAT CARDS
  ======================================================= */

  const statCards = useMemo(() => {
    const featured =
      featureCounts[
        "Featured Snippet"
      ];

    const peopleAlso =
      featureCounts[
        "People Also Ask"
      ];

    const localPack =
      featureCounts["Local Pack"];

    return [
      {
        label: "Total SERP Features",
        value: totalFeatures,
        change: `${Math.min(
          30,
          10 + keywords.length
        )}%`,
        icon: Star,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },

      {
        label: "Featured Snippets",
        value: featured,
        change: `${Math.min(
          30,
          featured + 8
        )}%`,
        icon: MessageSquareQuote,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
      },

      {
        label: "People Also Ask",
        value: peopleAlso,
        change: `${Math.min(
          30,
          peopleAlso + 6
        )}%`,
        icon: HelpCircle,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      },

      {
        label: "Local Pack",
        value: localPack,
        change: `${Math.min(
          30,
          localPack + 5
        )}%`,
        icon: MapPin,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
    ];
  }, [
    featureCounts,
    keywords,
    totalFeatures,
  ]);

  /* =======================================================
     DYNAMIC PIE DATA
  ======================================================= */

  const distributionData =
    useMemo(() => {
      const usedFeatureCount =
        Object.values(
          featureCounts
        ).reduce(
          (total, value) =>
            total + value,
          0
        );

      const other = Math.max(
        1,
        Math.round(
          usedFeatureCount * 0.08
        )
      );

      const rawData = [
        {
          name: "Featured Snippet",
          value:
            featureCounts[
              "Featured Snippet"
            ],
        },

        {
          name: "People Also Ask",
          value:
            featureCounts[
              "People Also Ask"
            ],
        },

        {
          name: "Local Pack",
          value:
            featureCounts[
              "Local Pack"
            ],
        },

        {
          name: "Images",
          value:
            featureCounts.Images,
        },

        {
          name: "Videos",
          value:
            featureCounts.Videos,
        },

        {
          name: "Sitelinks",
          value:
            featureCounts.Sitelinks,
        },

        {
          name: "Other",
          value: other,
        },
      ];

      const total = rawData.reduce(
        (sum, item) =>
          sum + item.value,
        0
      );

      return rawData.map((item) => ({
        ...item,
        percent:
          total > 0
            ? Math.round(
                (item.value / total) *
                  100
              )
            : 0,
        color:
          FEATURE_COLORS[item.name],
      }));
    }, [featureCounts]);

  /* =======================================================
     DYNAMIC TREND
  ======================================================= */

  const trendData = useMemo(() => {
    return createTrendData(
      selectedKeyword,
      trendRange
    );
  }, [
    selectedKeyword,
    trendRange,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

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

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);

    const firstMatch =
      keywords.find((row) =>
        row.keyword
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

  /* =======================================================
     PAGE SIZE
  ======================================================= */

  const handlePageSize = (value) => {
    setPageSize(
      Number(value)
    );
    setPage(1);
  };

  /* =======================================================
     SELECT ALL
  ======================================================= */

  const handleSelectAll = (
    checked
  ) => {
    if (checked) {
      setSelectedRows(
        paginatedKeywords.map(
          (row) =>
            row.keyword
        )
      );
    } else {
      setSelectedRows([]);
    }
  };

  /* =======================================================
     SELECT ROW
  ======================================================= */

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

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  const handleExport = () => {
    const headers = [
      "Keyword",
      "Position",
      "SERP Features",
      "Search Volume",
      "URL",
    ];

    const dataRows =
      filteredKeywords.map(
        (row) => [
          row.keyword,
          row.position,
          row.features
            .map(getFeatureName)
            .join(" | "),
          row.volume,
          row.url,
        ]
      );

    const csv = [
      headers,
      ...dataRows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
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
      "serp-features.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =======================================================
     PAGE CHANGE
  ======================================================= */

  const goToPage = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      setPage(newPage);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-xl ${card.iconBg} p-2.5`}
                >
                  <Icon
                    className={`h-5 w-5 ${card.iconColor}`}
                  />
                </div>

                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  ↑ {card.change}
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-gray-500">
                {card.label}
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* =================================================
          DISTRIBUTION + TREND
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* =================================================
            PIE CHART
        ================================================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                SERP Feature Distribution
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-400">
                Distribution based on tracked keywords
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-6">
            <div className="relative h-40 w-40 shrink-0">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={distributionData}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={1}
                  >
                    {distributionData.map(
                      (entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            entry.color
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(
                      value,
                      name
                    ) => [
                      value,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-900">
                  {totalFeatures}
                </span>

                <span className="text-xs font-medium text-gray-400">
                  Features
                </span>
              </div>
            </div>

            <ul className="flex-1 space-y-2">
              {distributionData.map(
                (item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 font-medium text-gray-600">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
                        }}
                      />

                      {item.name}
                    </span>

                    <span className="font-bold text-gray-900">
                      {item.percent}%
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* =================================================
            TREND GRAPH
        ================================================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Feature Visibility Trend
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-400">
                {selectedKeyword.keyword}
              </p>
            </div>

            <select
              value={trendRange}
              onChange={(e) =>
                setTrendRange(
                  e.target.value
                )
              }
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 outline-none focus:border-green-500"
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

          <div className="mt-4 h-48">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={trendData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border:
                      "1px solid #e5e7eb",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                />

                {/* FEATURED SNIPPET */}

                <Line
                  type="monotone"
                  dataKey="featured"
                  name="Featured Snippet"
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

                {/* PEOPLE ALSO ASK */}

                <Line
                  type="monotone"
                  dataKey="peopleAlso"
                  name="People Also Ask"
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

                {/* LOCAL PACK */}

                <Line
                  type="monotone"
                  dataKey="localPack"
                  name="Local Pack"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{
                    r: 3,
                    fill: "#ef4444",
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

          {/* LEGEND */}

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-green-500" />
              Featured Snippet
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-blue-400" />
              People Also Ask
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-red-400" />
              Local Pack
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
          KEYWORD TABLE
      ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* TABLE HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Keywords with SERP Features (
              {filteredKeywords.length} results)
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-400">
              Click a keyword to update
              the graph.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* SEARCH */}

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                placeholder="Search keyword..."
                className="w-40 text-sm font-medium text-gray-600 focus:outline-none"
              />
            </div>

            {/* EXPORT */}

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />

              Export
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="w-8 pb-3 pr-2">
                  <input
                    type="checkbox"
                    checked={
                      paginatedKeywords.length >
                        0 &&
                      paginatedKeywords.every(
                        (row) =>
                          selectedRows.includes(
                            row.keyword
                          )
                      )
                    }
                    onChange={(e) =>
                      handleSelectAll(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-green-600"
                  />
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Keyword
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Position
                </th>

                <th className="pb-3 pr-4 font-bold">
                  SERP Features
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Search Volume
                </th>

                <th className="pb-3 pr-4 font-bold">
                  URL
                </th>

                <th className="pb-3 font-bold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {paginatedKeywords.map(
                (row) => {
                  const isSelected =
                    selectedKeyword.keyword ===
                    row.keyword;

                  const isChecked =
                    selectedRows.includes(
                      row.keyword
                    );

                  return (
                    <tr
                      key={row.keyword}
                      onClick={() =>
                        setSelectedKeyword(
                          row
                        )
                      }
                      className={`cursor-pointer text-gray-700 transition ${
                        isSelected
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* CHECKBOX */}

                      <td
                        className="py-3 pr-2"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectRow(
                              row.keyword,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 accent-green-600"
                        />
                      </td>

                      {/* KEYWORD */}

                      <td className="py-3 pr-4">
                        <span className="font-bold text-gray-900">
                          {row.keyword}
                        </span>

                        {isSelected && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                            Selected
                          </span>
                        )}
                      </td>

                      {/* POSITION */}

                      <td className="py-3 pr-4">
                        <span className="font-bold text-gray-900">
                          {row.position}
                        </span>
                      </td>

                      {/* SERP FEATURES */}

                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-1.5">
                          {row.features.map(
                            (
                              key,
                              index
                            ) => {
                              const feature =
                                FEATURE_ICON[
                                  key
                                ];

                              if (
                                !feature
                              ) {
                                return null;
                              }

                              const FIcon =
                                feature.icon;

                              return (
                                <div
                                  key={`${key}-${index}`}
                                  title={getFeatureName(
                                    key
                                  )}
                                  className="rounded-md p-1 hover:bg-gray-100"
                                >
                                  <FIcon
                                    className={`h-4 w-4 ${feature.color}`}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </td>

                      {/* VOLUME */}

                      <td className="py-3 pr-4 font-semibold text-gray-700">
                        {row.volume}
                      </td>

                      {/* URL */}

                      <td className="max-w-[220px] py-3 pr-4">
                        <span className="block truncate font-medium text-blue-600">
                          {row.url}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td
                        className="relative py-3"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <button
                          onClick={() =>
                            setMenuKeyword(
                              menuKeyword ===
                                row.keyword
                                ? null
                                : row.keyword
                            )
                          }
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {menuKeyword ===
                          row.keyword && (
                          <div className="absolute right-0 top-10 z-30 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                            <button
                              onClick={() => {
                                setSelectedKeyword(
                                  row
                                );

                                setMenuKeyword(
                                  null
                                );
                              }}
                              className="block w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              View Trend
                            </button>

                            <button
                              onClick={() =>
                                setMenuKeyword(
                                  null
                                )
                              }
                              className="block w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
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

              {/* EMPTY */}

              {paginatedKeywords.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-10 text-center"
                  >
                    <Search className="mx-auto mb-2 h-8 w-8 text-gray-300" />

                    <p className="font-bold text-gray-700">
                      No keywords found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Try searching for
                      another keyword.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Show

            <select
              value={pageSize}
              onChange={(e) =>
                handlePageSize(
                  e.target.value
                )
              }
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 font-semibold outline-none"
            >
              <option value="10">
                10
              </option>

              <option value="25">
                25
              </option>

              <option value="50">
                50
              </option>
            </select>

            per page
          </div>

          <div className="flex items-center gap-1 text-sm">
            {/* PREVIOUS */}

            <button
              disabled={safePage === 1}
              onClick={() =>
                goToPage(
                  safePage - 1
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft
                size={16}
              />
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: Math.min(
                  totalPages,
                  5
                ),
              },
              (_, index) =>
                index + 1
            ).map((number) => (
              <button
                key={number}
                onClick={() =>
                  goToPage(number)
                }
                className={`h-7 w-7 rounded-lg font-medium ${
                  number === safePage
                    ? "bg-green-600 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}

            {totalPages > 5 && (
              <>
                <span className="px-1 text-gray-400">
                  ...
                </span>

                <button
                  onClick={() =>
                    goToPage(
                      totalPages
                    )
                  }
                  className="h-7 w-7 rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* NEXT */}

            <button
              disabled={
                safePage === totalPages
              }
              onClick={() =>
                goToPage(
                  safePage + 1
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}