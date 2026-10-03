/* On-Page SEO page data — raw inputs; statuses, densities, and badges are computed. */

import { COLORS } from "./theme.js";
import { densityPercent, metricStatus, scoreBadge, scoreColor } from "./compute.js";

export const DEFAULT_PAGE_URL = "https://example.com/blog/seo-strategies";

/** shared raw metrics other values derive from */
export const WORD_COUNT = 1042;
export const PARAGRAPH_COUNT = 12;
export const IMAGE_COUNT = 3;
export const HEADING_COUNTS = { h1: 1, h2: 4, h3: 8 };

/* ============ TABS ============ */
export const MAIN_TAB_KEYS = [
    { label: "Recommendations", icon: "clock" },
    { label: "Content Analysis", icon: "file-text" },
    { label: "HTML Elements", icon: "code-2" },
    { label: "Images", icon: "image" },
    { label: "Internal Links", icon: "link-2" },
    { label: "Page Speed", icon: "gauge" },
];

export const REPORT_TAB_KEYS = [
    { label: "Overview", icon: "file-text" },
    { label: "Content Analysis", icon: "file-text" },
    { label: "HTML Elements", icon: "code-2" },
    { label: "Images", icon: "image" },
    { label: "Internal Links", icon: "link-2" },
    { label: "Page Speed", icon: "gauge" },
];

/* ============ SCORES ============ */
/* raw per-category scores; the page score is their average */
const RAW_BREAKDOWN = [
    { label: "Content", score: 82 },
    { label: "HTML Elements", score: 85 },
    { label: "Images", score: 68 },
    { label: "Internal Links", score: 74 },
    { label: "Page Speed", score: 81 },
];

const LOW_SCORE_COLOR = COLORS.gaugeWarn;

export const BREAKDOWN = RAW_BREAKDOWN.map((row) => ({
    ...row,
    ...(row.score < 70 ? { color: LOW_SCORE_COLOR } : {}),
}));

export const SCORE = Math.round(BREAKDOWN.reduce((sum, row) => sum + row.score, 0) / BREAKDOWN.length);

export const SCORE_SUMMARY = {
    badge: scoreBadge(SCORE),
    description: "Your page is well optimized, but there are some key areas to improve.",
};

/* raw scores; status/tone computed from the score */
const RAW_KEY_METRICS = [
    { label: "Title Score", score: 85 },
    { label: "Meta Description", score: 72 },
    { label: "Headings", score: 90 },
    { label: "Images", score: 68 },
];

export const KEY_METRICS = RAW_KEY_METRICS.map((row) => ({
    ...row,
    ...metricStatus(row.score),
}));

export const SERP_PREVIEW = {
    title: "10 Proven SEO Strategies for Small Businesses in 2026",
    description:
        "Discover practical SEO strategies for small businesses to improve search rankings, drive traffic, and grow online in 2026.",
    richResultNotice: "Your page is eligible for rich results.",
};

/* ============ ISSUES ============ */
export const ISSUES = [
    { id: 1, issue: "Meta description is too short", category: "Meta", impact: "high", status: "error", recommendation: "Write a compelling meta description (120\u2013160 characters)." },
    { id: 2, issue: "Primary keyword not in H1", category: "HTML", impact: "high", status: "error", recommendation: "Include primary keyword in your H1 tag." },
    { id: 3, issue: "Add alt text to 3 images", category: "Images", impact: "medium", status: "warning", recommendation: "Add descriptive alt text for all images." },
    { id: 4, issue: "Use primary keyword in URL", category: "URL", impact: "medium", status: "warning", recommendation: "Include target keyword in the URL slug." },
    { id: 5, issue: "Add internal links to relevant pages", category: "Internal Links", impact: "medium", status: "warning", recommendation: "Link to 3\u20135 relevant internal pages." },
    { id: 6, issue: "Title tag exceeds 60 characters", category: "Meta", impact: "medium", status: "warning", recommendation: "Shorten your title tag to under 60 characters." },
    { id: 7, issue: "Missing structured data markup", category: "HTML", impact: "medium", status: "warning", recommendation: "Add JSON-LD structured data to your page." },
    { id: 8, issue: "Content depth is thin in lower sections", category: "Content", impact: "medium", status: "warning", recommendation: "Expand thin sections with more useful detail." },
    { id: 9, issue: "Title tag is well optimized", category: "Meta", impact: "low", status: "passed", recommendation: "Keep your title under 60 characters." },
    { id: 10, issue: "H1 tag is present and unique", category: "HTML", impact: "low", status: "passed", recommendation: "Maintain a single unique H1 per page." },
    { id: 11, issue: "Canonical URL is correctly set", category: "URL", impact: "low", status: "passed", recommendation: "No change required." },
    { id: 12, issue: "Page is mobile friendly", category: "Content", impact: "low", status: "passed", recommendation: "Keep the responsive viewport meta tag." },
];

const countBy = (rows, status) => rows.filter((row) => row.status === status).length;

const buildFilters = (rows) => [
    { key: "all", label: `All (${rows.length})` },
    { key: "error", label: `Errors (${countBy(rows, "error")})` },
    { key: "warning", label: `Warnings (${countBy(rows, "warning")})` },
    { key: "passed", label: `Passed (${countBy(rows, "passed")})` },
];

export const FILTERS = buildFilters(ISSUES);

/* The Recommendations view tracks a shorter, top-priority issue list (8 items),
   while the Detailed Report lists every finding (12 items). */
export const MAIN_ISSUES = [
    { id: 101, issue: "Meta description is too short", impact: "high", status: "error", recommendation: "Write a compelling meta description (120\u2013160 characters)." },
    { id: 102, issue: "Primary keyword not found in H1", impact: "high", status: "error", recommendation: "Include primary keyword in your H1 tag." },
    { id: 103, issue: "Add alt text to 3 images", impact: "medium", status: "warning", recommendation: "Add descriptive alt text for all images." },
    { id: 104, issue: "Use primary keyword in URL", impact: "medium", status: "warning", recommendation: "Include target keyword in the URL slug." },
    { id: 105, issue: "Add internal links to relevant pages", impact: "medium", status: "warning", recommendation: "Link to 3\u20135 relevant internal pages." },
    { id: 106, issue: "Title tag exceeds 60 characters", impact: "medium", status: "warning", recommendation: "Shorten your title tag to under 60 characters." },
    { id: 107, issue: "H1 tag is present and unique", impact: "low", status: "passed", recommendation: "Maintain a single unique H1 per page." },
    { id: 108, issue: "Canonical URL is correctly set", impact: "low", status: "passed", recommendation: "No change required." },
];

export const MAIN_FILTERS = buildFilters(MAIN_ISSUES);

/* ============ PAGE INFO / KEYWORDS / STRUCTURE ============ */
export const PAGE_INFO = [
    { label: "URL", value: DEFAULT_PAGE_URL, link: true },
    { label: "Last Analyzed", value: "Sep 15, 2026, 10:30 AM" },
    { label: "Content Type", value: "Blog Post" },
    { label: "Word Count", value: WORD_COUNT.toLocaleString("en-US") },
    { label: "Language", value: "English" },
    { label: "Index Status", value: "Indexed", indexed: true },
    { label: "Canonical URL", value: DEFAULT_PAGE_URL, link: true },
];

/* raw counts; density and status computed */
const RAW_KEYWORDS = [
    { keyword: "seo strategies", count: 12 },
    { keyword: "small business seo", count: 8 },
    { keyword: "seo tips", count: 6 },
    { keyword: "search engine optimization", count: 4 },
];

const GOOD_DENSITY_MIN = 0.5;

export const KEYWORDS = RAW_KEYWORDS.map((row) => {
    const density = Math.round((row.count / WORD_COUNT) * 1000) / 10;
    return {
        ...row,
        density: densityPercent(row.count, WORD_COUNT),
        status: density >= GOOD_DENSITY_MIN ? "Good" : "Low",
    };
});

export const CONTENT_KEYWORDS = [
    { keyword: "seo strategies", used: 3, target: 5 },
    { keyword: "small business seo", used: 1, target: 3 },
    { keyword: "seo tips", used: 2, target: 3 },
    { keyword: "search engine optimization", used: 1, target: 3 },
];

/* derived from the shared raw metrics */
export const STRUCTURE = [
    { label: "Headings (H1, H2, H3)", value: `${HEADING_COUNTS.h1}, ${HEADING_COUNTS.h2}, ${HEADING_COUNTS.h3}`, tone: "good", note: "Good" },
    { label: "Paragraphs", value: String(PARAGRAPH_COUNT), tone: "good", note: "Good" },
    { label: "Images", value: String(IMAGE_COUNT), tone: "warn", note: `Needs ${IMAGE_COUNT} ALT` },
    { label: "Internal Links", value: "2", tone: "warn", note: "Needs More" },
    { label: "External Links", value: "5", tone: "good", note: "Good" },
];

export const MAIN_STRUCTURE = [
    { label: "Word Count", value: WORD_COUNT.toLocaleString("en-US"), tone: "good", note: "Good" },
    { label: "Headings (H1, H2, H3)", value: `${HEADING_COUNTS.h1}, ${HEADING_COUNTS.h2}, ${HEADING_COUNTS.h3}`, tone: "good", note: "Good" },
    { label: "Paragraphs", value: String(PARAGRAPH_COUNT), tone: "good", note: "Good" },
    { label: "Images", value: String(IMAGE_COUNT), tone: "warn", note: `Add ${IMAGE_COUNT} more` },
    { label: "Internal Links", value: "2", tone: "warn", note: "Add more" },
];

/* ============ RICH RESULTS (icon: lucide component name key) ============ */
export const RICH_RESULTS = [
    { label: "Featured Snippet", icon: "sparkles", status: "Not Optimized", tone: "bad" },
    { label: "FAQ Rich Result", icon: "help-circle", status: "Not Optimized", tone: "bad" },
    { label: "How-to Rich Result", icon: "list-checks", status: "Not Applicable", tone: "neutral" },
    { label: "Breadcrumbs", icon: "layers", status: "Eligible", tone: "good" },
    { label: "Sitelinks", icon: "link-2", status: "Eligible", tone: "good" },
];

/* ============ AI BANNERS ============ */
export const MAIN_BANNER = {
    title: "Boost Your On-Page SEO with AI",
    text: "Get personalized recommendations to improve your page's SEO and rank higher.",
};

export const REPORT_BANNER = {
    title: "Optimize Your Page with AI",
    text: "Get personalized, step-by-step recommendations to improve your page's SEO and rank higher.",
};

/* ============ CONTENT ANALYSIS TAB ============ */
/* tint: key into TINTS (see src/data/ui.js); omitted = default green */
export const CONTENT_OVERVIEW = [
    { stat: "word-count", value: WORD_COUNT.toLocaleString("en-US"), label: "Word Count" },
    { stat: "paragraphs", value: String(PARAGRAPH_COUNT), label: "Paragraphs", tint: "purple" },
    { stat: "read-time", value: `${Math.max(1, Math.round(WORD_COUNT / 250))} min`, label: "Read Time", tint: "blue" },
];

/* raw score; badge derived */
export const CONTENT_SCORE = {
    score: 78,
    badge: scoreBadge(78),
    description: "Well-structured content with good keyword usage, but can be improved.",
};

export const CONTENT_ROWS = [
    { element: "Content Length", status: "Good", tone: "good", details: "1,042 words (Recommended: 800\u20131,500)", action: null },
    { element: "Keyword Usage", status: "Good", tone: "good", details: "Primary keyword used 3/5 times", action: "Optimize" },
    { element: "Keyword Density", status: "Medium", tone: "warn", details: "0.8% (Recommended: 1\u20132%)", action: "Improve" },
    { element: "Readability", status: "Good", tone: "good", details: "Easy to read (65/100)", action: null },
    { element: "Content Structure", status: "Good", tone: "good", details: "Well structured with proper flow", action: null },
    { element: "Duplicate Content", status: "Passed", tone: "good", details: "No duplicate content found", action: null },
];

export const LIVE_TABS = ["Sentences", "Keywords", "Topics"];

export const LIVE_SNIPPETS = {
    Sentences: [
        "Discover practical SEO strategies for small businesses to improve search rankings, drive traffic, and grow online in 2026.",
        "Learn actionable tips, tools, and best practices to boost your website visibility.",
        "Start with keyword research, then optimize your titles, meta descriptions, and internal links.",
    ],
    Keywords: [
        { term: "seo strategies", count: 3 },
        { term: "small business seo", count: 1 },
        { term: "seo tips", count: 2 },
        { term: "search engine optimization", count: 1 },
    ],
    Topics: ["Keyword Research", "On-Page Optimization", "Content Structure", "Link Building", "Technical SEO"],
};

export const HIGHLIGHT_TERMS = ["SEO strategies", "small businesses", "search rankings", "drive traffic", "grow online"];

export const CONTENT_SUMMARY =
    "Discover practical SEO strategies for small businesses to improve search rankings, drive traffic, and grow online in 2026. Learn actionable tips, tools, and best practices to boost your website visibility.";

/* ============ HTML ELEMENTS TAB ============ */
/* raw scores; badge (and gauge color) derived */
export const HTML_SCORE = {
    score: 85,
    badge: scoreBadge(85),
    description: "Your HTML elements are well optimized with a few improvements suggested.",
};

export const HTML_ROWS = [
    { element: "Title Tag", status: "Good", tone: "good", details: "10 Proven SEO Strategies for Small Businesses in 2026 (58 characters)", action: "Edit" },
    { element: "Meta Description", status: "Warning", tone: "warn", details: "Meta description is too short (92/120 characters)", action: "Optimize" },
    { element: "H1 Tag", status: "Good", tone: "good", details: "H1 tag found with primary keyword", action: null },
    { element: "H2 Tags", status: "Good", tone: "good", details: "8 H2 tags found with good structure", action: null },
    { element: "H3 Tags", status: "Passed", tone: "good", details: "12 H3 tags found", action: null },
    { element: "Canonical Tag", status: "Good", tone: "good", details: "Canonical URL is set", action: null },
    { element: "Meta Robots", status: "Good", tone: "good", details: "Index, Follow", action: null },
    { element: "Schema Markup", status: "Missing", tone: "bad", details: "No structured data found", action: "Add Schema" },
    { element: "Open Graph Tags", status: "Good", tone: "good", details: "Open Graph tags are set", action: null },
    { element: "Twitter Card", status: "Good", tone: "good", details: "Twitter card meta tags are set", action: null },
];

/* tint: key into TINTS (see src/data/ui.js) */
export const HTML_QUICK_STATS = [
    { badge: "H1", value: 1, label: "H1 Tags", tint: "green" },
    { badge: "H2", value: 8, label: "H2 Tags", tint: "blue" },
    { badge: "H3", value: 12, label: "H3 Tags", tint: "yellow" },
    { badge: "T", value: 1, label: "Title Tag", tint: "purple" },
    { badge: "M", value: 1, label: "Meta Description", tint: "green" },
];

/* ============ IMAGES TAB ============ */
export const IMAGES_SCORE = {
    score: 68,
    color: scoreColor(68),
    badge: scoreBadge(68),
    description: "Optimize your images with proper alt text and compression.",
};

export const IMAGE_ROWS = [
    { file: "seo-strategies-1.jpg", alt: "", size: "245 KB" },
    { file: "seo-strategies-2.jpg", alt: "", size: "412 KB" },
    { file: "seo-strategies-3.jpg", alt: "SEO strategies infographic", size: "180 KB" },
];

export const IMAGE_TIPS = [
    "Add descriptive alt text for all images using relevant keywords.",
    "Compress images to reduce file size (recommended: < 200 KB).",
    "Use modern formats like WebP for better performance.",
    "Include relevant images to make content more engaging.",
];

/* ============ INTERNAL LINKS TAB ============ */
export const LINKS_SCORE = {
    score: 72,
    badge: scoreBadge(72),
    description: "Your page has some internal links; add more to improve SEO value.",
};

export const INTERNAL_LINKS = [
    { href: "/blog/keyword-research", text: "keyword research", status: "Good" },
    { href: "/blog/technical-seo", text: "technical SEO", status: "Good" },
];

export const SUGGESTED_LINKS = [
    { page: "/blog/page-seo", anchor: "on-page SEO", relevance: "High" },
    { page: "/blog/backlink-strategy", anchor: "backlink strategy", relevance: "High" },
    { page: "/blog/seo-tools", anchor: "SEO tools", relevance: "Medium" },
    { page: "/services/seo", anchor: "our SEO services", relevance: "Medium" },
    { page: "/blog/seo-audit", anchor: "SEO audit guide", relevance: "Medium" },
];

export const BROKEN_LINK_COUNT = 0;

/* ============ PAGE SPEED TAB ============ */
export const SPEED_SCORE = {
    score: 82,
    badge: scoreBadge(82),
    description: "Your page loads quickly, but a few optimizations can make it faster.",
};

export const CORE_WEB_VITALS = [
    { value: "1.2s", label: "LCP", status: "Good" },
    { value: "32ms", label: "INP", status: "Good" },
    { value: "0.05", label: "CLS", status: "Good" },
];

export const PERFORMANCE_ROWS = [
    { metric: "Largest Contentful Paint (LCP)", score: "1.2s", status: "Good", tone: "good", details: "Target: < 2.5s", action: null },
    { metric: "Interaction to Next Paint (INP)", score: "32ms", status: "Good", tone: "good", details: "Target: < 200ms", action: null },
    { metric: "Cumulative Layout Shift (CLS)", score: "0.05", status: "Good", tone: "good", details: "Target: < 0.1", action: null },
    { metric: "First Contentful Paint (FCP)", score: "0.8s", status: "Good", tone: "good", details: "Target: < 1.8s", action: null },
    { metric: "Time to First Byte (TTFB)", score: "180ms", status: "Good", tone: "good", details: "Target: < 800ms", action: null },
    { metric: "Total Page Size", score: "1.2 MB", status: "Needs Improvement", tone: "warn", details: "Target: < 1 MB", action: "Optimize" },
    { metric: "Number of Requests", score: "28", status: "Good", tone: "good", details: "Target: < 50", action: null },
];

export const SPEED_TIPS = [
    "Compress and optimize images to reduce total page size.",
    "Enable browser caching for static assets.",
    "Minify CSS and JavaScript files.",
    "Use a CDN to improve global loading speed.",
];

/* ============ PAGE HEADERS ============ */
export const PAGE_HEADERS = {
    mainTitle: "On-Page SEO",
    mainSubtitle:
        "Optimize your page content, structure, and HTML elements to rank higher on search engines.",
    reportTitle: "On-Page SEO: Detailed Report",
};

/* ============ USER FEEDBACK MESSAGES ============ */
export const FEEDBACK = {
    invalidUrl: "Enter a valid URL first.",
    analyzeDone: (url) => `On-Page SEO analysis completed for:\n${url}`,
    downloadStarted: "Your On-Page SEO report download has started.",
    linkCopied: "Report link copied to clipboard.",
    aiReady: "AI SEO recommendations are ready!",
    pickDate: "Pick an analysis date to compare reports.",
    fixConfirm: (issue) => `Would you like to fix this issue?\n\n${issue}`,
    optimizeDone: "AI SEO recommendations are ready!",
};

/* ============ HEADER ACTIONS ============ */
export const HEADER_ACTIONS = {
    analysisDate: "Sep 15, 2026",
    reanalyzeDone: "Done",
    download: "Download Report",
    share: "Share",
    viewAllIssues: "View All Issues",
    viewAllKeywords: "View All Keywords",
    viewDetailedReport: "View Detailed Report",
    viewLive: "View Live",
};
