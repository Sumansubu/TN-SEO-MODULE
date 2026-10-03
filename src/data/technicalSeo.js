// =========================================================
// Technical SEO Mock Data
// Later these values can be replaced with API responses.
// =========================================================

// =========================================================
// ISSUE DISTRIBUTION
// =========================================================

export const ISSUE_DISTRIBUTION = [
  {
    label: "Critical",
    value: 6,
    color: "#ef4444",
  },
  {
    label: "Warnings",
    value: 18,
    color: "#f59e0b",
  },
  {
    label: "Notices",
    value: 13,
    color: "#3b82f6",
  },
];

// =========================================================
// CORE WEB VITALS SUMMARY
// =========================================================

export const CORE_WEB_VITALS_SUMMARY = [
  {
    label: "LCP",
    value: "2.1s",
    status: "Good",
    good: true,
  },
  {
    label: "INP",
    value: "186ms",
    status: "Needs Improvement",
    good: false,
  },
  {
    label: "CLS",
    value: "0.04",
    status: "Good",
    good: true,
  },
];

// =========================================================
// TOP ISSUES PREVIEW
// =========================================================

export const TOP_ISSUES_PREVIEW = [
  {
    n: 1,
    issue: "Missing meta descriptions",
    severity: "Critical",
    pages: 12,
  },
  {
    n: 2,
    issue: "4XX (404) pages found",
    severity: "Critical",
    pages: 2,
  },
  {
    n: 3,
    issue: "Images without ALT text",
    severity: "Warning",
    pages: 18,
  },
  {
    n: 4,
    issue: "Slow page load speed",
    severity: "Warning",
    pages: 11,
  },
  {
    n: 5,
    issue: "Duplicate title tags",
    severity: "Notice",
    pages: 8,
  },
];

// =========================================================
// BADGE STYLES
// =========================================================

export const BADGE_CLASSES = {
  Critical: "bg-red-50 text-red-500",
  Warning: "bg-amber-50 text-amber-700",
  Notice: "bg-blue-50 text-blue-600",
};

// =========================================================
// CRAWL SUMMARY - RESOURCE TYPES
// =========================================================

export const RESOURCE_CRAWL_SUMMARY = [
  {
    label: "HTML",
    value: 200,
    color: "#16a34a",
  },
  {
    label: "Images",
    value: 32,
    color: "#f59e0b",
  },
  {
    label: "CSS",
    value: 8,
    color: "#ec4899",
  },
  {
    label: "JS",
    value: 6,
    color: "#ef4444",
  },
  {
    label: "Other",
    value: 2,
    color: "#94a3b8",
  },
];

// =========================================================
// RECENT PAGES
// =========================================================

export const RECENT_PAGES = [
  {
    n: 1,
    url: "/",
    status: 200,
    time: "320 ms",
    type: "HTML",
  },
  {
    n: 2,
    url: "/about",
    status: 200,
    time: "410 ms",
    type: "HTML",
  },
  {
    n: 3,
    url: "/services",
    status: 200,
    time: "280 ms",
    type: "HTML",
  },
  {
    n: 4,
    url: "/blog/seo-tips",
    status: 200,
    time: "520 ms",
    type: "HTML",
  },
  {
    n: 5,
    url: "/contact",
    status: 200,
    time: "300 ms",
    type: "HTML",
  },
];

// =========================================================
// SITE CRAWL SUB TABS
// =========================================================

export const SITE_CRAWL_SUB_TABS = [
  "Overview",
  "Crawled Pages",
  "Crawl Depth",
  "Redirects",
  "Blocked Pages",
];

// =========================================================
// FULL ISSUES
// =========================================================

export const ISSUES_FULL = [
  {
    n: 1,
    issue: "Missing meta descriptions",
    severity: "Critical",
    pages: 12,
  },
  {
    n: 2,
    issue: "4XX (404) pages found",
    severity: "Critical",
    pages: 8,
  },
  {
    n: 3,
    issue: "Images without ALT text",
    severity: "Warning",
    pages: 18,
  },
  {
    n: 4,
    issue: "Multiple H1 tags",
    severity: "Warning",
    pages: 7,
  },
  {
    n: 5,
    issue: "Slow page load speed",
    severity: "Warning",
    pages: 11,
  },
  {
    n: 6,
    issue: "Duplicate title tags",
    severity: "Notice",
    pages: 6,
  },
  {
    n: 7,
    issue: "Redirect chains",
    severity: "Notice",
    pages: 4,
  },
  {
    n: 8,
    issue: "Large image file sizes",
    severity: "Notice",
    pages: 15,
  },
];

// =========================================================
// ISSUE FILTERS
// =========================================================

export const ISSUE_FILTERS = [
  {
    key: "All",
    label: "All Issues (37)",
  },
  {
    key: "Critical",
    label: "Critical (6)",
  },
  {
    key: "Warning",
    label: "Warnings (18)",
  },
  {
    key: "Notice",
    label: "Notices (13)",
  },
];

// =========================================================
// CORE WEB VITALS TABS
// =========================================================

export const VITALS_SUBTABS = ["Overview", "LCP", "INP", "CLS"];

// =========================================================
// CORE WEB VITALS BY DEVICE
// =========================================================

export const VITALS_BY_DEVICE = {
  Mobile: {
    lcp: 2.1,
    inp: 186,
    cls: 0.04,
  },

  Desktop: {
    lcp: 1.4,
    inp: 92,
    cls: 0.02,
  },
};

// =========================================================
// CORE WEB VITALS INSIGHTS
// =========================================================

export const INSIGHTS = [
  {
    text: "LCP is within good range.",
    good: true,
  },
  {
    text: "INP needs improvement.",
    good: false,
  },
  {
    text: "CLS is good.",
    good: true,
  },
  {
    text: "Optimize images to improve LCP.",
    good: false,
    tip: true,
  },
  {
    text: "Reduce JS execution time to improve INP.",
    good: false,
    tip: true,
  },
  {
    text: "Layout shift is minimal.",
    good: true,
  },
];

// =========================================================
// DETAILED CORE WEB VITALS DATA
// =========================================================

export const CORE_WEB_VITALS_DATA = {
  Mobile: {
    LCP: {
      value: 2.1,
      unit: "s",
      status: "Good",
      description: "Largest Contentful Paint",
      percentage: 52,
      good: true,
    },

    INP: {
      value: 186,
      unit: "ms",
      status: "Needs Improvement",
      description: "Interaction to Next Paint",
      percentage: 37,
      good: false,
    },

    CLS: {
      value: 0.04,
      unit: "",
      status: "Good",
      description: "Cumulative Layout Shift",
      percentage: 16,
      good: true,
    },
  },

  Desktop: {
    LCP: {
      value: 1.7,
      unit: "s",
      status: "Good",
      description: "Largest Contentful Paint",
      percentage: 42,
      good: true,
    },

    INP: {
      value: 142,
      unit: "ms",
      status: "Good",
      description: "Interaction to Next Paint",
      percentage: 28,
      good: true,
    },

    CLS: {
      value: 0.02,
      unit: "",
      status: "Good",
      description: "Cumulative Layout Shift",
      percentage: 8,
      good: true,
    },
  },
};

// =========================================================
// DETAILED METRIC INFORMATION
// =========================================================

export const METRIC_DETAILS = {
  LCP: {
    name: "Largest Contentful Paint",
    short: "LCP",

    value: {
      Mobile: "2.1s",
      Desktop: "1.7s",
    },

    target: "≤ 2.5s",

    explanation:
      "Measures how quickly the largest visible content element loads on the page.",

    recommendation:
      "Optimize images, improve server response time and reduce render-blocking resources.",
  },

  INP: {
    name: "Interaction to Next Paint",
    short: "INP",

    value: {
      Mobile: "186ms",
      Desktop: "142ms",
    },

    target: "≤ 200ms",

    explanation:
      "Measures how quickly your page responds after a user interacts with it.",

    recommendation:
      "Reduce JavaScript execution time and minimize long-running main-thread tasks.",
  },

  CLS: {
    name: "Cumulative Layout Shift",
    short: "CLS",

    value: {
      Mobile: "0.04",
      Desktop: "0.02",
    },

    target: "≤ 0.10",

    explanation:
      "Measures unexpected movement of visible page elements while the page loads.",

    recommendation:
      "Reserve space for images, ads and dynamic content to prevent layout shifts.",
  },
};

// =========================================================
// PERFORMANCE OPPORTUNITIES
// =========================================================

export const PERFORMANCE_OPPORTUNITIES = [
  {
    title: "Optimize image delivery",
    description:
      "Several images can be compressed and served in modern formats.",
    impact: "High",
    savings: "0.4s",
    iconKey: "Zap",
  },

  {
    title: "Reduce unused JavaScript",
    description:
      "Unused JavaScript is increasing the amount of work required by the browser.",
    impact: "Medium",
    savings: "180ms",
    iconKey: "Gauge",
  },

  {
    title: "Preload critical resources",
    description:
      "Important resources can be loaded earlier to improve initial rendering.",
    impact: "Medium",
    savings: "120ms",
    iconKey: "TrendingUp",
  },

  {
    title: "Reserve image dimensions",
    description:
      "Explicit image dimensions can help reduce unexpected layout movement.",
    impact: "Low",
    savings: "0.02 CLS",
    iconKey: "CheckCircle2",
  },
];

// =========================================================
// CORE WEB VITALS HISTORY
// =========================================================

export const CORE_WEB_VITALS_HISTORY = [
  {
    date: "Sep 15, 2026",
    lcp: "2.1s",
    inp: "186ms",
    cls: "0.04",
    score: 82,
  },

  {
    date: "Sep 08, 2026",
    lcp: "2.3s",
    inp: "204ms",
    cls: "0.05",
    score: 78,
  },

  {
    date: "Sep 01, 2026",
    lcp: "2.5s",
    inp: "218ms",
    cls: "0.07",
    score: 73,
  },

  {
    date: "Aug 25, 2026",
    lcp: "2.7s",
    inp: "236ms",
    cls: "0.09",
    score: 68,
  },
];

// =========================================================
// SITEMAP SUB TABS
// =========================================================

export const SITEMAP_SUB_TABS = ["Overview", "Sitemap URLs"];

// =========================================================
// SITEMAP URL DATA
// =========================================================

export const SITEMAP_URLS = [
  {
    url: "https://example.com/",
    status: "200",
    type: "Indexable",
    lastModified: "Sep 15, 2026",
  },
  {
    url: "https://example.com/about",
    status: "200",
    type: "Indexable",
    lastModified: "Sep 14, 2026",
  },
  {
    url: "https://example.com/services",
    status: "200",
    type: "Indexable",
    lastModified: "Sep 13, 2026",
  },
  {
    url: "https://example.com/contact",
    status: "200",
    type: "Indexable",
    lastModified: "Sep 12, 2026",
  },
  {
    url: "https://example.com/blog",
    status: "200",
    type: "Indexable",
    lastModified: "Sep 11, 2026",
  },
  {
    url: "https://example.com/old-page",
    status: "404",
    type: "Non-indexable",
    lastModified: "Sep 08, 2026",
  },
];

// =========================================================
// SITEMAP CONFIGURATION
// =========================================================

export const SITEMAP_CONFIG = {
  location: "/sitemap.xml",
  lastChecked: "Sep 15, 2026",
  totalUrls: 248,
  indexable: 211,
  nonIndexable: 37,
};

// =========================================================
// SITEMAP STATUS
// =========================================================

export const SITEMAP_STATUS = {
  title: "Sitemap is valid",
  description:
    "Your XML sitemap was successfully detected and contains valid URLs.",
};

// =========================================================
// SITEMAP HEALTH
// =========================================================

export const SITEMAP_HEALTH = [
  {
    iconKey: "CheckCircle2",
    title: "Valid URLs",
    description: "URLs returning successful responses",
    value: 211,
    tone: "success",
  },
  {
    iconKey: "AlertTriangle",
    title: "Issues",
    description: "URLs requiring attention",
    value: 37,
    tone: "warning",
  },
  {
    iconKey: "FileText",
    title: "Sitemap Size",
    description: "URLs currently discovered",
    value: 248,
    tone: "neutral",
  },
];

// =========================================================
// SITEMAP XML PREVIEW
// =========================================================

export const SITEMAP_LINES = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "  <url>",
  "    <loc>https://example.com/</loc>",
  "    <lastmod>2026-09-15</lastmod>",
  "  </url>",
  "  <url>",
  "    <loc>https://example.com/about</loc>",
  "    <lastmod>2026-09-14</lastmod>",
  "  </url>",
  "  <url>",
  "    <loc>https://example.com/services</loc>",
  "    <lastmod>2026-09-13</lastmod>",
  "  </url>",
  "  <url>",
  "    <loc>https://example.com/contact</loc>",
  "    <lastmod>2026-09-12</lastmod>",
  "  </url>",
  "</urlset>",
];

// =========================================================
// FULL REPORT
// =========================================================

export const FULL_REPORT_SUMMARY = {
  score: 78,
  status: "Good",

  description:
    "Your website has a solid technical foundation, but there are some issues that need attention.",

  statistics: [
    {
      label: "Pages Crawled",
      value: "248",
    },
    {
      label: "Total Issues",
      value: "37",
    },
    {
      label: "Healthy Pages",
      value: "211",
    },
    {
      label: "Crawl Time",
      value: "2m 14s",
    },
  ],

  generatedOn: "Sep 15, 2026, 10:32 AM",

  recommendation:
    "Fix the identified issues to improve your technical SEO score and enhance your website's search visibility.",
};

// =========================================================
// SECTION BREAKDOWN
// =========================================================

export const SECTION_BREAKDOWN = [
  {
    label: "Site Crawl",
    score: 82,
  },
  {
    label: "Issues",
    score: 68,
  },
  {
    label: "Core Web Vitals",
    score: 85,
  },
  {
    label: "Sitemap",
    score: 79,
  },
];

// =========================================================
// MAIN TABS
// =========================================================

export const TABS = [
  "Overview",
  "Site Crawl",
  "Issues",
  "Core Web Vitals",
  "Sitemap",
];

// =========================================================
// TAB META
// =========================================================

export const TAB_META = {
  Overview: {
    title: "Technical SEO",
    subtitle:
      "Analyze your website's technical health and fix critical issues to improve search visibility.",
    action: "Run Technical Audit",
  },

  "Site Crawl": {
    title: "Site Crawl",
    subtitle:
      "Crawl your website to discover pages, links, and technical issues.",
    action: "Run Crawl",
  },

  Issues: {
    title: "Technical Issues",
    subtitle:
      "Identify and fix technical SEO issues that affect your website's performance.",
    action: "Re-scan",
  },

  "Core Web Vitals": {
    title: "Core Web Vitals",
    subtitle:
      "Measure your website's real-world performance based on Google's Core Web Vitals.",
    action: "Test Now",
  },

  Sitemap: {
    title: "Sitemap",
    subtitle: "View and manage your XML sitemap.",
    action: "Generate Sitemap",
  },
};

// =========================================================
// TECHNICAL SEO OVERVIEW
// =========================================================

export const OVERVIEW_STATS = [
  {
    label: "Pages Crawled",
    value: "248",
    trend: "12%",
    direction: "up",
    trendGood: true,
    iconKey: "FileText",
    tone: "green",
  },
  {
    label: "Total Issues",
    value: "37",
    trend: "20%",
    direction: "down",
    trendGood: false,
    iconKey: "AlertCircle",
    tone: "red",
  },
  {
    label: "Healthy Pages",
    value: "211",
    trend: "8%",
    direction: "up",
    trendGood: true,
    iconKey: "Check",
    tone: "green",
  },
  {
    label: "Crawl Time",
    value: "2m 14s",
    trend: "35%",
    direction: "down",
    trendGood: true,
    iconKey: "Clock",
    tone: "amber",
  },
];

// =========================================================
// CRAWL STATUS ROWS
// =========================================================

export const CRAWL_STATUS_ROWS = [
  {
    iconKey: "FileText",
    label: "Pages Crawled",
    value: "248",
  },
  {
    iconKey: "AlertCircle",
    label: "Issues Found",
    value: "37",
  },
  {
    iconKey: "ScanLine",
    label: "Crawl Type",
    value: "Full Website Crawl",
  },
  {
    iconKey: "Clock",
    label: "Duration",
    value: "2m 14s",
  },
];

// =========================================================
// TECHNICAL SEO SCORE
// =========================================================

export const TECHNICAL_SEO_SCORE = {
  score: 78,
  status: "Good",
  description:
    "Your website has a solid technical foundation, but there are some issues that need attention.",
};

// =========================================================
// CRAWL STATUS
// =========================================================

export const TECHNICAL_SEO_CRAWL_STATUS = {
  status: "Completed Successfully",
  date: "Sep 15, 2026, 10:42 AM",
  progress: 100,
};

// =========================================================
// SITE CRAWL
// =========================================================

export const SITE_CRAWL_STATS = [
  {
    iconKey: "FileText",
    tone: "green",
    label: "Pages Crawled",
    value: "248",
  },
  {
    iconKey: "Search",
    tone: "blue",
    label: "New Pages",
    value: "12",
  },
  {
    iconKey: "Link2",
    tone: "amber",
    label: "Redirects",
    value: "6",
  },
  {
    iconKey: "ShieldAlert",
    tone: "red",
    label: "Blocked Pages",
    value: "4",
  },
];

export const CRAWLED_PAGES = [
  {
    url: "https://example.com/",
    title: "Example Homepage",
    status: 200,
    depth: 0,
    links: 18,
  },
  {
    url: "https://example.com/about",
    title: "About Us",
    status: 200,
    depth: 1,
    links: 12,
  },
  {
    url: "https://example.com/services",
    title: "Our Services",
    status: 200,
    depth: 1,
    links: 15,
  },
  {
    url: "https://example.com/contact",
    title: "Contact",
    status: 200,
    depth: 1,
    links: 8,
  },
  {
    url: "https://example.com/blog",
    title: "Blog",
    status: 200,
    depth: 1,
    links: 21,
  },
];

export const CRAWL_DEPTH_DATA = [
  {
    depth: "Level 0",
    pages: 1,
    percentage: 0.4,
    description: "Homepage / starting URL",
  },
  {
    depth: "Level 1",
    pages: 42,
    percentage: 17.7,
    description: "Pages directly linked from homepage",
  },
  {
    depth: "Level 2",
    pages: 126,
    percentage: 52.9,
    description: "Pages two clicks away",
  },
  {
    depth: "Level 3",
    pages: 67,
    percentage: 28.2,
    description: "Pages three clicks away",
  },
  {
    depth: "Level 4+",
    pages: 12,
    percentage: 5.0,
    description: "Deeply nested pages",
  },
];

export const REDIRECTS = [
  {
    from: "https://example.com/old-page",
    to: "https://example.com/new-page",
    type: "301",
    status: "Permanent",
  },
  {
    from: "https://example.com/services-old",
    to: "https://example.com/services",
    type: "301",
    status: "Permanent",
  },
  {
    from: "https://example.com/blog/latest",
    to: "https://example.com/blog",
    type: "302",
    status: "Temporary",
  },
];

export const BLOCKED_PAGES = [
  {
    url: "https://example.com/admin",
    reason: "robots.txt",
    type: "Robots",
  },
  {
    url: "https://example.com/private",
    reason: "Noindex directive",
    type: "Noindex",
  },
  {
    url: "https://example.com/login",
    reason: "robots.txt",
    type: "Robots",
  },
  {
    url: "https://example.com/dashboard",
    reason: "Authentication required",
    type: "Authentication",
  },
];

export const SITE_CRAWL_CONFIG = {
  progress: 75,
  crawledPages: 187,
  totalPages: 248,
  userAgent: "TN SEO Bot (Default)",
  crawlLimit: "500 pages",
};

// =========================================================
// SITE CRAWL SUMMARY
// =========================================================

export const CRAWL_SUMMARY = [
  {
    label: "Total Pages",
    value: "248",
  },
  {
    label: "Successful",
    value: "211",
  },
  {
    label: "Redirects",
    value: "6",
  },
  {
    label: "Blocked",
    value: "4",
  },
];
