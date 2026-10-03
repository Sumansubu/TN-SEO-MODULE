import React, { useMemo, useState } from "react";

import {
  Link2,
  Trophy,
  Users,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================================
   YOUR DOMAIN DATA
   ========================================================= */

const YOUR_DATA = {
  backlinks: 3248,
  referringDomains: 842,
  dofollow: 2210,
  nofollow: 780,
};

/* =========================================================
   FRONTEND COMPETITOR DATA
   ========================================================= */

const COMPETITOR_DATA = {
  "example.com": {
    backlinks: 5762,
    referringDomains: 1340,
    dofollow: 2860,
    nofollow: 1120,
    uniqueToYou: 1120,
    uniqueToCompetitor: 3634,
    common: 2128,

    backlinksList: [
      {
        source: "https://businessinsider.com/...",
        domain: "businessinsider.com",
        anchor: "SEO software",
        type: "Dofollow",
        authority: 92,
      },
      {
        source: "https://hubspot.com/...",
        domain: "hubspot.com",
        anchor: "digital marketing",
        type: "Dofollow",
        authority: 90,
      },
      {
        source: "https://entrepreneur.com/...",
        domain: "entrepreneur.com",
        anchor: "SEO tools",
        type: "Nofollow",
        authority: 88,
      },
      {
        source: "https://moz.com/...",
        domain: "moz.com",
        anchor: "backlink tips",
        type: "Dofollow",
        authority: 85,
      },
      {
        source: "https://neilpatel.com/...",
        domain: "neilpatel.com",
        anchor: "SEO guide",
        type: "Nofollow",
        authority: 83,
      },
    ],
  },

  "ahrefs.com": {
    backlinks: 7420,
    referringDomains: 1890,
    dofollow: 4210,
    nofollow: 1840,
    uniqueToYou: 980,
    uniqueToCompetitor: 5152,
    common: 2268,

    backlinksList: [
      {
        source: "https://searchenginejournal.com/...",
        domain: "searchenginejournal.com",
        anchor: "SEO tools",
        type: "Dofollow",
        authority: 94,
      },
      {
        source: "https://searchengineland.com/...",
        domain: "searchengineland.com",
        anchor: "SEO analysis",
        type: "Dofollow",
        authority: 91,
      },
      {
        source: "https://moz.com/...",
        domain: "moz.com",
        anchor: "SEO software",
        type: "Dofollow",
        authority: 90,
      },
      {
        source: "https://semrush.com/...",
        domain: "semrush.com",
        anchor: "keyword research",
        type: "Nofollow",
        authority: 88,
      },
      {
        source: "https://backlinko.com/...",
        domain: "backlinko.com",
        anchor: "link building",
        type: "Dofollow",
        authority: 86,
      },
    ],
  },

  "semrush.com": {
    backlinks: 6890,
    referringDomains: 1650,
    dofollow: 3790,
    nofollow: 1510,
    uniqueToYou: 1050,
    uniqueToCompetitor: 4692,
    common: 2198,

    backlinksList: [
      {
        source: "https://forbes.com/...",
        domain: "forbes.com",
        anchor: "SEO platform",
        type: "Dofollow",
        authority: 95,
      },
      {
        source: "https://entrepreneur.com/...",
        domain: "entrepreneur.com",
        anchor: "SEO marketing",
        type: "Dofollow",
        authority: 89,
      },
      {
        source: "https://inc.com/...",
        domain: "inc.com",
        anchor: "digital marketing",
        type: "Dofollow",
        authority: 87,
      },
      {
        source: "https://searchenginejournal.com/...",
        domain: "searchenginejournal.com",
        anchor: "SEO analytics",
        type: "Nofollow",
        authority: 85,
      },
      {
        source: "https://neilpatel.com/...",
        domain: "neilpatel.com",
        anchor: "SEO strategy",
        type: "Dofollow",
        authority: 84,
      },
    ],
  },

  "moz.com": {
    backlinks: 5240,
    referringDomains: 1210,
    dofollow: 2730,
    nofollow: 980,
    uniqueToYou: 1260,
    uniqueToCompetitor: 3252,
    common: 1988,

    backlinksList: [
      {
        source: "https://medium.com/...",
        domain: "medium.com",
        anchor: "SEO guide",
        type: "Dofollow",
        authority: 91,
      },
      {
        source: "https://hubspot.com/...",
        domain: "hubspot.com",
        anchor: "SEO strategy",
        type: "Dofollow",
        authority: 89,
      },
      {
        source: "https://searchengineland.com/...",
        domain: "searchengineland.com",
        anchor: "SEO tools",
        type: "Nofollow",
        authority: 87,
      },
      {
        source: "https://backlinko.com/...",
        domain: "backlinko.com",
        anchor: "backlink analysis",
        type: "Dofollow",
        authority: 84,
      },
      {
        source: "https://reddit.com/...",
        domain: "reddit.com",
        anchor: "SEO discussion",
        type: "Nofollow",
        authority: 80,
      },
    ],
  },
};

/* =========================================================
   CLEAN DOMAIN
   ========================================================= */

const cleanDomain = (value) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .trim();
};

/* =========================================================
   CREATE DETERMINISTIC SEED
   ========================================================= */

const createSeed = (text) => {
  let seed = 0;

  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) % 1000000;
  }

  return Math.abs(seed);
};

/* =========================================================
   GENERATE DYNAMIC COMPETITOR DATA
   ========================================================= */

const generateCompetitorData = (domain) => {
  const seed = createSeed(domain);

  const backlinks = 4000 + (seed % 6500);

  const referringDomains = 650 + (seed % 1500);

  const dofollowPercentage =
    0.52 + seed % 20 / 100;

  const dofollow = Math.round(
    backlinks * dofollowPercentage
  );

  const nofollow = Math.round(
    backlinks * (0.14 + (seed % 8) / 100)
  );

  const common = Math.round(
    Math.min(YOUR_DATA.backlinks, backlinks) *
      (0.45 + (seed % 15) / 100)
  );

  const uniqueToYou = Math.max(
    500,
    YOUR_DATA.backlinks - common
  );

  const uniqueToCompetitor = Math.max(
    500,
    backlinks - common
  );

  /* =======================================================
     BACKLINK SOURCE DATA
     ======================================================= */

  const sourceDomains = [
    "businessinsider.com",
    "hubspot.com",
    "entrepreneur.com",
    "moz.com",
    "neilpatel.com",
    "searchenginejournal.com",
    "searchengineland.com",
    "forbes.com",
    "inc.com",
    "backlinko.com",
    "medium.com",
    "reddit.com",
    "linkedin.com",
    "github.com",
  ];

  const anchorTexts = [
    "SEO software",
    "digital marketing",
    "SEO tools",
    "backlink analysis",
    "SEO guide",
    "SEO strategy",
    "link building",
    "SEO platform",
    "keyword research",
    "SEO analytics",
    "website optimization",
    "search engine optimization",
    "SEO services",
    "backlink tips",
  ];

  const linkTypes = [
    "Dofollow",
    "Dofollow",
    "Nofollow",
    "Dofollow",
    "Nofollow",
  ];

  const backlinksList = [];

  for (let i = 0; i < 5; i++) {
    const localSeed = seed + i * 7919;

    const sourceIndex =
      localSeed % sourceDomains.length;

    const anchorIndex =
      localSeed % anchorTexts.length;

    const typeIndex =
      localSeed % linkTypes.length;

    const authority =
      75 + (localSeed % 22);

    const sourceDomain =
      sourceDomains[sourceIndex];

    backlinksList.push({
      source: `https://${sourceDomain}/...`,
      domain: sourceDomain,
      anchor: anchorTexts[anchorIndex],
      type: linkTypes[typeIndex],
      authority,
    });
  }

  return {
    backlinks,
    referringDomains,
    dofollow,
    nofollow,
    uniqueToYou,
    uniqueToCompetitor,
    common,
    backlinksList,
  };
};

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

export default function CompetitorBacklinks() {
  const [yourDomain, setYourDomain] = useState(
    "tn-seo-module.web.app"
  );

  const [competitorDomain, setCompetitorDomain] =
    useState("example.com");

  const [activeCompetitor, setActiveCompetitor] =
    useState("example.com");

  /* =========================================================
     COMPARE FUNCTION
     ========================================================= */

  const handleCompare = () => {
    const cleanedDomain =
      cleanDomain(competitorDomain);

    if (!cleanedDomain) {
      return;
    }

    setCompetitorDomain(cleanedDomain);
    setActiveCompetitor(cleanedDomain);
  };

  /* =========================================================
     GET COMPETITOR DATA
     ========================================================= */

  const currentCompetitor = useMemo(() => {
    if (COMPETITOR_DATA[activeCompetitor]) {
      return COMPETITOR_DATA[activeCompetitor];
    }

    return generateCompetitorData(
      activeCompetitor
    );
  }, [activeCompetitor]);

  /* =========================================================
     SUMMARY CARDS
     ========================================================= */

  const SUMMARY_CARDS = useMemo(
    () => [
      {
        label: "Your Backlinks",
        value:
          YOUR_DATA.backlinks.toLocaleString(),
        icon: Link2,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        label: "Competitor Backlinks",
        value:
          currentCompetitor.backlinks.toLocaleString(),
        icon: Trophy,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
      },
      {
        label: "Unique to You",
        value:
          currentCompetitor.uniqueToYou.toLocaleString(),
        icon: Users,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-600",
      },
      {
        label: "Unique to Competitor",
        value:
          currentCompetitor.uniqueToCompetitor.toLocaleString(),
        icon: CheckCircle2,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
      },
    ],
    [currentCompetitor]
  );

  /* =========================================================
     DYNAMIC COMPARISON DATA
     ========================================================= */

  const comparisonData = useMemo(
    () => [
      {
        metric: "Total Backlinks",
        you: YOUR_DATA.backlinks,
        competitor: currentCompetitor.backlinks,
      },
      {
        metric: "Referring Domains",
        you: YOUR_DATA.referringDomains,
        competitor:
          currentCompetitor.referringDomains,
      },
      {
        metric: "Dofollow Links",
        you: YOUR_DATA.dofollow,
        competitor: currentCompetitor.dofollow,
      },
      {
        metric: "Nofollow Links",
        you: YOUR_DATA.nofollow,
        competitor: currentCompetitor.nofollow,
      },
    ],
    [currentCompetitor]
  );

  /* =========================================================
     DYNAMIC OVERLAP DATA
     ========================================================= */

  const overlapData = useMemo(
    () => [
      {
        name: "Unique to You",
        value: currentCompetitor.uniqueToYou,
        color: "#3b82f6",
      },
      {
        name: "Common",
        value: currentCompetitor.common,
        color: "#22c55e",
      },
      {
        name: "Unique to Competitor",
        value:
          currentCompetitor.uniqueToCompetitor,
        color: "#ef4444",
      },
    ],
    [currentCompetitor]
  );

  return (
    <div className="space-y-6">

      {/* =====================================================
          DOMAIN COMPARE BAR
          ===================================================== */}

      <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">

        {/* YOUR DOMAIN */}

        <div className="flex-1">
          <label className="mb-1 block text-xs font-bold text-gray-700">
            Your Domain
          </label>

          <input
            value={yourDomain}
            onChange={(e) =>
              setYourDomain(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
            placeholder="Enter your domain"
          />
        </div>

        {/* VS */}

        <span className="px-2 text-sm font-bold text-gray-700">
          vs
        </span>

        {/* COMPETITOR DOMAIN */}

        <div className="flex-1">
          <label className="mb-1 block text-xs font-bold text-gray-700">
            Competitor Domain
          </label>

          <input
            value={competitorDomain}
            onChange={(e) =>
              setCompetitorDomain(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCompare();
              }
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
            placeholder="Enter competitor domain"
          />
        </div>

        {/* COMPARE BUTTON */}

        <button
          type="button"
          onClick={handleCompare}
          className="mt-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700 sm:mt-6"
        >
          Compare →
        </button>

      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {SUMMARY_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >

              <div
                className={`inline-flex rounded-xl ${card.iconBg} p-2.5`}
              >
                <Icon
                  className={`h-5 w-5 ${card.iconColor}`}
                />
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
          COMPARISON CHART + OVERLAP DONUT
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* ===================================================
            BACKLINKS COMPARISON
            =================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <h3 className="text-base font-bold text-gray-950">
              Backlinks Comparison
            </h3>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Your Domain
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                Competitor
              </span>

            </div>

          </div>

          <div className="mt-4 h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={comparisonData}>

                <XAxis
                  dataKey="metric"
                  tick={{
                    fontSize: 11,
                    fill: "#374151",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                  height={50}
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

                <Bar
                  dataKey="you"
                  name="Your Domain"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />

                <Bar
                  dataKey="competitor"
                  name="Competitor"
                  fill="#60a5fa"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ===================================================
            COMMON VS UNIQUE LINKS
            =================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <h3 className="text-base font-bold text-gray-950">
            Common vs Unique Links
          </h3>

          {/* Slightly smaller chart so labels remain visible */}

          <div className="mt-2 flex h-60 items-center justify-center">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={overlapData}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={72}
                  paddingAngle={2}
                  label={({ value }) =>
                    value.toLocaleString()
                  }
                  labelLine={false}
                >

                  {overlapData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}

                </Pie>

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: 12,
                    color: "#374151",
                    fontWeight: 600,
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* =====================================================
          TOP COMPETITOR BACKLINKS TABLE
          ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="text-base font-bold text-gray-950">
            Top Competitor Backlinks
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
                  Authority
                </th>

                <th className="pb-3 font-bold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {currentCompetitor.backlinksList.map(
                (row, i) => (

                  <tr
                    key={`${row.domain}-${i}`}
                    className="text-gray-900"
                  >

                    <td className="py-3 pr-4 font-semibold text-gray-700">
                      {i + 1}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-blue-700">
                      {row.source}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-gray-950">
                      {row.domain}
                    </td>

                    <td className="py-3 pr-4 font-semibold text-gray-950">
                      {row.anchor}
                    </td>

                    <td className="py-3 pr-4">
                      <LinkTypeBadge
                        type={row.type}
                      />
                    </td>

                    <td className="py-3 pr-4 font-bold text-gray-950">
                      {row.authority}
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

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}