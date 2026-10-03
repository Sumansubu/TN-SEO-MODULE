/* Centralized theme — colors, status mappings, chart configs, table definitions, and UI strings
   so that NO graph color or hardcoded content string lives in a component. */

/* ===================== COLORS ===================== */
/* Graph / UI colors.  Reference these by key from data modules and components. */
export const COLORS = {
    primary: "#079b61",
    primaryDark: "#006f49",
    mint: "#0bb568",
    mintLight: "#e9f9f2",
    emerald: "#0bb568",
    emeraldDark: "#07865a",
    green: "#07865a",
    amber: "#f5a623",
    amberDark: "#d99516",
    red: "#d94a4a",
    redDark: "#e05252",
    gray: {
        50: "#f7f8fa",
        100: "#e2e7e8",
        200: "#d1d5db",
        300: "#9ca3af",
        400: "#6b7280",
        700: "#374151",
    },
    // chart series colors
    chartGreen: "#08a967",
    chartPurple: "#883ce8",
    chartOrange: "#ed971b",
    chartBlue: "#3b82f6",
    blue: "#4285f4",
    blueDark: "#175bc3",
    purple: "#7c5cf0",
    purpleLight: "#f1edfd",

    // gauge track colors
    gaugeTrack: "#e4ecec",
    gaugeGood: "#0bb568",
    gaugeWarn: "#f5a623",

    // sidebar gradients
    sidebarUpgradeFrom: "#0a5344",
    sidebarUpgradeTo: "#074236",
    sidebarActiveBg: "#078a5b",
    crownBg: "#ffd76a",
    userBg: "#073e35",
    upgradeBtn: "#13b76d",

    // CTA banner
    ctaGradient: "radial-gradient(120%_160%_at_85%_0%,#d8f8e9_0%,#f2fbf7_45%,#ffffff_100%)",
    aiBannerGradient: "radial-gradient(ellipse_at_72%_100%,rgba(112,222,174,.22),transparent_35%)",

    // competitor analysis — series + stacked-bar palettes
    compYou: "#3b82f6",
    compThem: "#08a967",
    compPending: "#9ca3af",
    compBacklinkText: "#4285f4",
    compBacklinkImage: "#6da5f8",
    compBacklinkForm: "#9ec5fb",
    compBacklinkFrame: "#cfe0fd",
    compFollow: "#7c5cf0",
    compNofollow: "#c4b5fd",

    // component-specific colors
    contentBg: "#fafcfc",
    insightsBg: "#effcf7",
    hoverMint: "#effaf5",
    tipCheck: "#16a34a",
    aiBannerBorder: "#d4efe5",
};

/* ===================== STATUS MAPPINGS ===================== */
/* Impact levels -> color classes + display labels */
export const IMPACT = {
    high: { label: "High", color: "text-[#df4949] font-semibold" },
    medium: { label: "Medium", color: "text-[#db9a1d] font-medium" },
    low: { label: "Low", color: "text-muted" },
};

/* Issue tone -> background color class (for the circular badge in SEO Issues) */
export const ISSUE_TONE_BG = {
    good: "bg-emerald-500",
    bad: "bg-[#e05252]",
    warn: "bg-[#e8a317]",
};

/* Issue status -> PILL tone key */
export const STATUS_TO_PILL = {
    error: "bad",
    warning: "warn",
    passed: "good",
};

/* Status -> display label */
export const STATUS_LABEL = {
    error: "Error",
    warning: "Warning",
    passed: "Passed",
};

/* SEO issues status -> PILL tone + label */
export const ISSUE_STATUS = {
    error: { pill: "bad", label: "Error" },
    warning: { pill: "warn", label: "Warning" },
    passed: { pill: "good", label: "Passed" },
};

/* ===================== CHART CONFIG ===================== */
/* Default gauge track color and the good/warn threshold colors */
export const GAUGE_CONFIG = {
    track: COLORS.gaugeTrack,
    good: COLORS.gaugeGood,
    warn: COLORS.gaugeWarn,
    goodThreshold: 70,
};

/* Progress bar default fill color */
export const PROGRESS_CONFIG = {
    fill: COLORS.mint,
    track: "#e5e6e6",
};

/* ===================== TABLE COLUMNS ===================== */
export const TABLE_HEADERS = {
    topPages: ["Page", "Traffic", "Kw", ""],
    keywordRankings: ["Keyword", "Pos", "Chg"],
    issuesReport: ["#", "Issue", "Category", "Impact", "Status", "Recommendation", "Action"],
    issuesMain: ["#", "Issue", "Status", "Impact", "Action"],
    keywordUsage: ["Keyword", "Count", "Density", "Status"],
    performance: ["Metric", "Score", "Status", "Details", "Action"],
    htmlElements: ["Element", "Status", "Details", "Action"],
    imageAnalysis: ["Image", "File Name", "Alt Text", "Size", "Status", "Action"],
    internalLinks: ["Link", "Link Text", "Status", "Action"],
    recommendedLinks: ["Page", "Suggested Anchor Text", "Relevance", "Action"],
    comparisonFeature: ["Feature", "Free", "Pro", "Business"],
    competitorMetrics: [
        "Domain / URL",
        "Authority Score",
        "Referring Domains",
        "Backlinks",
        "Referring IPs",
        "Monthly Visits",
        "Organic Traffic",
    ],
    competitorCategories: ["Categories"],
};

/* ===================== PAGE SIZE OPTIONS ===================== */
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

/* ===================== UI STRINGS ===================== */
export const STRINGS = {
    show: "Show",
    perPage: "per page",
    noIssues: "No issues in this category.",
    perMonth: "/month",
    freeForever: "Free forever",
    billedMonthly: "Billed monthly",
};

/* ===================== REMAINING ALERTS ===================== */
export const ALERTS_EXTRA = {
    viewDetailed: (issue) => `${issue.issue}\n\n${issue.recommendation}`,
    richResult: (label, status) => `${label}: ${status}`,
    viewAllKeywords: "Opening all content keywords...",
    elementUpdated: (element) => `${element} has been updated.`,
    altTextAdded: (file) => `Alt text added for ${file}.`,
    internalLinkAdded: (page) => `Internal link to ${page} added.`,
    optimizationApplied: (metric) => `${metric} optimization applied.`,
    dashboardIssueDetails: (title) => `Opening ${title} SEO details...`,
    applyContent: (action, element, details) => `${action}: ${element}

${details}

Apply this recommendation?`,
    applyHtml: (action, element, details) => `${action}: ${element}

${details}

Apply this change?`,
    addLinkConfirm: (page, anchor) => `Add an internal link to ${page}?

Suggested anchor text: "${anchor}"`,
    optimizeConfirm: (metric, score, details) => `${metric}: ${score} (${details})

Run optimization for this metric?`,
};
