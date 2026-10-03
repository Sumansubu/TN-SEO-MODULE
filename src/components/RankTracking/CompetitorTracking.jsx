import React, { useMemo, useState } from "react";

import {
  Gauge,
  Users2,
  Link2,
  Star,
  Search,
  Download,
  Plus,
  MoreHorizontal,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =========================================================
   INITIAL COMPETITORS
========================================================= */

const INITIAL_COMPETITORS = [
  {
    domain: "example.com",
    visibility: 42,
    keywords: 326,
    top3: 65,
    top10: 82,
    top50: 90,
  },
  {
    domain: "competitor1.com",
    visibility: 38,
    keywords: 298,
    top3: 58,
    top10: 76,
    top50: 87,
  },
  {
    domain: "competitor2.com",
    visibility: 24,
    keywords: 185,
    top3: 40,
    top10: 55,
    top50: 78,
  },
  {
    domain: "competitor3.com",
    visibility: 18,
    keywords: 124,
    top3: 30,
    top10: 47,
    top50: 68,
  },
  {
    domain: "competitor4.com",
    visibility: 12,
    keywords: 96,
    top3: 22,
    top10: 38,
    top50: 55,
  },
];

/* =========================================================
   INITIAL KEYWORDS
========================================================= */

const INITIAL_COMPARISON = [
  {
    keyword: "SEO services",
    you: 3,
    comp1: 1,
    comp2: 5,
    comp3: 8,
    volume: "12,000",
  },
  {
    keyword: "AI SEO tool",
    you: 8,
    comp1: 4,
    comp2: 6,
    comp3: 12,
    volume: "8,000",
  },
  {
    keyword: "digital marketing",
    you: 10,
    comp1: 3,
    comp2: 9,
    comp3: 15,
    volume: "22,000",
  },
  {
    keyword: "local SEO",
    you: 5,
    comp1: 2,
    comp2: 11,
    comp3: 14,
    volume: "5,400",
  },
  {
    keyword: "SEO company",
    you: 12,
    comp1: 1,
    comp2: 7,
    comp3: 10,
    volume: "18,000",
  },
  {
    keyword: "keyword research",
    you: 7,
    comp1: 5,
    comp2: 11,
    comp3: 16,
    volume: "15,000",
  },
  {
    keyword: "backlink checker",
    you: 14,
    comp1: 9,
    comp2: 17,
    comp3: 22,
    volume: "9,900",
  },
  {
    keyword: "SEO audit tool",
    you: 6,
    comp1: 8,
    comp2: 13,
    comp3: 18,
    volume: "7,500",
  },
  {
    keyword: "rank tracking",
    you: 4,
    comp1: 6,
    comp2: 10,
    comp3: 17,
    volume: "6,800",
  },
  {
    keyword: "technical SEO",
    you: 11,
    comp1: 5,
    comp2: 13,
    comp3: 20,
    volume: "6,200",
  },
  {
    keyword: "on page SEO",
    you: 9,
    comp1: 7,
    comp2: 12,
    comp3: 19,
    volume: "5,800",
  },
  {
    keyword: "competitor analysis",
    you: 18,
    comp1: 10,
    comp2: 16,
    comp3: 21,
    volume: "4,900",
  },
  {
    keyword: "SEO analytics",
    you: 15,
    comp1: 11,
    comp2: 19,
    comp3: 25,
    volume: "4,500",
  },
  {
    keyword: "Google ranking checker",
    you: 13,
    comp1: 8,
    comp2: 15,
    comp3: 20,
    volume: "4,100",
  },
  {
    keyword: "website SEO checker",
    you: 21,
    comp1: 14,
    comp2: 19,
    comp3: 27,
    volume: "3,800",
  },
  {
    keyword: "local SEO services",
    you: 16,
    comp1: 9,
    comp2: 18,
    comp3: 23,
    volume: "3,500",
  },
  {
    keyword: "SEO consultant",
    you: 19,
    comp1: 12,
    comp2: 21,
    comp3: 28,
    volume: "3,200",
  },
  {
    keyword: "SEO marketing",
    you: 23,
    comp1: 15,
    comp2: 20,
    comp3: 30,
    volume: "3,000",
  },
  {
    keyword: "free SEO tools",
    you: 17,
    comp1: 6,
    comp2: 14,
    comp3: 24,
    volume: "2,900",
  },
  {
    keyword: "SERP analysis",
    you: 20,
    comp1: 13,
    comp2: 18,
    comp3: 26,
    volume: "2,700",
  },
];

/* =========================================================
   CREATE DYNAMIC SEED
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
   CREATE COMPETITOR DATA
========================================================= */

const createCompetitor = (
  domain,
  index
) => {
  const seed = getSeed(domain);

  const visibility =
    15 + (seed % 35);

  const keywordCount =
    80 + (seed % 280);

  const top3 =
    20 + (seed % 50);

  const top10 =
    Math.min(
      95,
      top3 + 10 + (seed % 15)
    );

  const top50 =
    Math.min(
      99,
      top10 + 10 + (seed % 15)
    );

  return {
    domain,
    visibility,
    keywords:
      keywordCount + index * 5,
    top3,
    top10,
    top50,
  };
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CompetitorTracking() {
  /* =======================================================
     STATES
  ======================================================= */

  const [competitors, setCompetitors] =
    useState(
      INITIAL_COMPETITORS
    );

  const [comparison, setComparison] =
    useState(
      INITIAL_COMPARISON
    );

  const [selectedCompetitor, setSelectedCompetitor] =
    useState(
      INITIAL_COMPETITORS[0]
    );

  const [competitorSearch, setCompetitorSearch] =
    useState("");

  const [keywordSearch, setKeywordSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [showAddCompetitor, setShowAddCompetitor] =
    useState(false);

  const [newDomain, setNewDomain] =
    useState("");

  const [menuDomain, setMenuDomain] =
    useState(null);

  /* =======================================================
     CURRENT COMPETITOR
  ======================================================= */

  const currentCompetitor =
    useMemo(() => {
      return (
        competitors.find(
          (item) =>
            item.domain ===
            selectedCompetitor?.domain
        ) ||
        competitors[0]
      );
    }, [
      competitors,
      selectedCompetitor,
    ]);

  /* =======================================================
     YOUR DATA
  ======================================================= */

  const yourStats = useMemo(() => {
    const positions =
      comparison.map(
        (row) => row.you
      );

    const average =
      positions.length
        ? positions.reduce(
            (sum, value) =>
              sum + value,
            0
          ) / positions.length
        : 0;

    const top3 =
      positions.filter(
        (position) =>
          position <= 3
      ).length;

    const top10 =
      positions.filter(
        (position) =>
          position <= 10
      ).length;

    const top50 =
      positions.filter(
        (position) =>
          position <= 50
      ).length;

    return {
      average: average.toFixed(1),
      top3,
      top10,
      top50,
    };
  }, [comparison]);

  /* =======================================================
     COMPETITOR AVERAGE POSITION
  ======================================================= */

  const competitorAverage =
    useMemo(() => {
      if (!comparison.length) {
        return 0;
      }

      const values =
        comparison.map(
          (row) =>
            row.comp1
        );

      const average =
        values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / values.length;

      return average.toFixed(1);
    }, [comparison]);

  /* =======================================================
     SHARED KEYWORDS
  ======================================================= */

  const sharedKeywords =
    useMemo(() => {
      return comparison.filter(
        (row) =>
          row.you <= 50 &&
          row.comp1 <= 50
      ).length;
    }, [comparison]);

  /* =======================================================
     UNIQUE KEYWORDS
  ======================================================= */

  const uniqueToYou =
    useMemo(() => {
      return comparison.filter(
        (row) =>
          row.you <= 50 &&
          row.comp1 > 50
      ).length;
    }, [comparison]);

  /* =======================================================
     STAT CARDS
  ======================================================= */

  const statCards = [
    {
      label: "Your Avg. Position",
      value: yourStats.average,
      change: "3.6",
      icon: Gauge,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },

    {
      label: "Competitor Avg. Position",
      value: competitorAverage,
      change: "4.2",
      icon: Users2,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },

    {
      label: "Shared Keywords",
      value: sharedKeywords,
      icon: Link2,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
    },

    {
      label: "Unique to You",
      value: uniqueToYou,
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];

  /* =======================================================
     VISIBILITY GRAPH
  ======================================================= */

  const visibilityData =
    useMemo(() => {
      if (!currentCompetitor) {
        return [];
      }

      return [
        {
          bucket: "Top 3",
          you: yourStats.top3,
          competitor:
            currentCompetitor.top3,
        },

        {
          bucket: "Top 10",
          you: yourStats.top10,
          competitor:
            currentCompetitor.top10,
        },

        {
          bucket: "Top 50",
          you: yourStats.top50,
          competitor:
            currentCompetitor.top50,
        },
      ];
    }, [
      currentCompetitor,
      yourStats,
    ]);

  /* =======================================================
     FILTER COMPETITORS
  ======================================================= */

  const filteredCompetitors =
    useMemo(() => {
      const value =
        competitorSearch
          .trim()
          .toLowerCase();

      if (!value) {
        return competitors;
      }

      return competitors.filter(
        (item) =>
          item.domain
            .toLowerCase()
            .includes(value)
      );
    }, [
      competitors,
      competitorSearch,
    ]);

  /* =======================================================
     FILTER KEYWORDS
  ======================================================= */

  const filteredComparison =
    useMemo(() => {
      const value =
        keywordSearch
          .trim()
          .toLowerCase();

      if (!value) {
        return comparison;
      }

      return comparison.filter(
        (row) =>
          row.keyword
            .toLowerCase()
            .includes(value)
      );
    }, [
      comparison,
      keywordSearch,
    ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredComparison.length /
        pageSize
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const paginatedComparison =
    useMemo(() => {
      const start =
        (safePage - 1) *
        pageSize;

      return filteredComparison.slice(
        start,
        start + pageSize
      );
    }, [
      filteredComparison,
      safePage,
      pageSize,
    ]);

  /* =======================================================
     ADD COMPETITOR
  ======================================================= */

  const handleAddCompetitor = () => {
    let domain =
      newDomain.trim().toLowerCase();

    if (!domain) {
      return;
    }

    domain = domain
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

    const alreadyExists =
      competitors.some(
        (item) =>
          item.domain === domain
      );

    if (alreadyExists) {
      return;
    }

    const newCompetitor =
      createCompetitor(
        domain,
        competitors.length
      );

    setCompetitors(
      (previous) => [
        ...previous,
        newCompetitor,
      ]
    );

    setSelectedCompetitor(
      newCompetitor
    );

    setNewDomain("");
    setShowAddCompetitor(false);
  };

  /* =======================================================
     REMOVE COMPETITOR
  ======================================================= */

  const handleRemoveCompetitor = (
    domain
  ) => {
    if (competitors.length <= 1) {
      return;
    }

    const updated =
      competitors.filter(
        (item) =>
          item.domain !== domain
      );

    setCompetitors(updated);

    if (
      selectedCompetitor?.domain ===
      domain
    ) {
      setSelectedCompetitor(
        updated[0]
      );
    }

    setMenuDomain(null);
  };

  /* =======================================================
     SELECT ALL KEYWORDS
  ======================================================= */

  const handleSelectAll = (
    checked
  ) => {
    if (checked) {
      setSelectedRows(
        paginatedComparison.map(
          (row) =>
            row.keyword
        )
      );
    } else {
      setSelectedRows([]);
    }
  };

  /* =======================================================
     SELECT KEYWORD
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
      "Your Position",
      "Competitor 1",
      "Competitor 2",
      "Competitor 3",
      "Search Volume",
    ];

    const rows =
      filteredComparison.map(
        (row) => [
          row.keyword,
          row.you,
          row.comp1,
          row.comp2,
          row.comp3,
          row.volume,
        ]
      );

    const csv = [
      headers,
      ...rows,
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
      "competitor-comparison.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =======================================================
     PAGE SIZE
  ======================================================= */

  const handlePageSize = (
    value
  ) => {
    setPageSize(
      Number(value)
    );

    setPage(1);
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

                {card.change && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    ↑ {card.change}
                  </span>
                )}
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
          VISIBILITY + TOP COMPETITORS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* =================================================
            VISIBILITY COMPARISON
        ================================================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-gray-900">
              Visibility Comparison
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                You
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                {currentCompetitor?.domain ||
                  "Competitor"}
              </span>
            </div>
          </div>

          {/* SELECTED COMPETITOR */}

          <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-xs font-medium text-gray-500">
              Comparing with
            </span>

            <select
              value={
                currentCompetitor?.domain ||
                ""
              }
              onChange={(e) => {
                const selected =
                  competitors.find(
                    (item) =>
                      item.domain ===
                      e.target.value
                  );

                if (selected) {
                  setSelectedCompetitor(
                    selected
                  );
                }
              }}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 outline-none"
            >
              {competitors.map(
                (competitor) => (
                  <option
                    key={
                      competitor.domain
                    }
                  >
                    {competitor.domain}
                  </option>
                )
              )}
            </select>
          </div>

          {/* GRAPH */}

          <div className="mt-4 h-56">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={visibilityData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="bucket"
                  tick={{
                    fontSize: 12,
                    fill: "#9ca3af",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: "#9ca3af",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius:
                      "10px",
                    border:
                      "1px solid #e5e7eb",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                />

                {/* YOU */}

                <Bar
                  dataKey="you"
                  name="You"
                  fill="#22c55e"
                  radius={[
                    4,
                    4,
                    0,
                    0,
                  ]}
                  barSize={22}
                  isAnimationActive={true}
                  animationDuration={600}
                />

                {/* COMPETITOR */}

                <Bar
                  dataKey="competitor"
                  name={
                    currentCompetitor?.domain ||
                    "Competitor"
                  }
                  fill="#60a5fa"
                  radius={[
                    4,
                    4,
                    0,
                    0,
                  ]}
                  barSize={22}
                  isAnimationActive={true}
                  animationDuration={600}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* =================================================
            TOP COMPETITORS
        ================================================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-gray-900">
              Top Competitors
            </h3>

            <button
              onClick={() =>
                setShowAddCompetitor(
                  true
                )
              }
              className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Plus size={15} />
              Add
            </button>
          </div>

          {/* SEARCH */}

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search
              size={16}
              className="text-gray-400"
            />

            <input
              value={competitorSearch}
              onChange={(e) =>
                setCompetitorSearch(
                  e.target.value
                )
              }
              placeholder="Search competitor..."
              className="w-full text-sm font-medium text-gray-600 outline-none"
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-gray-400">
                  <th className="pb-3 pr-4 font-bold">
                    #
                  </th>

                  <th className="pb-3 pr-4 font-bold">
                    Domain
                  </th>

                  <th className="pb-3 pr-4 font-bold">
                    Visibility
                  </th>

                  <th className="pb-3 pr-4 font-bold">
                    Keywords
                  </th>

                  <th className="pb-3 font-bold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredCompetitors.map(
                  (row, i) => {
                    const isSelected =
                      currentCompetitor?.domain ===
                      row.domain;

                    return (
                      <tr
                        key={row.domain}
                        onClick={() =>
                          setSelectedCompetitor(
                            row
                          )
                        }
                        className={`cursor-pointer text-gray-700 transition ${
                          isSelected
                            ? "bg-green-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="py-3 pr-4 font-medium text-gray-400">
                          {i + 1}
                        </td>

                        <td className="py-3 pr-4">
                          <span className="font-semibold text-gray-900">
                            {row.domain}
                          </span>

                          {isSelected && (
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                              Selected
                            </span>
                          )}
                        </td>

                        <td className="py-3 pr-4 font-bold text-gray-900">
                          {row.visibility}%
                        </td>

                        <td className="py-3 pr-4">
                          {row.keywords}
                        </td>

                        <td
                          className="relative py-3"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          <button
                            onClick={() =>
                              setMenuDomain(
                                menuDomain ===
                                  row.domain
                                  ? null
                                  : row.domain
                              )
                            }
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
                          >
                            <MoreHorizontal
                              size={17}
                            />
                          </button>

                          {menuDomain ===
                            row.domain && (
                            <div className="absolute right-0 top-9 z-20 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                              <button
                                onClick={() => {
                                  setSelectedCompetitor(
                                    row
                                  );
                                  setMenuDomain(
                                    null
                                  );
                                }}
                                className="block w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                              >
                                View
                              </button>

                              <button
                                onClick={() =>
                                  handleRemoveCompetitor(
                                    row.domain
                                  )
                                }
                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                              >
                                <Trash2
                                  size={14}
                                />
                                Remove
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}

                {filteredCompetitors.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-sm font-medium text-gray-400"
                    >
                      No competitors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =================================================
          KEYWORD COMPARISON
      ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Keyword Comparison
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-400">
              Compare your keyword positions
              with competitors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* SEARCH */}

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
              <Search
                size={15}
                className="text-gray-400"
              />

              <input
                value={keywordSearch}
                onChange={(e) => {
                  setKeywordSearch(
                    e.target.value
                  );
                  setPage(1);
                }}
                placeholder="Search keyword..."
                className="w-40 text-sm font-medium text-gray-600 outline-none"
              />
            </div>

            {/* EXPORT */}

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="w-8 pb-3 pr-2">
                  <input
                    type="checkbox"
                    checked={
                      paginatedComparison.length >
                        0 &&
                      paginatedComparison.every(
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
                  You ▾
                </th>

                <th className="pb-3 pr-4 font-bold">
                  competitor1.com
                </th>

                <th className="pb-3 pr-4 font-bold">
                  competitor2.com
                </th>

                <th className="pb-3 pr-4 font-bold">
                  competitor3.com
                </th>

                <th className="pb-3 font-bold">
                  Search Volume
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {paginatedComparison.map(
                (row) => (
                  <tr
                    key={row.keyword}
                    className="text-gray-700 transition hover:bg-gray-50"
                  >
                    {/* CHECKBOX */}

                    <td className="py-3 pr-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(
                          row.keyword
                        )}
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

                    <td className="py-3 pr-4 font-bold text-gray-900">
                      {row.keyword}
                    </td>

                    {/* YOU */}

                    <td className="py-3 pr-4 font-bold text-green-600">
                      {row.you}
                    </td>

                    {/* COMPETITOR 1 */}

                    <td className="py-3 pr-4 font-semibold">
                      {row.comp1}
                    </td>

                    {/* COMPETITOR 2 */}

                    <td className="py-3 pr-4 font-semibold">
                      {row.comp2}
                    </td>

                    {/* COMPETITOR 3 */}

                    <td className="py-3 pr-4 font-semibold">
                      {row.comp3}
                    </td>

                    {/* VOLUME */}

                    <td className="py-3 font-semibold">
                      {row.volume}
                    </td>
                  </tr>
                )
              )}

              {paginatedComparison.length ===
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
              className="rounded-lg border border-gray-200 px-2 py-1 font-semibold outline-none"
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

      {/* =================================================
          ADD COMPETITOR MODAL
      ================================================= */}

      {showAddCompetitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Add Competitor
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Enter a competitor domain.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowAddCompetitor(
                    false
                  )
                }
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Domain
              </label>

              <input
                autoFocus
                value={newDomain}
                onChange={(e) =>
                  setNewDomain(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    handleAddCompetitor();
                  }
                }}
                placeholder="example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddCompetitor(
                    false
                  );
                  setNewDomain("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleAddCompetitor
                }
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Add Competitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}