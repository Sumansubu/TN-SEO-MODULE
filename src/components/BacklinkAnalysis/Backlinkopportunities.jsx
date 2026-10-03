import React, { useMemo, useState } from "react";

import {
  Lightbulb,
  Trophy,
  Gauge,
  Link2,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   INITIAL OPPORTUNITIES
   ========================================================= */

const INITIAL_OPPORTUNITIES = [
  {
    page: "https://techradar.com/...",
    domain: "techradar.com",
    authority: 91,
    relevance: "High",
    score: 94,
  },
  {
    page: "https://sitepoint.com/...",
    domain: "sitepoint.com",
    authority: 88,
    relevance: "High",
    score: 90,
  },
  {
    page: "https://w3schools.com/...",
    domain: "w3schools.com",
    authority: 85,
    relevance: "Medium",
    score: 78,
  },
  {
    page: "https://indiehackers.com/...",
    domain: "indiehackers.com",
    authority: 82,
    relevance: "Medium",
    score: 73,
  },
  {
    page: "https://growthhackers.com/...",
    domain: "growthhackers.com",
    authority: 79,
    relevance: "Low",
    score: 61,
  },
];

/* =========================================================
   POSSIBLE DOMAINS
   ========================================================= */

const POSSIBLE_DOMAINS = [
  "searchenginejournal.com",
  "searchengineland.com",
  "backlinko.com",
  "moz.com",
  "hubspot.com",
  "neilpatel.com",
  "entrepreneur.com",
  "forbes.com",
  "medium.com",
  "semrush.com",
  "ahrefs.com",
  "sitepoint.com",
  "techradar.com",
  "w3schools.com",
  "indiehackers.com",
  "growthhackers.com",
];

/* =========================================================
   RELEVANCE BADGE
   ========================================================= */

function RelevanceBadge({ relevance }) {
  const styles = {
    High: "bg-green-50 text-green-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        styles[relevance]
      }`}
    >
      {relevance}
    </span>
  );
}

/* =========================================================
   CREATE SEED FROM DOMAIN
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
   GENERATE FRONTEND OPPORTUNITIES
   ========================================================= */

const generateOpportunities = (domain) => {
  const seed = createSeed(domain);

  const generated = [];

  for (let i = 0; i < 5; i++) {
    const currentSeed =
      seed + i * 7919;

    const domainIndex =
      currentSeed % POSSIBLE_DOMAINS.length;

    const sourceDomain =
      POSSIBLE_DOMAINS[domainIndex];

    const authority =
      70 + (currentSeed % 27);

    let relevance;

    if (authority >= 88) {
      relevance = "High";
    } else if (authority >= 78) {
      relevance = "Medium";
    } else {
      relevance = "Low";
    }

    const relevanceBonus =
      relevance === "High"
        ? 10
        : relevance === "Medium"
        ? 5
        : 0;

    const score = Math.min(
      99,
      Math.max(
        45,
        authority + relevanceBonus -
          (currentSeed % 8)
      )
    );

    generated.push({
      page: `https://${sourceDomain}/...`,
      domain: sourceDomain,
      authority,
      relevance,
      score,
    });
  }

  return generated;
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function BacklinkOpportunities() {
  const [targetDomain, setTargetDomain] =
    useState("tn-seo-module.web.app");

  const [opportunities, setOpportunities] =
    useState(INITIAL_OPPORTUNITIES);

  /* =========================================================
     GENERATE NEW OPPORTUNITIES
     ========================================================= */

  const handleFindOpportunities = () => {
    const cleanedDomain = targetDomain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];

    if (!cleanedDomain) {
      return;
    }

    const newOpportunities =
      generateOpportunities(cleanedDomain);

    setOpportunities(newOpportunities);
  };

  /* =========================================================
     DYNAMIC SUMMARY DATA
     ========================================================= */

  const summaryData = useMemo(() => {
    const highValue =
      opportunities.filter(
        (item) => item.relevance === "High"
      ).length;

    const mediumValue =
      opportunities.filter(
        (item) => item.relevance === "Medium"
      ).length;

    const lowValue =
      opportunities.filter(
        (item) => item.relevance === "Low"
      ).length;

    return [
      {
        label: "Potential Opportunities",
        value: opportunities.length,
        icon: Lightbulb,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },
      {
        label: "High Value",
        value: highValue,
        icon: Trophy,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
      },
      {
        label: "Medium Value",
        value: mediumValue,
        icon: Gauge,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      {
        label: "Low Value",
        value: lowValue,
        icon: Link2,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-500",
      },
    ];
  }, [opportunities]);

  /* =========================================================
     OPEN OPPORTUNITY
     ========================================================= */

  const handleOpenOpportunity = (row) => {
    console.log(
      "Opening backlink opportunity:",
      row.page
    );
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          DOMAIN INPUT
          ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

          <div className="flex-1">

            <label className="mb-1 block text-xs font-bold text-gray-700">
              Target Domain
            </label>

            <input
              type="text"
              value={targetDomain}
              onChange={(e) =>
                setTargetDomain(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFindOpportunities();
                }
              }}
              placeholder="Enter your domain"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder-gray-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />

          </div>

          <button
            type="button"
            onClick={handleFindOpportunities}
            className="whitespace-nowrap rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
          >
            Find Opportunities →
          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {summaryData.map((card) => {
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
          OPPORTUNITIES TABLE
          ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="text-base font-bold text-gray-950">
            Backlink Opportunities
          </h3>

        </div>

        <div className="mt-4 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="text-xs uppercase tracking-wide text-gray-700">

                <th className="pb-3 pr-4 font-bold">
                  #
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Target Page
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Domain
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Authority
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Relevance
                </th>

                <th className="pb-3 pr-4 font-bold">
                  Opportunity Score
                </th>

                <th className="pb-3 font-bold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {opportunities.map((row, i) => (

                <tr
                  key={`${row.domain}-${i}`}
                  className="text-gray-900"
                >

                  <td className="py-3 pr-4 font-semibold text-gray-700">
                    {i + 1}
                  </td>

                  <td className="py-3 pr-4 font-semibold text-blue-700">
                    {row.page}
                  </td>

                  <td className="py-3 pr-4 font-semibold text-gray-950">
                    {row.domain}
                  </td>

                  <td className="py-3 pr-4 font-bold text-gray-950">
                    {row.authority}
                  </td>

                  <td className="py-3 pr-4">
                    <RelevanceBadge
                      relevance={row.relevance}
                    />
                  </td>

                  <td className="py-3 pr-4 font-bold text-gray-950">
                    {row.score}
                  </td>

                  <td className="py-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenOpportunity(row)
                      }
                      title="Open opportunity"
                      className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-700 transition hover:bg-gray-50 hover:text-gray-950"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          CTA BANNER
          ===================================================== */}

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-50 p-2.5">

            <Lightbulb className="h-5 w-5 text-purple-500" />

          </div>

          <div>

            <p className="font-bold text-gray-950">
              Get high-quality backlinks
            </p>

            <p className="text-sm font-medium text-gray-600">
              Reach out to relevant websites and build
              authority with AI-driven suggestions.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleFindOpportunities}
          className="whitespace-nowrap rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700"
        >
          Find More Opportunities →
        </button>

      </div>

    </div>
  );
}