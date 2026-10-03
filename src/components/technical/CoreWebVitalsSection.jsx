import { useState } from "react";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Gauge,
  Lightbulb,
  Monitor,
  Smartphone,
  TriangleAlert,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import Panel from "../ui/Panel.jsx";
import SubTabs from "../ui/SubTabs.jsx";

import {
  VITALS_SUBTABS,
  CORE_WEB_VITALS_DATA,
  METRIC_DETAILS,
  PERFORMANCE_OPPORTUNITIES,
  CORE_WEB_VITALS_HISTORY,
} from "../../data/technicalSeo.js";

const ICON_MAP = {
  Zap,
  Gauge,
  TrendingUp,
  CheckCircle2,
};

function StatusBadge({ good, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
        good ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {good ? <Check size={12} /> : <TriangleAlert size={12} />}

      {children}
    </span>
  );
}

function MetricProgress({ value, max, good, scaleLabels }) {
  const numericValue = Number(value) || 0;
  const numericMax = Number(max) || 1;

  const percentage = Math.min(
    Math.max((numericValue / numericMax) * 100, 0),
    100,
  );

  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            good ? "bg-emerald-600" : "bg-amber-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
        {scaleLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   METRIC SUMMARY CARD
========================================================= */

function MetricSummaryCard({ metric, data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-bold text-slate-900">{metric}</p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            {data.description}
          </p>
        </div>

        <StatusBadge good={data.good}>{data.status}</StatusBadge>
      </div>

      <div className="mb-3 flex items-end gap-1">
        <span className="text-[25px] font-bold leading-none text-slate-900">
          {data.value}
        </span>

        <span className="pb-0.5 text-[12px] font-medium text-slate-400">
          {data.unit}
        </span>
      </div>

      <MetricProgress
        value={data.percentage}
        max={100}
        good={data.good}
        scaleLabels={["Poor", "Needs improvement", "Good"]}
      />
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function OverviewTab({ device, data }) {
  if (!data) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No Core Web Vitals data available.
      </div>
    );
  }

  return (
    <>
      <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricSummaryCard metric="LCP" data={data.LCP} />

        <MetricSummaryCard metric="INP" data={data.INP} />

        <MetricSummaryCard metric="CLS" data={data.CLS} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title={`${device} Performance`}
          action={
            <span className="text-[11px] font-medium text-slate-400">
              Field data
            </span>
          }
        >
          <div className="space-y-5">
            <MetricRow
              title="Largest Contentful Paint"
              target="Target ≤ 2.5s"
              value={`${data.LCP.value}s`}
              progressValue={data.LCP.value}
              max={4}
              good={data.LCP.good}
              labels={["0s", "2.5s", "4s"]}
            />

            <MetricRow
              title="Interaction to Next Paint"
              target="Target ≤ 200ms"
              value={`${data.INP.value}ms`}
              progressValue={data.INP.value}
              max={500}
              good={data.INP.good}
              labels={["0ms", "200ms", "500ms"]}
            />

            <MetricRow
              title="Cumulative Layout Shift"
              target="Target ≤ 0.10"
              value={data.CLS.value}
              progressValue={data.CLS.value}
              max={0.25}
              good={data.CLS.good}
              labels={["0", "0.1", "0.25"]}
            />
          </div>
        </Panel>

        <Panel title="Performance Insights">
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-[12.5px] font-semibold text-emerald-800">
                  LCP is performing well
                </p>

                <p className="mt-1 text-[11.5px] leading-5 text-emerald-700">
                  The largest visible element is loading within the recommended
                  threshold.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
              <TriangleAlert
                size={17}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <p className="text-[12.5px] font-semibold text-amber-800">
                  INP needs attention
                </p>

                <p className="mt-1 text-[11.5px] leading-5 text-amber-700">
                  Some interactions are taking longer than the recommended
                  threshold.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
              <Lightbulb size={17} className="mt-0.5 shrink-0 text-blue-600" />

              <div>
                <p className="text-[12.5px] font-semibold text-blue-800">
                  Optimization available
                </p>

                <p className="mt-1 text-[11.5px] leading-5 text-blue-700">
                  Image optimization and JavaScript reduction could improve
                  overall performance.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </section>
    </>
  );
}

/* =========================================================
   METRIC ROW
========================================================= */

function MetricRow({ title, target, value, progressValue, max, good, labels }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-slate-700">{title}</p>

          <p className="text-[11px] text-slate-400">{target}</p>
        </div>

        <span className="text-[14px] font-bold text-slate-900">{value}</span>
      </div>

      <MetricProgress
        value={progressValue}
        max={max}
        good={good}
        scaleLabels={labels}
      />
    </div>
  );
}

/* =========================================================
   INDIVIDUAL METRIC TAB
========================================================= */

function MetricDetailTab({ metricKey, device, data }) {
  const metric = METRIC_DETAILS[metricKey];

  if (!metric || !data) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No metric data available.
      </div>
    );
  }

  let max = 100;

  let scaleLabels = ["Poor", "Needs improvement", "Good"];

  if (metricKey === "LCP") {
    max = 4;
  }

  if (metricKey === "INP") {
    max = 500;
  }

  if (metricKey === "CLS") {
    max = 0.25;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Panel>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold text-emerald-700">
              {metric.short}
            </span>

            <h2 className="mt-1 text-[19px] font-bold text-slate-900">
              {metric.name}
            </h2>

            <p className="mt-1 text-[12px] text-slate-400">
              {device} performance
            </p>
          </div>

          <StatusBadge good={data.good}>{data.status}</StatusBadge>
        </div>

        <div className="mb-5 rounded-xl bg-slate-50 p-5">
          <p className="text-[11px] font-medium text-slate-400">
            Current value
          </p>

          <div className="mt-2 flex items-end gap-1">
            <span className="text-[38px] font-bold leading-none text-slate-900">
              {data.value}
            </span>

            <span className="pb-1 text-[14px] font-medium text-slate-400">
              {data.unit}
            </span>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            Recommended: {metric.target}
          </p>
        </div>

        <MetricProgress
          value={data.value}
          max={max}
          good={data.good}
          scaleLabels={scaleLabels}
        />
      </Panel>

      <Panel title="About this metric">
        <p className="text-[13px] leading-6 text-slate-600">
          {metric.explanation}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Recommendation
          </p>

          <p className="text-[12.5px] leading-6 text-slate-600">
            {metric.recommendation}
          </p>
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   OPPORTUNITIES
========================================================= */

function OpportunitiesTab() {
  return (
    <div className="space-y-3">
      {PERFORMANCE_OPPORTUNITIES.map((item, index) => {
        const Icon = ICON_MAP[item.iconKey];

        return (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex shrink-0 items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                {Icon && <Icon size={18} />}
              </div>

              <span className="text-[11px] font-bold text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[13.5px] font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                {item.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="text-right">
                <p className="text-[11px] text-slate-400">Potential gain</p>

                <p className="text-[13px] font-bold text-emerald-700">
                  {item.savings}
                </p>
              </div>

              <span
                className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                  item.impact === "High"
                    ? "bg-red-50 text-red-700"
                    : item.impact === "Medium"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.impact}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   HISTORY
========================================================= */

function HistoryTab() {
  return (
    <Panel
      title="Core Web Vitals History"
      action={
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
          Last 30 days
        </span>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="pb-3 text-[11px] font-semibold text-slate-400">
                Date
              </th>

              <th className="pb-3 text-[11px] font-semibold text-slate-400">
                LCP
              </th>

              <th className="pb-3 text-[11px] font-semibold text-slate-400">
                INP
              </th>

              <th className="pb-3 text-[11px] font-semibold text-slate-400">
                CLS
              </th>

              <th className="pb-3 text-[11px] font-semibold text-slate-400">
                Score
              </th>

              <th className="pb-3 text-right text-[11px] font-semibold text-slate-400">
                Trend
              </th>
            </tr>
          </thead>

          <tbody>
            {CORE_WEB_VITALS_HISTORY.map((row, index) => (
              <tr
                key={row.date}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="py-3 text-[12px] font-medium text-slate-700">
                  {row.date}
                </td>

                <td className="py-3 text-[12px] text-slate-600">{row.lcp}</td>

                <td className="py-3 text-[12px] text-slate-600">{row.inp}</td>

                <td className="py-3 text-[12px] text-slate-600">{row.cls}</td>

                <td className="py-3">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                    {row.score}/100
                  </span>
                </td>

                <td className="py-3 text-right">
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <TrendingUp size={13} />
                      Improving
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                      <TrendingDown size={13} />
                      Previous
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CoreWebVitalsSection({
  onBack,
  dataSource = CORE_WEB_VITALS_DATA,
  tabs = VITALS_SUBTABS,
}) {
  const [subTab, setSubTab] = useState(tabs[0] || "Overview");

  const [device, setDevice] = useState("Mobile");

  const data = dataSource?.[device];

  const safeTabs = tabs?.length > 0 ? tabs : ["Overview", "LCP", "INP", "CLS"];

  return (
    <div className="w-full">
      {/* =====================================================
          SUB NAVIGATION
      ===================================================== */}

      <div className="mb-5 flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Technical SEO overview"
          className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0 flex-1 overflow-x-auto">
          <SubTabs items={safeTabs} active={subTab} onChange={setSubTab} />
        </div>
      </div>

      {/* =====================================================
          DEVICE SWITCH
      ===================================================== */}

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold text-slate-700">
            Device performance
          </p>

          <p className="text-[11px] text-slate-400">
            Compare Core Web Vitals across devices.
          </p>
        </div>

        <div className="flex w-full rounded-lg border border-slate-200 bg-slate-50 p-1 sm:w-auto">
          <button
            type="button"
            onClick={() => setDevice("Mobile")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-semibold transition sm:flex-none ${
              device === "Mobile"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Smartphone size={14} />
            Mobile
          </button>

          <button
            type="button"
            onClick={() => setDevice("Desktop")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-semibold transition sm:flex-none ${
              device === "Desktop"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Monitor size={14} />
            Desktop
          </button>
        </div>
      </div>

      {/* =====================================================
          TAB CONTENT
      ===================================================== */}

      {subTab === "Overview" && <OverviewTab device={device} data={data} />}

      {subTab === "LCP" && (
        <MetricDetailTab metricKey="LCP" device={device} data={data?.LCP} />
      )}

      {subTab === "INP" && (
        <MetricDetailTab metricKey="INP" device={device} data={data?.INP} />
      )}

      {subTab === "CLS" && (
        <MetricDetailTab metricKey="CLS" device={device} data={data?.CLS} />
      )}

      {/* Backward compatibility if your data file still contains
          these older tabs. */}

      {subTab === "Metrics" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {Object.entries(METRIC_DETAILS).map(([key, metric]) => {
            const metricData = data?.[key];

            if (!metricData) {
              return null;
            }

            return (
              <Panel key={key}>
                <span className="text-[12px] font-bold text-emerald-700">
                  {metric.short}
                </span>

                <h3 className="mt-1 text-[15px] font-bold text-slate-900">
                  {metric.name}
                </h3>

                <p className="mt-3 text-[26px] font-bold text-slate-900">
                  {metricData.value}
                  {metricData.unit}
                </p>

                <p className="mt-2 text-[12px] leading-5 text-slate-500">
                  {metric.explanation}
                </p>
              </Panel>
            );
          })}
        </div>
      )}

      {subTab === "Opportunities" && <OpportunitiesTab />}

      {subTab === "History" && <HistoryTab />}
    </div>
  );
}
