import React, { useMemo, useState } from "react";
import { Link2, Users, Trophy, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* =========================================================
   INITIAL DATA
   ========================================================= */

const INITIAL_TOP_GAPS = [
  {
    domain: "hubspot.com",
    authority: 92,
    relevance: "High",
  },
  {
    domain: "entrepreneur.com",
    authority: 88,
    relevance: "High",
  },
  {
    domain: "neilpatel.com",
    authority: 87,
    relevance: "Medium",
  },
  {
    domain: "moz.com",
    authority: 85,
    relevance: "Medium",
  },
  {
    domain: "searchenginejournal.com",
    authority: 82,
    relevance: "High",
  },
];

/* =========================================================
   POSSIBLE DOMAINS
   ========================================================= */

const POSSIBLE_DOMAINS = [
  "hubspot.com",
  "entrepreneur.com",
  "neilpatel.com",
  "moz.com",
  "searchenginejournal.com",
  "searchengineland.com",
  "backlinko.com",
  "forbes.com",
  "medium.com",
  "techradar.com",
  "sitepoint.com",
  "w3schools.com",
  "indiehackers.com",
  "growthhackers.com",
  "semrush.com",
  "ahrefs.com",
];

/* =========================================================
   CREATE SEED
   ========================================================= */

const createSeed = (text) => {
  let seed = 0;

  for (let i = 0; i < text.length; i++) {
    seed =
      (seed * 31 + text.charCodeAt(i)) %
      1000000;
  }

  return Math.abs(seed);
};

/* =========================================================
   GENERATE DYNAMIC LINK GAP DATA
   ========================================================= */

const generateLinkGapData = (
  yourDomain,
  competitorDomain
) => {
  const yourSeed = createSeed(yourDomain);
  const competitorSeed =
    createSeed(competitorDomain);

  /*
   * Generate shared domains
   */

  const sharedDomains =
    1500 +
    ((yourSeed + competitorSeed) % 1500);

  /*
   * Generate domains unique to you
   */

  const uniqueToYou =
    700 +
    (yourSeed % 1000);

  /*
   * Generate domains unique to competitor
   */

  const uniqueToCompetitor =
    2000 +
    (competitorSeed % 2500);

  /*
   * Generate backlink values
   */

  const sharedBacklinks =
    1400 +
    ((yourSeed + competitorSeed) % 1300);

  const yourBacklinks =
    700 +
    (yourSeed % 900);

  const competitorBacklinks =
    1800 +
    (competitorSeed % 1800);

  /*
   * Generate top gap opportunities
   */

  const topGaps = [];

  for (let i = 0; i < 5; i++) {
    const localSeed =
      competitorSeed + i * 7919;

    const domainIndex =
      localSeed % POSSIBLE_DOMAINS.length;

    const domain =
      POSSIBLE_DOMAINS[domainIndex];

    const authority =
      75 + (localSeed % 22);

    let relevance;

    if (authority >= 88) {
      relevance = "High";
    } else if (authority >= 82) {
      relevance = "Medium";
    } else {
      relevance = "Low";
    }

    topGaps.push({
      domain,
      authority,
      relevance,
    });
  }

  return {
    sharedDomains,
    uniqueToYou,
    uniqueToCompetitor,
    sharedBacklinks,
    yourBacklinks,
    competitorBacklinks,
    topGaps,
  };
};

/* =========================================================
   RELEVANCE BADGE
   ========================================================= */

function RelevanceBadge({ relevance }) {
  const styles = {
    High: "bg-green-50 text-green-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[relevance]
      }`}
    >
      {relevance}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function LinkGapAnalysis() {
  /* =======================================================
     DOMAIN STATES
     ======================================================= */

  const [yourDomain, setYourDomain] = useState(
    "tn-seo-module.web.app"
  );

  const [competitorDomain, setCompetitorDomain] =
    useState("example.com");

  /* =======================================================
     LINK GAP DATA
     ======================================================= */

  const [linkGapData, setLinkGapData] =
    useState(() =>
      generateLinkGapData(
        "tn-seo-module.web.app",
        "example.com"
      )
    );

  /* =======================================================
     ANALYZE DOMAINS
     ======================================================= */

  const handleAnalyze = () => {
    const cleanedYourDomain = yourDomain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];

    const cleanedCompetitorDomain =
      competitorDomain
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split("/")[0];

    if (
      !cleanedYourDomain ||
      !cleanedCompetitorDomain
    ) {
      return;
    }

    setYourDomain(cleanedYourDomain);
    setCompetitorDomain(
      cleanedCompetitorDomain
    );

    setLinkGapData(
      generateLinkGapData(
        cleanedYourDomain,
        cleanedCompetitorDomain
      )
    );
  };

  /* =======================================================
     SUMMARY CARDS
     ======================================================= */

  const summaryCards = useMemo(
    () => [
      {
        label: "Shared Domains",
        value:
          linkGapData.sharedDomains.toLocaleString(),
        icon: Link2,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      {
        label: "Unique to You",
        value:
          linkGapData.uniqueToYou.toLocaleString(),
        icon: Users,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-500",
      },
      {
        label: "Unique to Competitor",
        value:
          linkGapData.uniqueToCompetitor.toLocaleString(),
        icon: Trophy,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      },
    ],
    [linkGapData]
  );

  /* =======================================================
     GAP CHART DATA
     ======================================================= */

  const gapData = useMemo(
    () => [
      {
        metric: "Domains",
        shared: linkGapData.sharedDomains,
        yours: linkGapData.uniqueToYou,
        competitor:
          linkGapData.uniqueToCompetitor,
      },
      {
        metric: "Backlinks",
        shared: linkGapData.sharedBacklinks,
        yours: linkGapData.yourBacklinks,
        competitor:
          linkGapData.competitorBacklinks,
      },
    ],
    [linkGapData]
  );

  return (
    <div className="space-y-6">

      {/* =====================================================
          DOMAIN INPUT
          ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

          <div className="flex-1">

            <label className="mb-1 block text-xs font-bold text-gray-700">
              Your Domain
            </label>

            <input
              value={yourDomain}
              onChange={(e) =>
                setYourDomain(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnalyze();
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder-gray-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder="Enter your domain"
            />

          </div>

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
                  handleAnalyze();
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder-gray-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder="Enter competitor domain"
            />

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            className="whitespace-nowrap rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700"
          >
            Analyze Gap →
          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >

              <div
                className={`inline-flex rounded-xl ${card.iconBg} p-2.5`}
              >
                <Icon
                  className={`h-5 w-5 ${card.iconColor}`}
                />
              </div>

              <p className="mt-4 text-sm text-gray-500">
                {card.label}
              </p>

              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {card.value}
              </p>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          LINK GAP OVERVIEW CHART
          ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="text-base font-semibold text-gray-900">
            Link Gap Overview
          </h3>

          <div className="flex items-center gap-4 text-xs text-gray-500">

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              Shared
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              Unique to You
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              Unique to Competitor
            </span>

          </div>

        </div>

        <div className="mt-4 h-64">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={gapData}
              barGap={8}
            >

              <XAxis
                dataKey="metric"
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  `${v / 1000}K`
                }
              />

              <Tooltip />

              <Bar
                dataKey="shared"
                fill="#a855f7"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />

              <Bar
                dataKey="yours"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />

              <Bar
                dataKey="competitor"
                fill="#f87171"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          TOP LINK GAP OPPORTUNITIES TABLE
          ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="text-base font-semibold text-gray-900">
            Top Link Gap Opportunities
          </h3>

        </div>

        <div className="mt-4 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="text-xs uppercase tracking-wide text-gray-400">

                <th className="pb-3 pr-4 font-medium">
                  #
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Domain
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Authority
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Relevance
                </th>

                <th className="pb-3 font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-50">

              {linkGapData.topGaps.map(
                (row, i) => (

                  <tr
                    key={`${row.domain}-${i}`}
                    className="text-gray-700"
                  >

                    <td className="py-3 pr-4 text-gray-400">
                      {i + 1}
                    </td>

                    <td className="py-3 pr-4">
                      {row.domain}
                    </td>

                    <td className="py-3 pr-4 font-medium">
                      {row.authority}
                    </td>

                    <td className="py-3 pr-4">

                      <RelevanceBadge
                        relevance={row.relevance}
                      />

                    </td>

                    <td className="py-3">

                      <button
                        type="button"
                        onClick={() => {
                          console.log(
                            "Opening link gap:",
                            row.domain
                          );
                        }}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50"
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