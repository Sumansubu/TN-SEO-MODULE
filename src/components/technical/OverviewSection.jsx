import {
  ArrowRight,
  FileText,
  AlertCircle,
  Check,
  Clock,
  TriangleAlert,
  ScanLine,
  Sparkles,
} from "lucide-react";

import Panel from "../ui/Panel.jsx";
import DonutChart from "../ui/DonutChart.jsx";
import ScoreGauge from "./ScoreGauge.jsx";

import {
  ISSUE_DISTRIBUTION,
  CORE_WEB_VITALS_SUMMARY,
  TOP_ISSUES_PREVIEW,
  BADGE_CLASSES,
  OVERVIEW_STATS,
  CRAWL_STATUS_ROWS,
  TECHNICAL_SEO_SCORE,
  TECHNICAL_SEO_CRAWL_STATUS,
} from "../../data/technicalSeo.js";

const ICONS = {
  FileText,
  AlertCircle,
  Check,
  Clock,
  ScanLine,
};

export default function OverviewSection({
  issueDistribution = ISSUE_DISTRIBUTION,
  coreWebVitals = CORE_WEB_VITALS_SUMMARY,
  topIssues = TOP_ISSUES_PREVIEW,
  badgeClasses = BADGE_CLASSES,
  overviewStats = OVERVIEW_STATS,
  crawlStatusRows = CRAWL_STATUS_ROWS,
  seoScore = TECHNICAL_SEO_SCORE,
  crawlStatus = TECHNICAL_SEO_CRAWL_STATUS,

  // Navigation / action handlers
  onViewReport,
  onViewDetails,
  onViewAll,
  onViewIssue,
  onUpgrade,
}) {
  const totalIssues = issueDistribution.reduce(
    (total, item) => total + Number(item.value || 0),
    0,
  );

  return (
    <>
      {/* =====================================================
          OVERVIEW STATS
      ===================================================== */}
      <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map(
          ({ label, value, trend, direction, trendGood, iconKey, tone }) => {
            const Icon = ICONS[iconKey] || FileText;

            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${
                    tone === "green"
                      ? "bg-emerald-50"
                      : tone === "red"
                        ? "bg-red-50"
                        : "bg-amber-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      tone === "green"
                        ? "bg-emerald-600"
                        : tone === "red"
                          ? "bg-red-500"
                          : "bg-amber-500"
                    }`}
                  >
                    <Icon size={14} className="text-white" />
                  </span>
                </span>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[12.5px] text-slate-500">{label}</span>

                  <span className="text-[22px] font-bold leading-none">
                    {value}
                  </span>

                  <span
                    className={`text-[12px] font-semibold ${
                      trendGood ? "text-emerald-700" : "text-red-500"
                    }`}
                  >
                    {direction === "up" ? "↑" : "↓"} {trend}{" "}
                    <span className="font-normal text-slate-400">
                      vs last crawl
                    </span>
                  </span>
                </div>
              </div>
            );
          },
        )}
      </section>

      {/* =====================================================
          SCORE / ISSUES / CORE WEB VITALS
      ===================================================== */}
      <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr_1.15fr]">
        {/* =================================================
            TECHNICAL SEO SCORE
        ================================================= */}
        <Panel title="Technical SEO Score">
          <div className="flex items-center gap-5">
            <ScoreGauge score={seoScore.score} />

            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] font-bold text-emerald-700">
                {seoScore.status}
              </span>

              <p className="text-[12.5px] leading-relaxed text-slate-500">
                {seoScore.description}
              </p>

              <button
                type="button"
                onClick={onViewReport}
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-emerald-800"
              >
                View Full Report
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </Panel>

        {/* =================================================
            ISSUE DISTRIBUTION
        ================================================= */}
        <Panel title="Issue Distribution">
          <button
            type="button"
            onClick={onViewAll}
            className="group flex w-full items-center gap-5 text-left"
            aria-label="View all technical issues"
          >
            <DonutChart
              data={issueDistribution}
              centerValue={totalIssues}
              centerLabel="Issues"
            />

            <ul className="flex flex-1 flex-col gap-2.5 text-[13px]">
              {issueDistribution.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: item.color }}
                  />

                  <span className="flex-1">{item.label}</span>

                  <span className="font-bold">{item.value}</span>
                </li>
              ))}
            </ul>
          </button>
        </Panel>

        {/* =================================================
            CORE WEB VITALS
        ================================================= */}
        <Panel
          title="Core Web Vitals"
          action={
            <button
              type="button"
              onClick={onViewDetails}
              className="flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View Details
              <ArrowRight size={14} />
            </button>
          }
        >
          <div className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-3">
            {coreWebVitals.map((vital) => (
              <button
                key={vital.label}
                type="button"
                onClick={onViewDetails}
                className={`flex flex-col gap-2 rounded-[10px] px-3 py-2.5 text-left transition ${
                  vital.good
                    ? "bg-emerald-50 hover:bg-emerald-100"
                    : "bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-500">
                    {vital.label}
                  </span>

                  {vital.good ? (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600">
                      <Check size={10} className="text-white" />
                    </span>
                  ) : (
                    <TriangleAlert size={16} className="text-amber-500" />
                  )}
                </div>

                <span className="text-[17px] font-bold">{vital.value}</span>

                <span
                  className={`text-[11px] ${
                    vital.good ? "text-slate-500" : "text-amber-600"
                  }`}
                >
                  {vital.status}
                </span>
              </button>
            ))}
          </div>
        </Panel>
      </section>

      {/* =====================================================
          TOP ISSUES / CRAWL STATUS
      ===================================================== */}
      <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.65fr_1fr]">
        {/* =================================================
            TOP TECHNICAL ISSUES
        ================================================= */}
        <Panel
          title="Top Technical Issues"
          action={
            <button
              type="button"
              onClick={onViewAll}
              className="flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All
              <ArrowRight size={14} />
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr>
                  {["#", "Issue", "Severity", "Affected Pages", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="border-b border-slate-100 pb-2 text-[11.5px] font-semibold text-slate-400"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody className="text-[13px]">
                {topIssues.map((row, index) => (
                  <tr key={row.n ?? `${row.issue}-${index}`}>
                    <td
                      className={`py-3 ${
                        index < topIssues.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.n ?? index + 1}
                    </td>

                    <td
                      className={`py-3 ${
                        index < topIssues.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.issue}
                    </td>

                    <td
                      className={`py-3 ${
                        index < topIssues.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <span
                        className={`rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${
                          badgeClasses[row.severity] ||
                          "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>

                    <td
                      className={`py-3 ${
                        index < topIssues.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.pages}
                    </td>

                    <td
                      className={`py-3 ${
                        index < topIssues.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onViewIssue?.(row)}
                        className="rounded-md bg-emerald-50 px-3.5 py-1.5 text-[11.5px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Fix
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* =================================================
            CRAWL STATUS
        ================================================= */}
        <Panel title="Crawl Status">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600">
              <Check size={14} className="text-white" />
            </span>

            <div className="flex flex-col">
              <strong className="text-[13.5px] text-emerald-700">
                {crawlStatus.status}
              </strong>

              <span className="text-[12px] text-slate-500">
                {crawlStatus.date}
              </span>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{
                  width: `${crawlStatus.progress}%`,
                }}
              />
            </div>

            <span className="text-[12px] font-semibold text-slate-500">
              {crawlStatus.progress}%
            </span>
          </div>

          <ul className="flex flex-col gap-3.5 text-[13px]">
            {crawlStatusRows.map(({ iconKey, label, value }) => {
              const Icon = ICONS[iconKey] || FileText;

              return (
                <li key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Icon size={15} />
                    {label}
                  </span>

                  <span className="font-semibold">{value}</span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </section>

      {/* =====================================================
          AI RECOMMENDATION
      ===================================================== */}
      <section className="flex flex-col items-start gap-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-50/30 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-emerald-600">
            <Sparkles size={20} />
          </span>

          <div>
            <h3 className="mb-0.5 text-[14.5px] font-bold">
              Get Actionable SEO Recommendations with AI
            </h3>

            <p className="text-[13px] text-slate-500">
              Fix issues faster and improve your technical SEO with AI-powered
              insights.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onUpgrade}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-800"
        >
          Upgrade Plan
          <ArrowRight size={16} />
        </button>
      </section>
    </>
  );
}
