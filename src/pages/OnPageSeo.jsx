import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Calendar,
    Check,
    ChevronDown,
    ChevronRight,
    Clock,
    Code2,
    Download,
    ExternalLink,
    FileText,
    Gauge,
    HelpCircle,
    Image,
    Layers,
    Link2,
    ListChecks,
    LoaderCircle,
    RefreshCw,
    Share2,
    Sparkles,
} from "lucide-react";
import {
    ACTION_BTN,
    ContentAnalysisTab,
    HtmlElementsTab,
    ImagesTab,
    InternalLinksTab,
    PageSpeedTab,
    PILL,
    TD,
    TH,
} from "../components/OnPageSeoShared.jsx";
import {
    BREAKDOWN,
    CONTENT_KEYWORDS,
    DEFAULT_PAGE_URL,
    FILTERS,
    HEADER_ACTIONS,
    ISSUES,
    KEY_METRICS,
    KEYWORDS,
    FEEDBACK,
    MAIN_BANNER,
    MAIN_FILTERS,
    MAIN_ISSUES,
    MAIN_STRUCTURE,
    MAIN_TAB_KEYS,
    PAGE_HEADERS,
    PAGE_INFO,
    REPORT_BANNER,
    REPORT_TAB_KEYS,
    RICH_RESULTS,
    SCORE,
    SCORE_SUMMARY,
    SERP_PREVIEW,
    STRUCTURE,
} from "../data/onPageSeo.js";
import { ALERTS } from "../data/site.js";
import { ALERTS_EXTRA, COLORS } from "../data/theme.js";

/* ===================== TABS ===================== */

const TAB_ICONS = {
    clock: Clock,
    "file-text": FileText,
    "code-2": Code2,
    image: Image,
    "link-2": Link2,
    gauge: Gauge,
};

const withIcons = (tabs) => tabs.map(({ label, icon }) => ({ label, icon: TAB_ICONS[icon] }));

const MAIN_TABS = withIcons(MAIN_TAB_KEYS);
const REPORT_TABS = withIcons(REPORT_TAB_KEYS);

/* Rich-results rows reference icons by name in the data file */
const RICH_ICONS = {
    sparkles: Sparkles,
    "help-circle": HelpCircle,
    "list-checks": ListChecks,
    layers: Layers,
    "link-2": Link2,
};

const RICH_RESULTS_WITH_ICONS = RICH_RESULTS.map((row) => ({ ...row, icon: RICH_ICONS[row.icon] }));

const impactStyle = {
    high: "text-[#df4949] font-semibold",
    medium: "text-[#db9a1d] font-medium",
    low: "text-muted",
};

/* ===================== SHARED PIECES ===================== */

function SharedHeader({ title, subtitle, actions, onBack }) {
    return (
        <div className="flex shrink-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
                {onBack && (
                    <button
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-gray-600 transition hover:border-primary/50 hover:text-primary"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                )}

                <div className="min-w-0">
                    <h1 className="text-xl font-bold leading-7">{title}</h1>
                    <div className="mt-0.5 truncate text-xs text-muted">{subtitle}</div>
                </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2.5">{actions}</div>
        </div>
    );
}

function TabNav({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex shrink-0 items-end overflow-x-auto rounded-t-xl border border-line bg-white px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.label;
                return (
                    <button
                        key={tab.label}
                        onClick={() => onTabChange(tab.label)}
                        className={
                            "flex whitespace-nowrap items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs transition " +
                            (isActive
                                ? "border-primary font-semibold text-primary"
                                : "border-transparent text-muted hover:text-gray-700")
                        }
                    >
                        <Icon className="h-3.5 w-3.5" />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

function IssuesTable({ variant = "report", filters, visibleIssues, pageSize, setPageSize, activeFilter, setActiveFilter, onViewAll, fixedIssues, fixIssue }) {
    const isMain = variant === "main";
    const headers = isMain
        ? ["#", "Issue", "Status", "Impact", "Action"]
        : ["#", "Issue", "Category", "Impact", "Status", "Recommendation", "Action"];

    return (
        <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-[13px]">
                <h2 className="text-sm font-semibold">
                    {isMain ? "Top On-Page SEO Issues" : "Top Issues and Recommendations"}
                </h2>

                <div className="flex flex-wrap gap-1.5">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={
                                "rounded-full border px-3 py-1 text-[11px] transition " +
                                (activeFilter === filter.key
                                    ? "border-emerald-300 bg-mint font-medium text-primary"
                                    : "border-line bg-white text-muted hover:text-gray-700")
                            }
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="h-full w-full border-collapse">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header} className={TH}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleIssues.length === 0 && (
                            <tr>
                                <td colSpan={headers.length} className="px-2.5 py-6 text-center text-xs text-muted">
                                    No issues in this category.
                                </td>
                            </tr>
                        )}
                        {visibleIssues.map((row, index) => (
                            <tr key={row.id} className="hover:bg-gray-50/60">
                                <td className={TD + " border-t border-gray-100 text-xs text-gray-700"}>{index + 1}</td>
                                <td className={TD + " max-w-[160px] truncate border-t border-gray-100 text-xs text-gray-700"}>{row.issue}</td>

                                {!isMain && (
                                    <td className={TD + " whitespace-nowrap border-t border-gray-100 text-xs text-gray-700"}>{row.category}</td>
                                )}

                                {isMain ? (
                                    <>
                                        <td className={TD + " border-t border-gray-100"}>
                                            <span className={"inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium " + PILL[row.status === "error" ? "bad" : row.status === "warning" ? "warn" : "good"]}>
                                                {row.status === "error" ? "Error" : row.status === "warning" ? "Warning" : "Passed"}
                                            </span>
                                        </td>
                                        <td className={TD + " whitespace-nowrap border-t border-gray-100 text-xs"}>
                                            <span className={impactStyle[row.impact]}>
                                                {row.impact === "high" ? "High" : row.impact === "medium" ? "Medium" : "Low"}
                                            </span>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className={TD + " whitespace-nowrap border-t border-gray-100 text-xs"}>
                                            <span className={impactStyle[row.impact]}>
                                                {row.impact === "high" ? "High" : row.impact === "medium" ? "Medium" : "Low"}
                                            </span>
                                        </td>
                                        <td className={TD + " border-t border-gray-100"}>
                                            <span className={"inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium " + PILL[row.status === "error" ? "bad" : row.status === "warning" ? "warn" : "good"]}>
                                                {row.status === "error" ? "Error" : row.status === "warning" ? "Warning" : "Passed"}
                                            </span>
                                        </td>
                                        <td className={TD + " max-w-[200px] truncate border-t border-gray-100 text-xs text-muted"}>{row.recommendation}</td>
                                    </>
                                )}

                                <td className={TD + " border-t border-gray-100"}>
                                    <div className="flex items-center gap-1">
                                        <button
                                            className={
                                                "whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] transition " +
                                                (fixedIssues.includes(row.id)
                                                    ? "border-emerald-300 text-primary"
                                                    : "border-line text-gray-700 hover:border-primary hover:bg-[#effaf5] hover:text-primary")
                                            }
                                            onClick={() =>
                                                row.status === "passed"
                                                    ? alert(`${row.issue}\n\n${row.recommendation}`)
                                                    : fixIssue(row.id, row.issue)
                                            }
                                        >
                                            {fixedIssues.includes(row.id) ? "Fixed" : row.status === "passed" ? "Details" : "Fix Now"}
                                        </button>
                                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-4 py-1">
                <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <span>Show</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="rounded-md border border-line bg-white px-2 py-1 text-[11px] outline-none"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <span>per page</span>
                </div>

                <button onClick={onViewAll} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    {HEADER_ACTIONS.viewAllIssues} <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}

function OnPageScoreCard({ onViewReport }) {
    const scoreDegrees = SCORE * 3.6;

    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">On-Page SEO Score</h2>
            <div className="flex flex-1 items-center gap-4">
                <div
                    className="flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-full"
                    style={{ background: `conic-gradient(#0bb568 0deg ${scoreDegrees}deg, #e4ecec ${scoreDegrees}deg 360deg)` }}
                >
                    <div className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full bg-white">
                        <strong className="text-[28px] leading-8">{SCORE}</strong>
                        <span className="text-[11px] text-muted">/100</span>
                    </div>
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-[#079b61]">{SCORE_SUMMARY.badge}</h3>
                    <p className="mt-1 text-[13px] leading-5 text-muted">
                        {SCORE_SUMMARY.description}
                    </p>
                    {onViewReport && (
                        <button
                            onClick={onViewReport}
                            className="mt-2.5 flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            {HEADER_ACTIONS.viewDetailedReport} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function KeyMetricsCard() {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Key Metrics</h2>
            <div className="mt-3 grid flex-1 grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
                {KEY_METRICS.map((row) => (
                    <div key={row.label} className="flex flex-col items-center justify-between rounded-lg border border-gray-100 bg-[${COLORS.contentBg}] px-3 py-3 text-center">
                        <strong className="text-xl font-bold leading-7 text-ink">{row.score}/100</strong>
                        <span className="mt-1 flex min-h-[2rem] items-center justify-center text-xs font-medium leading-4 text-gray-700">{row.label}</span>
                        <span className={"mt-1.5 inline-flex h-[2.25rem] w-full items-center justify-center gap-1 rounded-md px-1.5 py-0.5 text-center text-[10px] font-medium leading-4 " + PILL[row.tone]}>
                            {row.tone === "good" && <Check className="h-3 w-3 shrink-0" />}
                            {row.tone === "warn" && <AlertTriangle className="h-3 w-3 shrink-0" />}
                            {row.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PreviewOnGoogleCard({ selectedUrl, viewLive }) {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="mb-2.5 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Preview on Google</h2>
                <button
                    onClick={viewLive}
                    className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary hover:underline"
                >
                    {HEADER_ACTIONS.viewLive} <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="flex-1 rounded-lg border border-gray-100 bg-[#fafcfc] p-3">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="text-xs font-bold text-[#4285f4]">G</span>
                    <span className="truncate">
                        {selectedUrl.replace(/^https?:\/\//, "").replace(/\//g, " › ")}
                    </span>
                </div>
                <div className="mb-1 truncate text-sm font-medium text-[#175bc3]">
                    {SERP_PREVIEW.title}
                </div>
                <div className="text-[11px] leading-4 text-muted">
                    {SERP_PREVIEW.description}
                </div>
            </div>

            <div className="mt-2.5 flex h-9 shrink-0 items-center gap-2 rounded-lg bg-mint px-3 text-[11px] text-gray-700">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] text-white">&#10003;</span>
                {SERP_PREVIEW.richResultNotice}
            </div>
        </div>
    );
}

function ScoreBreakdownCard() {
    return (
        <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Score Breakdown</h2>

            <div className="mt-4 flex flex-col gap-3.5">
                {BREAKDOWN.map((row) => (
                    <div key={row.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">{row.label}</span>
                            <span className="font-medium text-ink">{row.score}/100</span>
                        </div>
                        <div className="h-[6px] overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full"
                                style={{ width: `${row.score}%`, background: row.color || "#0bb568" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function KeywordUsageBars() {
    const primary = CONTENT_KEYWORDS[0];
    const related = CONTENT_KEYWORDS.slice(1);

    return (
        <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-semibold">Keyword Usage</h2>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[9px] text-muted">i</span>
            </div>

            <div className="mt-3 flex flex-col gap-3.5">
                <div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-700">
                            Primary Keyword: <strong className="font-semibold text-ink">{primary.keyword}</strong>
                        </span>
                        <span className="shrink-0 font-medium text-gray-700">{primary.used}/{primary.target}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-[#0bb568]"
                            style={{ width: `${Math.round((primary.used / primary.target) * 100)}%` }}
                        />
                    </div>
                </div>

                <span className="block text-[11px] font-medium text-muted">Related Keywords</span>

                {related.map((row) => (
                    <div key={row.keyword}>
                        <div className="flex items-center justify-between text-xs">
                            <span className="truncate text-gray-700">{row.keyword}</span>
                            <span className="shrink-0 font-medium text-gray-700">{row.used}/{row.target}</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-[#0bb568]"
                                style={{ width: `${Math.round((row.used / row.target) * 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function KeywordUsageTable() {
    return (
        <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-semibold">Keyword Usage in Content</h2>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[9px] text-muted">i</span>
                </div>
                <button
                    onClick={() => alert(ALERTS.viewAll)}
                    className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary hover:underline"
                >
                    {HEADER_ACTIONS.viewAllKeywords} <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="mt-2.5 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className={TH}>Keyword</th>
                            <th className={TH}>Count</th>
                            <th className={TH}>Density</th>
                            <th className={TH}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {KEYWORDS.map((row) => (
                            <tr key={row.keyword} className="hover:bg-gray-50/60">
                                <td className={TD}>{row.keyword}</td>
                                <td className={TD}>{row.count}</td>
                                <td className={TD}>{row.density}</td>
                                <td className={TD}>
                                    <span className={"inline-flex min-w-[64px] justify-center rounded-md px-2 py-0.5 text-[11px] font-medium " + (row.status === "Good" ? PILL.good : PILL.bad)}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PageInformationCard() {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Page Information</h2>
            <div className="mt-2 flex flex-1 flex-col">
                {PAGE_INFO.map((row) => (
                    <div
                        key={row.label}
                        className="grid flex-1 grid-cols-[92px_minmax(0,1fr)] items-center gap-2 border-b border-gray-100 py-1.5 last:border-b-0"
                    >
                        <span className="text-[13px] text-muted">{row.label}</span>
                        {row.indexed ? (
                            <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#07865a]">
                                <Check className="h-3.5 w-3.5" />
                                Indexed
                            </span>
                        ) : (
                            <span className="flex items-center justify-end gap-1 truncate text-right text-[13px] text-gray-700">
                                <span className="truncate">{row.value}</span>
                                {row.link && <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContentStructureCard({ rows }) {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-semibold">Content Structure</h2>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[9px] text-muted">i</span>
            </div>

            <div className="mt-2 flex flex-1 flex-col">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="grid flex-1 grid-cols-[minmax(0,1fr)_50px_auto] items-center gap-3 border-b border-gray-100 py-[7px] last:border-b-0"
                    >
                        <span className="truncate text-xs text-muted">{row.label}</span>
                        <strong className="text-right text-xs font-medium text-ink">{row.value}</strong>
                        <span className={"inline-flex min-w-[86px] justify-center rounded-md px-2 py-0.5 text-[11px] font-medium " + (row.tone === "good" ? PILL.good : PILL.warn)}>
                            {row.note}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RichResultsCard() {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Rich Results &amp; SERP Features</h2>
            <div className="mt-2 flex flex-1 flex-col">
                {RICH_RESULTS_WITH_ICONS.map((row) => {
                    const Icon = row.icon;
                    return (
                        <button
                            key={row.label}
                            onClick={() => alert(`${row.label}: ${row.status}`)}
                            className="flex flex-1 items-center gap-2.5 border-b border-gray-100 py-[6px] text-left transition last:border-b-0 hover:bg-gray-50/60"
                        >
                            <Icon className="h-4 w-4 shrink-0 text-primary" />
                            <span className="min-w-0 flex-1 truncate text-xs text-gray-700">{row.label}</span>
                            <span className={"inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium " + PILL[row.tone]}>
                                {row.tone === "good" && <Check className="mr-1 h-3 w-3" />}
                                {row.tone === "bad" && <span className="mr-1">!</span>}
                                {row.status}
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function AiBanner({ title, text, optimizeStatus, onOptimize }) {
    return (
        <div className="relative flex shrink-0 items-center overflow-hidden rounded-xl border border-[#d4efe5] bg-[radial-gradient(ellipse_at_72%_100%,rgba(112,222,174,.22),transparent_35%),#e8faf4] px-5 py-2.5">
            <div className="absolute right-[120px] top-2 h-20 w-[320px] rounded-full border border-primary/10"></div>
            <div className="mr-3.5 flex h-9 w-9 shrink-0 items-center justify-center text-primary">
                <Sparkles className="h-6 w-6" />
            </div>
            <div className="relative z-10 min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold">{title}</h2>
                <p className="truncate text-[11px] text-muted">{text}</p>
            </div>
            <button
                onClick={onOptimize}
                disabled={optimizeStatus === "loading"}
                className="relative z-10 ml-3 flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-dark px-4 py-2 text-xs font-semibold text-white hover:bg-primary"
            >
                {optimizeStatus === "loading" && (
                    <>Optimizing... <LoaderCircle className="h-3.5 w-3.5 animate-spin" /></>
                )}
                {optimizeStatus === "done" && (
                    <>Optimization Ready <Check className="h-3.5 w-3.5" /></>
                )}
                {optimizeStatus === "idle" && (
                    <>Optimize with AI <ArrowRight className="h-3.5 w-3.5" /></>
                )}
            </button>
        </div>
    );
}

/* ===================== MAIN PAGE ===================== */

export default function OnPageSeo() {
    const navigate = useNavigate();
    const [selectedUrl, setSelectedUrl] = useState(DEFAULT_PAGE_URL);
    const [activeTab, setActiveTab] = useState(MAIN_TAB_KEYS[0].label);
    const [showDetailedReport, setShowDetailedReport] = useState(false);
    const [reportActiveTab, setReportActiveTab] = useState(REPORT_TAB_KEYS[0].label);
    const [activeFilter, setActiveFilter] = useState("all");
    const [fixedIssues, setFixedIssues] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [reanalyzeStatus, setReanalyzeStatus] = useState("idle");
    const [optimizeStatus, setOptimizeStatus] = useState("idle");

    const pickUrl = () => {
        const newUrl = prompt("Enter page URL:", selectedUrl);
        if (newUrl && newUrl.trim()) setSelectedUrl(newUrl.trim());
    };

    const viewLive = () => {
        if (/^https?:\/\//.test(selectedUrl)) {
            window.open(selectedUrl, "_blank");
        } else {
            alert(FEEDBACK.invalidUrl);
        }
    };

    const viewDetailedReport = () => setShowDetailedReport(true);
    const viewMainPage = () => setShowDetailedReport(false);

    const reAnalyze = () => {
        if (reanalyzeStatus === "loading") return;
        setReanalyzeStatus("loading");
        setTimeout(() => {
            setReanalyzeStatus("done");
            alert(FEEDBACK.analyzeDone(selectedUrl));
            setTimeout(() => setReanalyzeStatus("idle"), 2000);
        }, 1500);
    };

    const downloadReport = () => alert(FEEDBACK.downloadStarted);

    const shareReport = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(selectedUrl).catch(() => {});
        alert(FEEDBACK.linkCopied);
    };

    const fixIssue = (issueId, issueText) => {
        if (fixedIssues.includes(issueId)) return;
        const confirmed = confirm(FEEDBACK.fixConfirm(issueText));
        if (confirmed) setFixedIssues((prev) => [...prev, issueId]);
    };

    const optimizeWithAi = () => {
        if (optimizeStatus === "loading") return;
        setOptimizeStatus("loading");
        setTimeout(() => {
            setOptimizeStatus("done");
            alert(FEEDBACK.aiReady);
            setTimeout(() => setOptimizeStatus("idle"), 2000);
        }, 1500);
    };

    const issueSet = showDetailedReport ? ISSUES : MAIN_ISSUES;
    const filterSet = showDetailedReport ? FILTERS : MAIN_FILTERS;
    const filteredIssues = activeFilter === "all" ? issueSet : issueSet.filter((row) => row.status === activeFilter);
    const visibleIssues = filteredIssues.slice(0, pageSize);

    /* ---------- header actions ---------- */

    const mainHeaderActions = (
        <>
            <button
                onClick={pickUrl}
                className="flex h-9 max-w-[320px] items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs text-gray-700 transition hover:border-primary/50 hover:text-primary"
            >
                <span className="text-xs font-bold text-[#4285f4]">G</span>
                <span className="truncate">{selectedUrl}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
            </button>
            <button
                onClick={() => alert(FEEDBACK.pickDate)}
                className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50 hover:text-primary"
            >
                <Calendar className="h-3.5 w-3.5 text-muted" />
                {HEADER_ACTIONS.analysisDate}
                <ChevronDown className="h-3.5 w-3.5 text-muted" />
            </button>
        </>
    );

    const reportHeaderActions = (
        <>
            <button
                onClick={reAnalyze}
                disabled={reanalyzeStatus === "loading"}
                className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50 hover:text-primary"
            >
                {reanalyzeStatus === "loading" && (
                    <>Re-analyzing... <LoaderCircle className="h-3.5 w-3.5 animate-spin" /></>
                )}
                {reanalyzeStatus === "done" && (
                    <>Done <Check className="h-3.5 w-3.5" /></>
                )}
                {reanalyzeStatus === "idle" && (
                    <>Re-analyze <RefreshCw className="h-3.5 w-3.5" /></>
                )}
            </button>
            <button
                onClick={downloadReport}
                className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50 hover:text-primary"
            >
                <Download className="h-3.5 w-3.5" />
                {HEADER_ACTIONS.download}
            </button>
            <button
                onClick={shareReport}
                className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50 hover:text-primary"
            >
                <Share2 className="h-3.5 w-3.5" />
                {HEADER_ACTIONS.share}
            </button>
        </>
    );

    /* ---------- render ---------- */

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto [scrollbar-width:thin] pb-1">

            {/* HEADER */}
            <SharedHeader
                onBack={showDetailedReport ? viewMainPage : undefined}
                title={showDetailedReport ? PAGE_HEADERS.reportTitle : PAGE_HEADERS.mainTitle}
                subtitle={
                    showDetailedReport ? (
                        <span className="flex items-center gap-1">
                            {selectedUrl}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                        </span>
                    ) : (
                        PAGE_HEADERS.mainSubtitle
                    )
                }
                actions={showDetailedReport ? reportHeaderActions : mainHeaderActions}
            />

            {/* TABS */}
            {!showDetailedReport ? (
                <TabNav tabs={MAIN_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            ) : (
                <TabNav tabs={REPORT_TABS} activeTab={reportActiveTab} onTabChange={setReportActiveTab} />
            )}

            {/* ============ MAIN PAGE: RECOMMENDATIONS VIEW ============ */}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[0].label && (
                <>
                    {/* TOP ROW: SCORE / KEY METRICS / GOOGLE PREVIEW */}
                    <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-3">
                        <OnPageScoreCard onViewReport={viewDetailedReport} />
                        <KeyMetricsCard />
                        <PreviewOnGoogleCard selectedUrl={selectedUrl} viewLive={viewLive} />
                    </div>

                    {/* MIDDLE ROW: ISSUES / KEYWORD USAGE + CONTENT STRUCTURE */}
                    <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <IssuesTable
                            variant="main"
                            filters={filterSet}
                            visibleIssues={visibleIssues}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            onViewAll={() => alert(ALERTS.viewAllIssues)}
                            fixedIssues={fixedIssues}
                            fixIssue={fixIssue}
                        />

                        <div className="flex shrink-0 flex-col gap-3">
                            <KeywordUsageBars />
                            <ContentStructureCard rows={MAIN_STRUCTURE} />
                        </div>
                    </div>

                    <AiBanner
                        title={MAIN_BANNER.title}
                        text={MAIN_BANNER.text}
                        optimizeStatus={optimizeStatus}
                        onOptimize={optimizeWithAi}
                    />
                </>
            )}

            {/* ============ MAIN PAGE: SUBPAGE TABS ============ */}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[1].label && <ContentAnalysisTab />}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[2].label && <HtmlElementsTab />}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[3].label && <ImagesTab />}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[4].label && <InternalLinksTab />}
            {!showDetailedReport && activeTab === MAIN_TAB_KEYS[5].label && <PageSpeedTab />}

            {/* ============ DETAILED REPORT: OVERVIEW TAB ============ */}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[0].label && (
                <>
                    {/* TOP ROW: SCORE / SCORE BREAKDOWN / GOOGLE PREVIEW */}
                    <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-3">
                        <OnPageScoreCard />
                        <ScoreBreakdownCard />
                        <PreviewOnGoogleCard selectedUrl={selectedUrl} viewLive={viewLive} />
                    </div>

                    {/* MIDDLE ROW: ISSUES / PAGE INFORMATION */}
                    <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <IssuesTable
                            variant="report"
                            filters={filterSet}
                            visibleIssues={visibleIssues}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            onViewAll={() => alert(ALERTS.viewAllIssues)}
                            fixedIssues={fixedIssues}
                            fixIssue={fixIssue}
                        />
                        <PageInformationCard />
                    </div>

                    {/* BOTTOM ROW: KEYWORD USAGE / CONTENT STRUCTURE / RICH RESULTS */}
                    <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-3">
                        <KeywordUsageTable />
                        <ContentStructureCard rows={STRUCTURE} />
                        <RichResultsCard />
                    </div>

                    <AiBanner
                        title={REPORT_BANNER.title}
                        text={REPORT_BANNER.text}
                        optimizeStatus={optimizeStatus}
                        onOptimize={optimizeWithAi}
                    />
                </>
            )}

            {/* ============ DETAILED REPORT: SUBPAGE TABS ============ */}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[1].label && <ContentAnalysisTab />}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[2].label && <HtmlElementsTab />}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[3].label && <ImagesTab />}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[4].label && <InternalLinksTab />}
            {showDetailedReport && reportActiveTab === REPORT_TAB_KEYS[5].label && <PageSpeedTab />}

        </div>
    );
}
