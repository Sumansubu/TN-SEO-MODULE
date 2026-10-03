import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { PILL, VIEW_ALL } from "../data/ui.js";
import { formatCompact } from "../data/compute.js";
import {
    DEFAULT_DATE_RANGE,
    DEFAULT_PERIOD,
    DELTA_LABEL,
    DASHBOARD_HEADER,
    INSIGHTS,
    KEYWORD_RANKINGS,
    KPIS,
    PERIODS,
    SEO_ISSUES,
    TOP_PAGES,
    TRAFFIC_TREND,
    UPGRADE_CTA,
} from "../data/dashboard.js";
import { ALERTS } from "../data/site.js";

export default function Dashboard() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
    const [period, setPeriod] = useState(DEFAULT_PERIOD);

    const pickDateRange = () => {
        const selected = prompt("Enter date range:", dateRange);
        if (selected && selected.trim() !== "") {
            setDateRange(selected.trim());
        }
    };

    const pickPeriod = () => {
        const selected = prompt(
            "Choose period:\n\n" +
            PERIODS.map((item, index) => `${index + 1}. ${item}`).join("\n"),
            String(PERIODS.indexOf(period) + 1)
        );

        const index = parseInt(selected) - 1;
        if (!isNaN(index) && PERIODS[index]) {
            setPeriod(PERIODS[index]);
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto [scrollbar-width:thin] pb-1">

            {/* PAGE HEADING */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold leading-7">{DASHBOARD_HEADER.title}</h1>
                    <p className="text-xs text-muted">{DASHBOARD_HEADER.subtitle}</p>
                </div>

                <button
                    onClick={pickDateRange}
                    className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 hover:border-primary/50"
                >
                    <CalendarDays className="h-4 w-4 text-primary" />
                    {dateRange}
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                </button>
            </div>

            {/* KPI CARDS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS.map((kpi) => (
                    <button
                        key={kpi.id}
                        onClick={() => console.log(`Selected metric: ${kpi.title}`)}
                        className="flex items-start justify-between gap-3 rounded-xl border border-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold">{kpi.title}</h2>
                            <div className="mt-2 flex items-baseline gap-1">
                                <strong className="text-2xl leading-7">{kpi.value}</strong>
                                {kpi.unit && <small className="text-xs text-muted">{kpi.unit}</small>}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                                {kpi.deltaDir === "up" ? "\u2191" : "\u2193"} {kpi.delta}
                                <span className="text-[11px] font-normal text-muted">{DELTA_LABEL}</span>
                            </div>
                            <small className="mt-1 block text-[11px] text-gray-400">{kpi.sub}</small>
                        </div>

                        {kpi.viz.type === "ring" ? (
                            <div
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: `conic-gradient(#0bb568 0deg ${kpi.viz.value * 3.6}deg, #e4ecec ${kpi.viz.value * 3.6}deg 360deg)`,
                                }}
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold">{kpi.viz.value}</div>
                            </div>
                        ) : (
                            <svg viewBox="0 0 100 50" className="h-12 w-20 shrink-0 self-end">
                                <polyline
                                    fill="none"
                                    stroke={kpi.viz.color}
                                    strokeWidth="2.5"
                                    points={kpi.viz.points.map(([x, y]) => `${x},${y}`).join(" ")}
                                />
                            </svg>
                        )}
                    </button>
                ))}
            </div>

            {/* TRAFFIC + AI INSIGHTS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 md:grid-cols-[1.9fr_1.15fr]">

                {/* TRAFFIC TREND */}
                <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex shrink-0 items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold">Organic Traffic Trend</h2>
                        <button
                            onClick={pickPeriod}
                            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-700 hover:border-primary/50"
                        >
                            {period}
                            <ChevronDown className="h-3 w-3" />
                        </button>
                    </div>

                    <div className="mt-3 flex min-h-[150px] flex-1 gap-3">
                        <div className="flex w-9 flex-col justify-between pb-6 text-[10px] text-gray-400">
                            {TRAFFIC_TREND.yLabels.map((label) => (
                                <span key={label}>{label}</span>
                            ))}
                        </div>

                        <div className="relative min-h-0 flex-1">
                            <div className="absolute left-0 top-0 w-full border-t border-dashed border-gray-200"></div>
                            <div className="absolute left-0 top-1/3 w-full border-t border-dashed border-gray-200"></div>
                            <div className="absolute left-0 top-2/3 w-full border-t border-dashed border-gray-200"></div>
                            <div className="absolute bottom-2 left-0 w-full border-t border-dashed border-gray-200"></div>

                            <svg className="h-full max-h-[160px] w-full overflow-visible" viewBox={`0 0 ${TRAFFIC_TREND.width} ${TRAFFIC_TREND.height}`} preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="trafficGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor={TRAFFIC_TREND.fill} stopOpacity=".28" />
                                        <stop offset="100%" stopColor={TRAFFIC_TREND.fill} stopOpacity=".03" />
                                    </linearGradient>
                                </defs>

                                <path
                                    fill="url(#trafficGradient)"
                                    d={
                                        `M${TRAFFIC_TREND.points.map(([x, y]) => `${x} ${y}`).join(" L")} ` +
                                        `L${TRAFFIC_TREND.width} ${TRAFFIC_TREND.points.at(-1)[1]} ` +
                                        `L${TRAFFIC_TREND.width} ${TRAFFIC_TREND.height} L0 ${TRAFFIC_TREND.height} Z`
                                    }
                                />

                                <polyline
                                    fill="none"
                                    stroke={TRAFFIC_TREND.stroke}
                                    strokeWidth="2.3"
                                    points={TRAFFIC_TREND.points.map(([x, y]) => `${x},${y}`).join(" ")}
                                />

                                {TRAFFIC_TREND.points.map(([x, y], index, all) => (
                                    <circle
                                        key={`${x}-${y}`}
                                        cx={x}
                                        cy={y}
                                        r={index === all.length - 1 ? 4.5 : 3.5}
                                        fill={TRAFFIC_TREND.dot}
                                    />
                                ))}
                            </svg>

                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-400">
                                {TRAFFIC_TREND.xLabels.map((label) => (
                                    <span key={label}>{label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI INSIGHTS */}
                <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex min-h-[30px] items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-sm font-semibold">AI Insights</h2>
                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[9px] text-muted">i</span>
                        </div>

                        <button
                            onClick={() => alert(ALERTS.viewAll)}
                            className={VIEW_ALL}
                        >
                            View All <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mt-3 flex flex-1 flex-col justify-between rounded-lg bg-[#effcf7] p-3">
                        {INSIGHTS.map((insight) => (
                            <div className="mb-2.5 flex items-start gap-2.5 text-[13px] leading-5 last:mb-0" key={insight.text}>
                                <span
                                    className={
                                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] " +
                                        (insight.done
                                            ? "bg-primary text-white"
                                            : "border-2 border-[#0caf6a] text-transparent")
                                    }
                                >
                                    &#10003;
                                </span>
                                <span>{insight.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTTOM GRID */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">

                {/* TOP PAGES */}
                <div className="flex min-h-0 flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex shrink-0 items-center justify-between gap-2">
                        <h2 className="whitespace-nowrap text-sm font-semibold">Top Performing Pages</h2>
                        <button
                            onClick={() => alert(ALERTS.viewAll)}
                            className={VIEW_ALL}
                        >
                            View All <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mt-2.5 min-h-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
                        <table className="h-full w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Page</th>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Traffic</th>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Kw</th>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {TOP_PAGES.map((row) => (
                                    <tr key={row.page} className="hover:bg-gray-50/60">
                                        <td className="max-w-[110px] truncate border-t border-gray-100 px-2 py-1.5 text-[13px] text-gray-700">{row.page}</td>
                                        <td className="whitespace-nowrap border-t border-gray-100 px-2 py-1.5 text-[13px] text-gray-700">{formatCompact(row.traffic)}</td>
                                        <td className="whitespace-nowrap border-t border-gray-100 px-2 py-1.5 text-[13px] text-gray-700">{row.keywords}</td>
                                        <td className="border-t border-gray-100 px-2 py-1 text-right text-muted"><ArrowUpRight className="inline h-3.5 w-3.5" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* KEYWORD RANKINGS */}
                <div className="flex min-h-0 flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex shrink-0 items-center justify-between gap-2">
                        <h2 className="whitespace-nowrap text-sm font-semibold">Keyword Rankings</h2>
                        <button
                            onClick={() => alert(ALERTS.viewAll)}
                            className={VIEW_ALL}
                        >
                            View All <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mt-2.5 min-h-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
                        <table className="h-full w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Keyword</th>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Pos</th>
                                    <th className="whitespace-nowrap bg-gray-50 px-2 py-1.5 text-left text-[11px] font-medium text-muted">Chg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {KEYWORD_RANKINGS.map((row) => (
                                    <tr key={row.keyword} className="hover:bg-gray-50/60">
                                        <td className="max-w-[110px] truncate border-t border-gray-100 px-2 py-1.5 text-[13px] text-gray-700">{row.keyword}</td>
                                        <td className="whitespace-nowrap border-t border-gray-100 px-2 py-1.5 text-[13px] text-gray-700">{row.position}</td>
                                        <td className="border-t border-gray-100 px-2 py-1">
                                            {row.change ? (
                                                <span className={"inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium " + (row.change.dir === "up" ? PILL.good : PILL.bad)}>
                                                    {row.change.dir === "up" ? "\u2191" : "\u2193"} {row.change.value}
                                                </span>
                                            ) : (
                                                <span className="text-[11px] text-muted">&mdash;</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SEO ISSUES */}
                <div className="flex min-h-0 flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex shrink-0 items-center justify-between gap-2">
                        <h2 className="whitespace-nowrap text-sm font-semibold">SEO Issues</h2>
                        <button
                            onClick={() => alert(ALERTS.viewAllIssues)}
                            className={VIEW_ALL}
                        >
                            View All <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-y-auto">
                        {SEO_ISSUES.map((issue) => (
                            <button
                                key={issue.title}
                                onClick={() => alert(`Opening ${issue.title} SEO details...`)}
                                className="flex flex-1 items-center gap-2.5 border-b border-gray-100 px-1 py-[7px] text-left transition last:border-b-0 hover:bg-gray-50/60"
                            >
                                <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white " + (issue.tone === "bad" ? "bg-[#e05252]" : issue.tone === "warn" ? "bg-[#e8a317]" : "bg-emerald-500")}>
                                    {issue.tone === "good" ? "\u2713" : "!"}
                                </span>

                                <span className="flex min-w-0 flex-1 flex-col">
                                    <strong className="truncate text-[13px]">{issue.title}</strong>
                                    <span className="truncate text-xs text-muted">{issue.sub}</span>
                                </span>

                                <span className={"inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium " + PILL[issue.tone]}>
                                    {issue.pill}
                                </span>

                                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTTOM CTA */}
            <div className="relative shrink-0 overflow-hidden rounded-xl border border-line bg-[radial-gradient(120%_160%_at_85%_0%,#d8f8e9_0%,#f2fbf7_45%,#ffffff_100%)] p-5 shadow-sm">
                <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-primary/10"></div>

                <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                            <Sparkles className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-base font-bold">{UPGRADE_CTA.title}</h2>
                            <p className="mt-0.5 text-xs text-muted">
                                {UPGRADE_CTA.text}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/upgrade")}
                        className="flex h-9 items-center gap-1.5 rounded-lg bg-primary-dark px-4 text-xs font-semibold text-white transition hover:bg-primary"
                    >
                        {UPGRADE_CTA.button}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

        </div>
    );
}
