/* Dashboard page data — RAW inputs only; every displayed value is computed. */

import { SCORE } from "./onPageSeo.js";import { COLORS } from "./theme.js";
import {
    formatCompact,
    monthRange,
    percentChange,
    seriesPoints,
    scoreBadge,
    sparkPoints,
    weeklyLabels,
} from "./compute.js";

export const DASHBOARD_HEADER = {
    title: "Dashboard",
    subtitle: "Your complete SEO overview with AI-powered insights.",
};

export const PERIODS = ["Last 7 days", "Last 30 days", "Last 90 days", "Last 6 months"];
export const DEFAULT_PERIOD = PERIODS[1];
/** dynamic: current calendar month */
export const DEFAULT_DATE_RANGE = monthRange();
export const DELTA_LABEL = "vs last month";

/* ---------- raw metric history (previous month vs current) ---------- */
const RAW_KPIS = [
    {
        id: "seo-health",
        title: "SEO Health Score",
        current: SCORE, // derived from the On-Page score breakdown (78)
        previous: 73.6,
        unit: "/100",
        sub: (score) => `${scoreBadge(score)} \u00b7 Keep improving`,
        viz: { type: "ring" },
    },
    {
        id: "organic-traffic",
        title: "Organic Traffic",
        current: 24600,
        previous: 20800,
        sub: () => "Sessions from search",
        viz: {
            type: "spark",
            color: COLORS.chartGreen,
            values: [20800, 21500, 21200, 22600, 22100, 23400, 23900, 24600],
        },
    },
    {
        id: "ranking-keywords",
        title: "Ranking Keywords",
        current: 1200,
        previous: 909,
        sub: () => `In Google top ${100}`,
        viz: {
            type: "spark",
            color: COLORS.chartPurple,
            values: [909, 950, 980, 1020, 1050, 1110, 1150, 1200],
        },
    },
    {
        id: "backlinks",
        title: "Backlinks",
        current: 12400,
        previous: 10250,
        sub: (value, { referringDomains }) => `Across ${referringDomains} referring domains`,
        viz: {
            type: "spark",
            color: COLORS.chartOrange,
            values: [10250, 10500, 10800, 11000, 11400, 11800, 12100, 12400],
        },
    },
];

const REFERRING_DOMAINS = 340;
const extra = { referringDomains: REFERRING_DOMAINS };

export const KPIS = RAW_KPIS.map((kpi) => {
    const delta = percentChange(kpi.previous, kpi.current);
    return {
        id: kpi.id,
        title: kpi.title,
        value: formatCompact(kpi.current),
        raw: kpi.current,
        unit: kpi.unit,
        delta: `${Math.abs(delta)}%`,
        deltaDir: delta >= 0 ? "up" : "down",
        sub: kpi.sub(kpi.current, extra),
        viz:
            kpi.viz.type === "ring"
                ? { type: "ring", value: Math.round(kpi.current) }
                : { type: "spark", color: kpi.viz.color, points: sparkPoints(kpi.viz.values) },
    };
});

/* ---------- traffic trend: values (thousands) -> generated chart geometry ---------- */
const TREND_VALUES_K = [4, 6, 9, 12, 12.5, 15, 17, 20, 21, 24, 25.5, 27, 29];
const TREND_MAX_K = 30;
const TREND_START = "2026-08-01";
const TREND_WIDTH = 700;
const TREND_HEIGHT = 220;
const TREND_LABEL_COUNT = 5;

export const TRAFFIC_TREND = {
    points: seriesPoints(TREND_VALUES_K, {
        width: TREND_WIDTH,
        height: TREND_HEIGHT,
        maxValue: TREND_MAX_K,
    }),
    yLabels: [TREND_MAX_K, (TREND_MAX_K * 2) / 3, TREND_MAX_K / 3, 0].map((v) =>
        v ? formatCompact(v * 1000) : "0"
    ),
    xLabels: weeklyLabels(TREND_START, TREND_LABEL_COUNT),
    width: TREND_WIDTH,
    height: TREND_HEIGHT,
    stroke: COLORS.chartGreen,
    dot: COLORS.primary,
    fill: COLORS.mint,
};

/* ---------- AI insights built from the same raw numbers ---------- */
const LOW_COMPETITION_KEYWORDS = 8;
const BACKLINK_GOAL = 5;
const META_MISSING = 12;
const IMAGES_MISSING = 9;
const LOAD_SECONDS = 2.8;

export const INSIGHTS = [
    {
        done: true,
        text: `Your organic traffic increased by ${percentChange(RAW_KPIS[1].previous, RAW_KPIS[1].current)}% this month.`,
    },
    { done: true, text: `${META_MISSING} pages are missing meta descriptions.` },
    { done: true, text: `Focus on creating content for ${LOW_COMPETITION_KEYWORDS} low-competition keywords.` },
    { done: false, text: `Build ${BACKLINK_GOAL} new high-quality backlinks this month.` },
];

/* ---------- tables: raw numbers formatted at render time ---------- */
export const TOP_PAGES = [
    { page: "/", traffic: 8400, keywords: 320 },
    { page: "/services/seo", traffic: 6200, keywords: 248 },
    { page: "/blog/ai-seo-tools", traffic: 3900, keywords: 186 },
    { page: "/technical-seo", traffic: 2100, keywords: 124 },
    { page: "/contact", traffic: 1300, keywords: 64 },
    { page: "/pricing", traffic: 1100, keywords: 58 },
    { page: "/blog/technical-seo-checklist", traffic: 946, keywords: 72 },
    { page: "/about", traffic: 812, keywords: 41 },
];

export const KEYWORD_RANKINGS = [
    { keyword: "tn nexora", position: 1, change: { dir: "up", value: 2 } },
    { keyword: "seo services", position: 3, change: { dir: "up", value: 1 } },
    { keyword: "digital marketing", position: 5, change: { dir: "down", value: 1 } },
    { keyword: "website seo audit", position: 7, change: { dir: "up", value: 3 } },
    { keyword: "backlink building", position: 9, change: null },
    { keyword: "seo audit tool", position: 12, change: { dir: "up", value: 4 } },
    { keyword: "local seo services", position: 14, change: { dir: "down", value: 2 } },
    { keyword: "on page seo checklist", position: 16, change: { dir: "up", value: 1 } },
];

/* ---------- issue summary: counts -> titles ---------- */
const ISSUE_COUNTS = { critical: 12, warnings: 28, passed: 56 };

export const SEO_ISSUES = [
    { title: `${ISSUE_COUNTS.critical} Critical`, sub: "Need immediate attention", tone: "bad", pill: "Error" },
    { title: `${ISSUE_COUNTS.warnings} Warnings`, sub: "May affect performance", tone: "warn", pill: "Warning" },
    { title: `${ISSUE_COUNTS.passed} Passed`, sub: "Everything looks good", tone: "good", pill: "Passed" },
    { title: "Missing Meta Descriptions", sub: `${META_MISSING} pages affected`, tone: "bad", pill: "Error" },
    { title: "Images Without Alt Text", sub: `${IMAGES_MISSING} images affected`, tone: "warn", pill: "Warning" },
    { title: `Slow Page Load (${LOAD_SECONDS}s)`, sub: "Core Web Vitals", tone: "warn", pill: "Warning" },
];

export const UPGRADE_CTA = {
    title: "Take Your SEO to the Next Level",
    text: "Unlock advanced audits, unlimited AI insights, and competitor tracking with Pro.",
    button: "Upgrade Plan",
};
