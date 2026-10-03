import React, { useMemo, useState } from "react";
import {
  MapPin,
  Monitor,
  Gauge,
  Trophy,
  BarChart3,
  Eye,
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
   LOCATION BASE DATA
========================================================= */

const LOCATION_DATA = {
  India: {
    avgPosition: 12.4,
    top10: 67,
    visibility: 28,
    totalKeywords: 125,
    locations: [
      {
        location: "India",
        avgPos: 12.4,
        top10: 67,
        visibility: 28,
      },
      {
        location: "United States",
        avgPos: 18.2,
        top10: 42,
        visibility: 18,
      },
      {
        location: "United Kingdom",
        avgPos: 20.1,
        top10: 38,
        visibility: 16,
      },
      {
        location: "Canada",
        avgPos: 22.5,
        top10: 29,
        visibility: 12,
      },
      {
        location: "Australia",
        avgPos: 24.3,
        top10: 21,
        visibility: 9,
      },
    ],
  },

  "United States": {
    avgPosition: 18.2,
    top10: 42,
    visibility: 18,
    totalKeywords: 125,
    locations: [
      {
        location: "United States",
        avgPos: 18.2,
        top10: 42,
        visibility: 18,
      },
      {
        location: "India",
        avgPos: 12.4,
        top10: 67,
        visibility: 28,
      },
      {
        location: "United Kingdom",
        avgPos: 20.1,
        top10: 38,
        visibility: 16,
      },
      {
        location: "Canada",
        avgPos: 22.5,
        top10: 29,
        visibility: 12,
      },
      {
        location: "Australia",
        avgPos: 24.3,
        top10: 21,
        visibility: 9,
      },
    ],
  },

  "United Kingdom": {
    avgPosition: 20.1,
    top10: 38,
    visibility: 16,
    totalKeywords: 125,
    locations: [
      {
        location: "United Kingdom",
        avgPos: 20.1,
        top10: 38,
        visibility: 16,
      },
      {
        location: "India",
        avgPos: 12.4,
        top10: 67,
        visibility: 28,
      },
      {
        location: "United States",
        avgPos: 18.2,
        top10: 42,
        visibility: 18,
      },
      {
        location: "Canada",
        avgPos: 22.5,
        top10: 29,
        visibility: 12,
      },
      {
        location: "Australia",
        avgPos: 24.3,
        top10: 21,
        visibility: 9,
      },
    ],
  },

  Canada: {
    avgPosition: 22.5,
    top10: 29,
    visibility: 12,
    totalKeywords: 125,
    locations: [
      {
        location: "Canada",
        avgPos: 22.5,
        top10: 29,
        visibility: 12,
      },
      {
        location: "India",
        avgPos: 12.4,
        top10: 67,
        visibility: 28,
      },
      {
        location: "United States",
        avgPos: 18.2,
        top10: 42,
        visibility: 18,
      },
      {
        location: "United Kingdom",
        avgPos: 20.1,
        top10: 38,
        visibility: 16,
      },
      {
        location: "Australia",
        avgPos: 24.3,
        top10: 21,
        visibility: 9,
      },
    ],
  },

  Australia: {
    avgPosition: 24.3,
    top10: 21,
    visibility: 9,
    totalKeywords: 125,
    locations: [
      {
        location: "Australia",
        avgPos: 24.3,
        top10: 21,
        visibility: 9,
      },
      {
        location: "India",
        avgPos: 12.4,
        top10: 67,
        visibility: 28,
      },
      {
        location: "United States",
        avgPos: 18.2,
        top10: 42,
        visibility: 18,
      },
      {
        location: "United Kingdom",
        avgPos: 20.1,
        top10: 38,
        visibility: 16,
      },
      {
        location: "Canada",
        avgPos: 22.5,
        top10: 29,
        visibility: 12,
      },
    ],
  },
};

/* =========================================================
   DEVICE MULTIPLIERS
========================================================= */

const DEVICE_DATA = {
  Desktop: {
    avgMultiplier: 1,
    top10Multiplier: 1,
    visibilityMultiplier: 1,
  },

  Mobile: {
    avgMultiplier: 1.12,
    top10Multiplier: 0.84,
    visibilityMultiplier: 0.88,
  },

  Tablet: {
    avgMultiplier: 1.2,
    top10Multiplier: 0.72,
    visibilityMultiplier: 0.75,
  },
};

/* =========================================================
   GENERATE DEVICE CHART DATA
========================================================= */

const createDeviceChartData = (location, selectedDevice) => {
  const locationData = LOCATION_DATA[location];
  const selectedDeviceData = DEVICE_DATA[selectedDevice];

  const baseTop10 = locationData.top10;

  const desktop = Math.min(
    100,
    Math.round(baseTop10)
  );

  const mobile = Math.min(
    100,
    Math.round(baseTop10 * 0.78)
  );

  const tablet = Math.min(
    100,
    Math.round(baseTop10 * 0.58)
  );

  /* Slightly change values depending on selected device */
  if (selectedDevice === "Mobile") {
    return [
      {
        bucket: "Top 3",
        desktop: Math.max(5, desktop - 35),
        mobile: Math.max(5, mobile - 20),
        tablet: Math.max(5, tablet - 10),
      },
      {
        bucket: "Top 10",
        desktop,
        mobile,
        tablet,
      },
      {
        bucket: "Top 50",
        desktop: Math.min(100, desktop + 28),
        mobile: Math.min(100, mobile + 24),
        tablet: Math.min(100, tablet + 18),
      },
    ];
  }

  if (selectedDevice === "Tablet") {
    return [
      {
        bucket: "Top 3",
        desktop: Math.max(5, desktop - 38),
        mobile: Math.max(5, mobile - 23),
        tablet: Math.max(5, tablet - 15),
      },
      {
        bucket: "Top 10",
        desktop,
        mobile,
        tablet,
      },
      {
        bucket: "Top 50",
        desktop: Math.min(100, desktop + 25),
        mobile: Math.min(100, mobile + 20),
        tablet: Math.min(100, tablet + 15),
      },
    ];
  }

  return [
    {
      bucket: "Top 3",
      desktop: Math.max(5, desktop - 39),
      mobile: Math.max(5, mobile - 27),
      tablet: Math.max(5, tablet - 15),
    },
    {
      bucket: "Top 10",
      desktop,
      mobile,
      tablet,
    },
    {
      bucket: "Top 50",
      desktop: Math.min(100, desktop + 28),
      mobile: Math.min(100, mobile + 25),
      tablet: Math.min(100, tablet + 20),
    },
  ];
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function LocationDevices() {
  const [location, setLocation] = useState("India");
  const [device, setDevice] = useState("Desktop");

  /* Applied values are separate from selected values */
  const [appliedLocation, setAppliedLocation] = useState("India");
  const [appliedDevice, setAppliedDevice] = useState("Desktop");

  /* =======================================================
     APPLY FILTERS
  ======================================================= */

  const handleApply = () => {
    setAppliedLocation(location);
    setAppliedDevice(device);
  };

  /* =======================================================
     GET CURRENT LOCATION DATA
  ======================================================= */

  const currentData = useMemo(() => {
    return LOCATION_DATA[appliedLocation];
  }, [appliedLocation]);

  /* =======================================================
     GET DEVICE DATA
  ======================================================= */

  const currentDeviceData = useMemo(() => {
    return DEVICE_DATA[appliedDevice];
  }, [appliedDevice]);

  /* =======================================================
     DYNAMIC STATS
  ======================================================= */

  const stats = useMemo(() => {
    const avgPosition = (
      currentData.avgPosition *
      currentDeviceData.avgMultiplier
    ).toFixed(1);

    const top10 = Math.round(
      currentData.top10 *
        currentDeviceData.top10Multiplier
    );

    const visibility = Math.round(
      currentData.visibility *
        currentDeviceData.visibilityMultiplier
    );

    /* Generate a dynamic change value */
    const positionChange = (
      2.5 +
      currentData.visibility / 20
    ).toFixed(1);

    const top10Change = Math.max(
      5,
      Math.round(top10 * 0.27)
    );

    const visibilityChange = Math.max(
      3,
      Math.round(visibility * 0.22)
    );

    return [
      {
        label: `Avg. Position (${appliedLocation} - ${appliedDevice})`,
        value: avgPosition,
        change: positionChange,
        icon: Gauge,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },
      {
        label: "Top 10 Keywords",
        value: top10,
        change: `${top10Change}%`,
        icon: Trophy,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
      },
      {
        label: "Total Keywords",
        value: currentData.totalKeywords,
        icon: BarChart3,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      {
        label: "Search Visibility",
        value: `${visibility}%`,
        change: `${visibilityChange}%`,
        icon: Eye,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-500",
      },
    ];
  }, [
    currentData,
    currentDeviceData,
    appliedLocation,
    appliedDevice,
  ]);

  /* =======================================================
     DYNAMIC DEVICE CHART
  ======================================================= */

  const deviceChartData = useMemo(() => {
    return createDeviceChartData(
      appliedLocation,
      appliedDevice
    );
  }, [appliedLocation, appliedDevice]);

  /* =======================================================
     DYNAMIC LOCATION TABLE
  ======================================================= */

  const locationTable = useMemo(() => {
    return currentData.locations.map((row, index) => {
      const locationMultiplier =
        appliedDevice === "Desktop"
          ? 1
          : appliedDevice === "Mobile"
          ? 1.08
          : 1.15;

      const top10Multiplier =
        appliedDevice === "Desktop"
          ? 1
          : appliedDevice === "Mobile"
          ? 0.84
          : 0.72;

      const visibilityMultiplier =
        appliedDevice === "Desktop"
          ? 1
          : appliedDevice === "Mobile"
          ? 0.88
          : 0.75;

      return {
        ...row,
        avgPos: Number(
          (row.avgPos * locationMultiplier).toFixed(1)
        ),
        top10: Math.max(
          1,
          Math.round(row.top10 * top10Multiplier)
        ),
        visibility: Math.max(
          1,
          Math.round(
            row.visibility * visibilityMultiplier
          )
        ),
        rank: index + 1,
      };
    });
  }, [currentData, appliedDevice]);

  return (
    <div className="space-y-6">

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-end">

        {/* LOCATION */}
        <div className="flex-1">
          <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </label>

          <select
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/30"
          >
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>

        {/* DEVICE */}
        <div className="flex-1">
          <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <Monitor className="h-3.5 w-3.5" />
            Device
          </label>

          <select
            value={device}
            onChange={(e) =>
              setDevice(e.target.value)
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/30"
          >
            <option>Desktop</option>
            <option>Mobile</option>
            <option>Tablet</option>
          </select>
        </div>

        {/* APPLY */}
        <button
          onClick={handleApply}
          className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Apply
        </button>
      </div>

      {/* =====================================================
          CURRENT FILTER
      ===================================================== */}

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span>Showing ranking data for:</span>

        <span className="rounded-lg bg-green-50 px-3 py-1 font-semibold text-green-700">
          {appliedLocation}
        </span>

        <span className="rounded-lg bg-blue-50 px-3 py-1 font-semibold text-blue-700">
          {appliedDevice}
        </span>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((card) => {
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
          DEVICE COMPARISON + LOCATION TABLE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* ===================================================
            DEVICE COMPARISON
        =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <h3 className="text-base font-semibold text-gray-900">
              Device Comparison
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Desktop
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                Mobile
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                Tablet
              </span>

            </div>
          </div>

          <div className="mt-4 h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={deviceChartData}>

                <XAxis
                  dataKey="bucket"
                  tick={{
                    fontSize: 12,
                    fill: "#9ca3af",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{
                    fontSize: 12,
                    fill: "#9ca3af",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Keywords",
                  ]}
                />

                <Bar
                  dataKey="desktop"
                  name="Desktop"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="mobile"
                  name="Mobile"
                  fill="#60a5fa"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="tablet"
                  name="Tablet"
                  fill="#fbbf24"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* ===================================================
            LOCATION COMPARISON
        =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-semibold text-gray-900">
              Location Comparison
            </h3>

            <span className="text-sm font-medium text-green-600">
              Top 5 Locations
            </span>

          </div>

          <div className="mt-4 overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead>
                <tr className="text-xs uppercase tracking-wide text-gray-400">

                  <th className="pb-3 pr-4 font-medium">
                    #
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Location
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Avg. Position
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Top 10
                  </th>

                  <th className="pb-3 font-medium">
                    Visibility
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">

                {locationTable.map((row) => (

                  <tr
                    key={row.location}
                    className={`text-gray-700 ${
                      row.location === appliedLocation
                        ? "bg-green-50/40"
                        : ""
                    }`}
                  >

                    <td className="py-3 pr-4 text-gray-400">
                      {row.rank}
                    </td>

                    <td className="py-3 pr-4 font-medium text-gray-900">
                      {row.location}

                      {row.location === appliedLocation && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                          Selected
                        </span>
                      )}
                    </td>

                    <td className="py-3 pr-4 font-medium">
                      {row.avgPos}
                    </td>

                    <td className="py-3 pr-4">
                      {row.top10}
                    </td>

                    <td className="py-3 font-medium text-green-600">
                      {row.visibility}%
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>

      {/* =====================================================
          DYNAMIC SUMMARY
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Ranking Overview
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Current ranking performance for{" "}
              <span className="font-medium text-gray-800">
                {appliedLocation}
              </span>{" "}
              on{" "}
              <span className="font-medium text-gray-800">
                {appliedDevice}
              </span>
              .
            </p>
          </div>

          <div className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            Visibility: {stats[3].value}
          </div>

        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">
              Average Position
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats[0].value}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">
              Top 10 Keywords
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats[1].value}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">
              Total Keywords
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats[2].value}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}