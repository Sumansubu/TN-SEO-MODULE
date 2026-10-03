/* Competitor Analysis page data — RAW inputs only; every displayed value is computed. */

import { COLORS, TABLE_HEADERS } from "./theme.js";
import { formatCompact, monthRange, seriesPoints } from "./compute.js";

export const COMPETITOR_HEADER = {
    title: "Competitor Analysis",
    subtitle: "Compare your website with competitors to find opportunities and improve your SEO strategy.",
};

/* ---------- header controls ---------- */
/** dynamic: last option is the current calendar month */
export const DATE_RANGES = ["Last 7 days", "Last 30 days", monthRange()];
export const DEFAULT_DATE_RANGE = DATE_RANGES[2];

export const EXPORT_LABEL = "Export Report";
export const EXPORT_OPTIONS = [
    { id: "pdf", label: "Export as PDF", color: COLORS.red, Icon: "FileText" },
    { id: "csv", label: "Export as CSV", color: COLORS.green, Icon: "FileSpreadsheet" },
];

export const CHART_RANGES = ["Last 6 months", "Last 12 months", "All time"];
export const DEFAULT_CHART_RANGE = CHART_RANGES[1];

export const COMPARE_LABEL = "Compare";
export const CLEAR_LABEL = "Clear All";
export const YOU_BADGE = "You";
export const DOMAIN_PLACEHOLDER = "Add competitor";
export const DOMAIN_FIELDS = 2; // empty competitor inputs rendered by default
export const PENDING_VALUE = "—";

export const COMPETITOR_ALERTS = {
    compare: (domains) => `Comparing ${domains.join(" vs ")}...`,
    exported: (label) => `${label} export started.`,
    cleared: "Cleared all competitors. Your own domain is kept.",
    removed: (domain) => `Removed ${domain} from the comparison.`,
    emptyCompare: "Add at least one competitor before comparing.",
};

/* ---------- domains under comparison ---------- */
const RAW_DOMAINS = [
    {
        domain: "nike.com",
        isYou: true,
        score: 97,
        refDomains: 224000,
        backlinks: 860000000,
        refIps: 123000,
        visits: 209000000,
        traffic: 166000000,
    },
    {
        domain: "adidas.com",
        isYou: false,
        score: 80,
        refDomains: 112000,
        backlinks: 309000000,
        refIps: 72400,
        visits: 48100000,
        traffic: 15800000,
    },
];

export const METRIC_COLUMNS = [
    { key: "score", label: "Authority Score" },
    { key: "refDomains", label: "Referring Domains" },
    { key: "backlinks", label: "Backlinks" },
    { key: "refIps", label: "Referring IPs" },
    { key: "visits", label: "Monthly Visits" },
    { key: "traffic", label: "Organic Traffic" },
];

const bestByKey = Object.fromEntries(
    METRIC_COLUMNS.map(({ key }) => [key, Math.max(...RAW_DOMAINS.map((row) => row[key]))])
);

/** tracked domains, each metric formatted + flagged when it leads the set */
export const COMPETITOR_ROWS = RAW_DOMAINS.map((row) => ({
    domain: row.domain,
    isYou: row.isYou,
    color: row.isYou ? COLORS.compYou : COLORS.compThem,
    values: Object.fromEntries(
        METRIC_COLUMNS.map(({ key }) => [
            key,
            { text: formatCompact(row[key]), best: row[key] === bestByKey[key] },
        ])
    ),
}));

/** the chips the page starts with */
export const INITIAL_DOMAINS = RAW_DOMAINS.map(({ domain, isYou }) => ({ domain, isYou }));

/* ---------- organic traffic breakdown shown per row ---------- */
const RAW_TRAFFIC_SOURCES = [
    { domain: "nike.com", sources: [["Search", 65], ["Direct", 25], ["Referral", 10]] },
    { domain: "adidas.com", sources: [["Search", 65], ["Direct", 25], ["Referral", 10]] },
];

export const TRAFFIC_SOURCES = RAW_TRAFFIC_SOURCES.map(({ domain, sources }) => ({
    domain,
    sources: sources.map(([label, share]) => ({ label, share: `${share}%` })),
}));

export const TRAFFIC_SOURCES_TITLE = "Traffic Sources";

/** sources for a domain, empty for a freshly added one that has no data yet */
export const sourcesFor = (domain) => TRAFFIC_SOURCES.find((entry) => entry.domain === domain)?.sources ?? [];

/* ---------- trend charts ---------- */
const TREND_LABELS = ["Feb 2023", "May 2023", "Jul 2023", "Sep 2023", "Dec 2023"];
const TREND_GEOMETRY = { width: 700, height: 200, xPad: 20, yPad: 8 };

/** two series + axis labels -> svg polylines ready to render */
const buildTrend = ({ you, them, max, yFormat }) => ({
    labels: TREND_LABELS,
    width: TREND_GEOMETRY.width,
    height: TREND_GEOMETRY.height,
    yLabels: [max, (max * 2) / 3, max / 3, 0].map(yFormat),
    series: [you, them].map((values, index) => ({
        key: index === 0 ? "you" : "them",
        color: index === 0 ? COLORS.compYou : COLORS.compThem,
        points: seriesPoints(values, { ...TREND_GEOMETRY, maxValue: max }),
    })),
});

export const AUTHORITY_TREND = buildTrend({
    you: [88, 89, 89, 90, 92],
    them: [70, 71, 71, 73, 70],
    max: 100,
    yFormat: (value) => String(Math.round(value)),
});

export const REFERRING_TREND = buildTrend({
    you: [220000, 218000, 210000, 195000, 224000],
    them: [105000, 110000, 108000, 112000, 100000],
    max: 240000,
    yFormat: (value) => formatCompact(value),
});

/* ---------- stacked bars ---------- */
/** segment shares -> percentage widths so bars always fill the track */
const buildStacked = ({ title, segments, rows }) => ({
    title,
    segments,
    rows: rows.map(([domain, shares]) => {
        const total = shares.reduce((sum, value) => sum + value, 0) || 1;
        return {
            domain,
            parts: shares.map((value, index) => ({
                label: segments[index].label,
                color: segments[index].color,
                share: `${value}%`,
                width: `${(value / total) * 100}%`,
            })),
        };
    }),
});

export const BACKLINK_TYPES = buildStacked({
    title: "Backlink Types",
    segments: [
        { label: "Text", color: COLORS.compBacklinkText },
        { label: "Image", color: COLORS.compBacklinkImage },
        { label: "Form", color: COLORS.compBacklinkForm },
        { label: "Frame", color: COLORS.compBacklinkFrame },
    ],
    rows: [
        ["nike.com", [80, 15, 3, 2]],
        ["adidas.com", [70, 25, 3, 2]],
    ],
});

export const LINK_ATTRIBUTES = buildStacked({
    title: "Link Attributes",
    segments: [
        { label: "Follow", color: COLORS.compFollow },
        { label: "Nofollow + Sponsored + UGC", color: COLORS.compNofollow },
    ],
    rows: [
        ["nike.com", [90, 10]],
        ["adidas.com", [85, 15]],
    ],
});

/* ---------- top categories of referring domains ---------- */
const RAW_CATEGORIES = [
    { category: "Arts & Entertainment", you: 2500, them: 2900 },
    { category: "News", you: 2300, them: 2300 },
    { category: "Business & Industrial", you: 2200, them: 2200 },
    { category: "Internet & Telecom", you: 1400, them: 1500 },
    { category: "News > Broadcast & Network News", you: 1300, them: 1100 },
];

/** a tie leaves the cell unhighlighted */
export const CATEGORIES = RAW_CATEGORIES.map(({ category, you, them }) => {
    const best = you === them ? null : you > them ? "you" : "them";
    return {
        category,
        cells: {
            you: { text: formatCompact(you), best: best === "you" },
            them: { text: formatCompact(them), best: best === "them" },
        },
    };
});

export const CATEGORIES_HEADER = TABLE_HEADERS.competitorCategories[0];