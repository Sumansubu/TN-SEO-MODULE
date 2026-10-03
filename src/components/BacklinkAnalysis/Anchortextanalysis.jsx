import React, { useMemo, useState } from "react";
import {
  Link2,
  Tag,
  Hash,
  Target,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* =========================================================
   INITIAL ANCHOR TEXT DATA
   ========================================================= */

const INITIAL_ANCHOR_TEXTS = [
  {
    text: "tn seo",
    count: 122,
    type: "Branded",
  },
  {
    text: "tn-seo-module",
    count: 84,
    type: "Branded",
  },
  {
    text: "website audit",
    count: 56,
    type: "Generic",
  },
  {
    text: "click here",
    count: 42,
    type: "Generic",
  },
  {
    text: "seo tools",
    count: 36,
    type: "Exact Match",
  },
  {
    text: "search engine optimization",
    count: 28,
    type: "Generic",
  },
  {
    text: "seo software",
    count: 24,
    type: "Exact Match",
  },
  {
    text: "digital marketing",
    count: 18,
    type: "Partial Match",
  },
  {
    text: "learn seo",
    count: 14,
    type: "Partial Match",
  },
  {
    text: "website seo",
    count: 12,
    type: "Other",
  },
];

/* =========================================================
   COLORS
   ========================================================= */

const TYPE_COLORS = {
  Branded: "#3b82f6",
  Generic: "#a855f7",
  "Exact Match": "#22c55e",
  "Partial Match": "#f59e0b",
  Other: "#94a3b8",
};

/* =========================================================
   ANCHOR TEXTS USED FOR FRONTEND GENERATION
   ========================================================= */

const ANCHOR_TEXT_POOL = [
  {
    text: "seo tools",
    type: "Exact Match",
  },
  {
    text: "seo software",
    type: "Exact Match",
  },
  {
    text: "website audit",
    type: "Generic",
  },
  {
    text: "seo audit",
    type: "Exact Match",
  },
  {
    text: "digital marketing",
    type: "Partial Match",
  },
  {
    text: "search engine optimization",
    type: "Generic",
  },
  {
    text: "seo services",
    type: "Partial Match",
  },
  {
    text: "learn seo",
    type: "Partial Match",
  },
  {
    text: "seo guide",
    type: "Generic",
  },
  {
    text: "click here",
    type: "Generic",
  },
  {
    text: "visit website",
    type: "Other",
  },
  {
    text: "website optimization",
    type: "Generic",
  },
  {
    text: "backlink analysis",
    type: "Exact Match",
  },
  {
    text: "seo strategy",
    type: "Partial Match",
  },
  {
    text: "seo platform",
    type: "Exact Match",
  },
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
   GENERATE DYNAMIC ANCHOR TEXT DATA
   ========================================================= */

const generateAnchorTexts = (domain) => {
  const seed = createSeed(domain);

  const generated = [];

  for (let i = 0; i < 10; i++) {
    const currentSeed =
      seed + i * 7919;

    const item =
      ANCHOR_TEXT_POOL[
        currentSeed % ANCHOR_TEXT_POOL.length
      ];

    const count =
      15 + (currentSeed % 115);

    generated.push({
      text: item.text,
      count,
      type: item.type,
    });
  }

  /* Add domain-based branded anchor */

  const cleanDomain = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];

  if (cleanDomain) {
    generated[0] = {
      text: cleanDomain,
      count: 90 + (seed % 70),
      type: "Branded",
    };
  }

  return generated;
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function AnchorTextAnalysis() {
  const [domain, setDomain] = useState(
    "tn-seo-module.web.app"
  );

  const [anchorTexts, setAnchorTexts] =
    useState(INITIAL_ANCHOR_TEXTS);

  /* =========================================================
     GENERATE NEW DATA
     ========================================================= */

  const handleAnalyze = () => {
    const cleanedDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];

    if (!cleanedDomain) {
      return;
    }

    setDomain(cleanedDomain);

    const generated =
      generateAnchorTexts(cleanedDomain);

    setAnchorTexts(generated);
  };

  /* =========================================================
     TOTAL ANCHOR TEXTS
     ========================================================= */

  const totalAnchorTexts = useMemo(() => {
    return anchorTexts.reduce(
      (total, item) => total + item.count,
      0
    );
  }, [anchorTexts]);

  /* =========================================================
     DISTRIBUTION DATA
     ========================================================= */

  const distributionData = useMemo(() => {
    const types = [
      "Branded",
      "Generic",
      "Exact Match",
      "Partial Match",
      "Other",
    ];

    return types.map((type) => {
      const total = anchorTexts
        .filter((item) => item.type === type)
        .reduce(
          (sum, item) => sum + item.count,
          0
        );

      return {
        name: type,
        value:
          totalAnchorTexts > 0
            ? Math.round(
                (total / totalAnchorTexts) * 100
              )
            : 0,
        color: TYPE_COLORS[type],
      };
    });
  }, [anchorTexts, totalAnchorTexts]);

  /* =========================================================
     SUMMARY DATA
     ========================================================= */

  const summaryCards = useMemo(() => {
    const getPercentage = (type) => {
      const total = anchorTexts
        .filter((item) => item.type === type)
        .reduce(
          (sum, item) => sum + item.count,
          0
        );

      if (totalAnchorTexts === 0) {
        return 0;
      }

      return Math.round(
        (total / totalAnchorTexts) * 100
      );
    };

    return [
      {
        label: "Total Anchor Texts",
        value: totalAnchorTexts.toLocaleString(),
        icon: Link2,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },
      {
        label: "Branded",
        value: `${getPercentage("Branded")}%`,
        icon: Tag,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-500",
      },
      {
        label: "Generic",
        value: `${getPercentage("Generic")}%`,
        icon: Hash,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      {
        label: "Exact Match",
        value: `${getPercentage("Exact Match")}%`,
        icon: Target,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
      },
      {
        label: "Other",
        value: `${Math.round(
          getPercentage("Partial Match") +
            getPercentage("Other")
        )}%`,
        icon: Hash,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-500",
      },
    ];
  }, [anchorTexts, totalAnchorTexts]);

  /* =========================================================
     TOP ANCHOR TEXTS
     ========================================================= */

  const topAnchorTexts = useMemo(() => {
    return [...anchorTexts]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        pct:
          totalAnchorTexts > 0
            ? `${Math.round(
                (item.count / totalAnchorTexts) *
                  100
              )}%`
            : "0%",
      }));
  }, [anchorTexts, totalAnchorTexts]);

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
              value={domain}
              onChange={(e) =>
                setDomain(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnalyze();
                }
              }}
              placeholder="Enter your domain"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            className="whitespace-nowrap rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Analyze Anchor Text →
          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

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
          DISTRIBUTION DONUT + TOP ANCHOR TEXTS
          ===================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* ===================================================
            DISTRIBUTION DONUT
            =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <h3 className="text-base font-bold text-gray-950">
            Anchor Text Distribution
          </h3>

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
                  >

                    {distributionData.map(
                      (entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                        />
                      )
                    )}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-xl font-bold text-gray-950">
                  {totalAnchorTexts.toLocaleString()}
                </span>

                <span className="text-xs font-semibold text-gray-500">
                  Anchor Texts
                </span>

              </div>

            </div>

            <ul className="flex-1 space-y-2.5">

              {distributionData.map(
                (item) => (

                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >

                    <span className="flex items-center gap-2 font-semibold text-gray-700">

                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
                        }}
                      />

                      {item.name}

                    </span>

                    <span className="font-bold text-gray-950">
                      {item.value}%
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>

        </div>

        {/* ===================================================
            TOP ANCHOR TEXTS
            =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-bold text-gray-950">
              Top Anchor Texts
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
                    Anchor Text
                  </th>

                  <th className="pb-3 pr-4 font-bold">
                    Count
                  </th>

                  <th className="pb-3 font-bold">
                    %
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {topAnchorTexts.map(
                  (row, i) => (

                    <tr
                      key={`${row.text}-${i}`}
                      className="text-gray-900"
                    >

                      <td className="py-3 pr-4 font-semibold text-gray-700">
                        {i + 1}
                      </td>

                      <td className="py-3 pr-4 font-semibold text-gray-950">
                        {row.text}
                      </td>

                      <td className="py-3 pr-4 font-bold text-gray-950">
                        {row.count}
                      </td>

                      <td className="py-3 font-semibold text-gray-700">
                        {row.pct}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* =====================================================
          CTA BANNER
          ===================================================== */}

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-50 p-2.5">

            <Target className="h-5 w-5 text-purple-500" />

          </div>

          <div>

            <p className="font-bold text-gray-950">
              Optimize Your Anchor Text Profile
            </p>

            <p className="text-sm font-medium text-gray-600">
              Ensure a natural mix of branded,
              generic, and relevant anchor texts
              for better rankings.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          className="whitespace-nowrap rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
        >
          View Recommendations →
        </button>

      </div>

    </div>
  );
}