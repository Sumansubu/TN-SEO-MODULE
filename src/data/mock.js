// ============================================================
// CONTENT AI WRITER - MOCK DATA
// ============================================================

export const article = {
  title: "10 Proven SEO Strategies for Small Businesses in 2026",

  intro:
    "Search engine optimization (SEO) is one of the most cost-effective ways for small businesses to attract customers online. With the right strategies, you can outrank bigger competitors and turn organic traffic into steady revenue.",

  sections: [
    {
      h: "1. Optimize Your Google Business Profile",
      p: "A complete, accurate profile helps you appear in local search and Google Maps. Add photos, business hours, and respond to every review.",
    },
    {
      h: "2. Target Long-Tail Keywords",
      p: "Long-tail keywords have lower competition and higher intent. Use keyword research tools to find phrases your customers actually search for.",
    },
    {
      h: "3. Create High-Quality Content",
      p: "Publish helpful blog posts, guides, and FAQs that answer real customer questions. Consistent content marketing builds authority over time.",
    },
    {
      h: "4. Improve Technical SEO",
      p: "Fast load times, mobile-friendly pages, clean URLs, and a valid sitemap make it easier for search engines to crawl and index your site.",
    },
  ],
};

// ============================================================
// SEO INSIGHTS
// ============================================================

export const insights = [
  {
    key: "meta-title",
    label: "Meta Title",
    score: 75,
    status: "Good",
    tone: "success",
    detail: "58 characters — includes primary keyword.",
  },
  {
    key: "meta-description",
    label: "Meta Description",
    score: 60,
    status: "Needs Improvement",
    tone: "warning",
    detail: "Too short (112 chars). Aim for 150–160.",
  },
  {
    key: "headings",
    label: "Headings (H1–H3)",
    score: 85,
    status: "Good",
    tone: "success",
    detail: "1 H1, 10 H2, 6 H3 — well structured.",
  },
  {
    key: "internal-links",
    label: "Internal Links",
    score: 55,
    status: "Needs Improvement",
    tone: "warning",
    detail: "Only 2 internal links. Add 3–5 more.",
  },
  {
    key: "readability",
    label: "Readability",
    score: 78,
    status: "Good",
    tone: "success",
    detail: "Flesch score 64 — easy to read.",
  },
];

// ============================================================
// SEO SUGGESTIONS
// ============================================================

export const suggestions = [
  {
    id: 1,
    priority: "High",
    title: "Increase keyword density",
    desc: "Primary keyword appears 4 times. Use it 6–8 times naturally.",
    impact: "+6",
  },
  {
    id: 2,
    priority: "High",
    title: "Add more internal links",
    desc: "Link to 3 related service or blog pages.",
    impact: "+5",
  },
  {
    id: 3,
    priority: "Medium",
    title: "Extend meta description",
    desc: "Write a 150–160 character description with a call-to-action.",
    impact: "+4",
  },
  {
    id: 4,
    priority: "Medium",
    title: "Add image alt text",
    desc: "2 images are missing descriptive alt attributes.",
    impact: "+2",
  },
  {
    id: 5,
    priority: "Low",
    title: "Shorten long sentences",
    desc: "6 sentences exceed 25 words.",
    impact: "+1",
  },
];

export const seoSuggestionFilters = ["All", "High", "Medium", "Low"];

export const seoPrioritySummary = [
  {
    label: "High",
    count: 2,
    colorClass: "text-red-600",
  },
  {
    label: "Medium",
    count: 2,
    colorClass: "text-amber-600",
  },
  {
    label: "Low",
    count: 1,
    colorClass: "text-blue-600",
  },
];

// ============================================================
// KEYWORDS
// ============================================================

export const keywords = [
  {
    kw: "seo strategies for small businesses",
    count: 4,
    density: "0.9%",
    status: "Low",
  },
  {
    kw: "local seo",
    count: 6,
    density: "1.3%",
    status: "Good",
  },
  {
    kw: "content marketing",
    count: 3,
    density: "0.7%",
    status: "Good",
  },
  {
    kw: "technical seo",
    count: 2,
    density: "0.4%",
    status: "Low",
  },
  {
    kw: "google business profile",
    count: 3,
    density: "0.7%",
    status: "Good",
  },
];

// ============================================================
// META TITLES
// ============================================================

export const metaTitles = [
  "10 Proven SEO Services for Small Businesses to Grow Online",
  "Affordable SEO Services for Small Businesses in 2026",
  "Best SEO Services for Small Business Growth",
  "Local SEO Services for Small Businesses – Rank Higher in 2026",
  "How SEO Services Can Help Small Businesses Get More Customers",
  "Top SEO Services for Small Businesses | Affordable & Effective",
  "Small Business SEO Services – Boost Your Online Visibility",
  "Professional SEO Services for Small Businesses in India",
  "SEO Services for Small Businesses: A Complete Guide",
  "Grow Your Business with Expert SEO Services",
];

export const metaTitleScores = [94, 92, 90, 88, 86, 84, 82, 80, 78, 76];

// ============================================================
// FAQ DATA
// ============================================================

export const faqs = [
  [
    "What are SEO services for small businesses?",
    "SEO services help small businesses improve their visibility in search results through keyword research, content, technical fixes, and local optimization.",
  ],
  [
    "Why are SEO services important for small businesses?",
    "They bring consistent, free organic traffic from people already searching for your products or services.",
  ],
  [
    "How much do SEO services cost for small businesses?",
    "Most small business packages range from $300 to $2,000 per month depending on scope and competition.",
  ],
  [
    "How long does it take to see results from SEO services?",
    "Typically 3–6 months for meaningful ranking improvements, with local SEO often faster.",
  ],
  [
    "What's included in a typical SEO service package?",
    "Audits, keyword research, on-page optimization, content creation, link building, and monthly reporting.",
  ],
  [
    "Can local SEO services help my small business?",
    "Yes. Local SEO puts you in Google Maps and 'near me' results, which drive high-intent visits.",
  ],
  [
    "How do I choose the right SEO service provider?",
    "Look for transparent reporting, case studies, realistic promises, and no guaranteed #1 rankings.",
  ],
  [
    "Are SEO services better than paid ads for small businesses?",
    "SEO builds long-term traffic while ads deliver instant results; most businesses benefit from both.",
  ],
  [
    "Can I do SEO myself or should I hire an expert?",
    "Basics can be done yourself, but experts save time and avoid costly technical mistakes.",
  ],
  [
    "What are the best SEO strategies for small businesses in 2026?",
    "Local SEO, helpful content, fast mobile pages, and strong reviews remain the most effective.",
  ],
];

// ============================================================
// SCORE / INSIGHT CONTENT
// ============================================================

export const seoScoreLabels = {
  excellent: "Excellent",
  good: "Good",
  average: "Average",
};

export const seoInsightsContent = {
  title: "Content Score",
  viewSuggestionsLabel: "View suggestions",
  description: "Your content is well optimized. Apply the suggestions to reach",
  targetScore: 90,
  insightsTitle: "Key SEO Insights",
  detailsLabel: "Details",
  fullReportLabel: "View Full SEO Report",
};

export const seoScoreSummary = {
  targetScore: 90,
  goodThreshold: 80,
  message: "Your content is well optimized. Apply the suggestions to reach",
};

export const seoOverviewStats = [
  {
    label: "Primary uses",
    value: "4",
  },
  {
    label: "Density",
    value: "0.9%",
  },
  {
    label: "Word count",
    value: "1,248",
  },
];

export const seoOverviewContent = {
  keywordAnalysisTitle: "Keyword Usage Analysis",
  distributionTitle: "Keyword distribution",
  usedKeywordsTitle: "Used Keywords",

  tableHeaders: {
    keyword: "Keyword",
    count: "Count",
    density: "Density",
    status: "Status",
  },
};

// ============================================================
// SEO INSIGHT DETAILS
// ============================================================

export const seoInsightDetails = {
  "meta-title": {
    current: "10 Proven SEO Strategies for Small Businesses in 2026",

    good: [
      "Contains primary keyword",
      "58 characters (ideal 50–60)",
      "Includes year for freshness",
    ],

    fix: ["Place keyword closer to the start"],
  },

  "meta-description": {
    current:
      "Learn the best SEO strategies to help your small business grow online.",

    good: ["Contains primary keyword"],

    fix: [
      "Only 112 characters — aim for 150–160",
      "Add a clear call-to-action",
    ],
  },

  headings: {
    current: "1 × H1 · 10 × H2 · 6 × H3",

    good: ["Single H1 with keyword", "Logical H2/H3 hierarchy"],

    fix: ["Add keyword variation to 2 H2s"],
  },

  "internal-links": {
    current: "2 internal links · 1 external link",

    good: ["Descriptive anchor text"],

    fix: ["Add 3–5 more internal links", "Link to your services page"],
  },

  readability: {
    current: "Flesch reading ease: 64 (8th grade)",

    good: ["Short paragraphs", "Active voice in 91% of sentences"],

    fix: ["6 sentences exceed 25 words", "Add more transition words"],
  },
};

// Alias for components using the shorter name
export const insightDetails = seoInsightDetails;

// ============================================================
// AI RECOMMENDATION
// ============================================================

export const recommendation = {
  title: "AI Recommendation",

  description:
    "Add 3 more internal links and extend your meta description to improve your SEO score.",

  potentialGain: 9,

  actionLabel: "View Suggestions",
};

// ============================================================
// CONTENT FORM
// ============================================================

export const contentFormOptions = {
  contentTypes: ["Blog Post", "Article", "Landing Page"],

  targetAudiences: ["Small Business Owners", "Marketing Managers"],

  tones: ["Professional", "Friendly"],

  lengths: ["1000–1500", "1500–2000"],

  defaultContentType: "Blog Post",

  defaultPrimaryKeyword: "SEO strategies for small businesses",

  defaultSecondaryKeywords: ["local seo", "content marketing", "technical seo"],

  defaultTargetAudience: "Small Business Owners",

  defaultTone: "Professional",

  defaultLength: "1000–1500",

  defaultInstructions: "Include statistics and actionable tips...",
};

// ============================================================
// CONTENT TOOLS
// IMPORTANT: ONLY ONE contentTools EXPORT
// ============================================================

export const contentTools = [
  {
    key: "blog-writer",
    title: "AI Blog Writer",
    desc: "Generate engaging blog posts in minutes.",
    to: "/content",
    color: "bg-green-50 text-green-600",
  },

  {
    key: "article-generator",
    title: "SEO Article Generator",
    desc: "Long-form articles optimized to rank.",
    to: "/content/article-generator",
    color: "bg-blue-50 text-blue-600",
  },

  {
    key: "meta-title-generator",
    title: "Meta Title Generator",
    desc: "Click-worthy, SEO-friendly meta titles.",
    to: "/content/meta-title-generator",
    color: "bg-amber-50 text-amber-600",
  },

  {
    key: "faq-generator",
    title: "FAQ Generator",
    desc: "FAQs that win rich results in search.",
    to: "/content/faq-generator",
    color: "bg-purple-50 text-purple-600",
  },
];

// ============================================================
// ARTICLE GENERATOR
// ============================================================

export const articleGeneratorSteps = [
  "Enter Details",
  "AI Generation",
  "Review & Edit",
  "Export",
];

export const articleGeneratorConfig = {
  title: "SEO Article Generator",

  description:
    "Create long-form, SEO-optimized articles that rank higher on search engines.",

  settingsTitle: "1. Article Settings",

  fields: {
    topic: {
      label: "Topic / Primary Keyword",
      defaultValue: "SEO strategies for small businesses",
    },

    secondaryKeywords: {
      label: "Secondary Keywords",

      initial: ["affordable seo", "local seo", "seo experts"],
    },

    targetAudience: {
      label: "Target Audience",
      options: ["Small Business Owners"],
    },

    tone: {
      label: "Article Tone",
      options: ["Informative", "Professional"],
    },

    contentLength: {
      label: "Content Length",
      options: ["1500–2000 words (Long Form)"],
    },

    articleType: {
      label: "Article Type",
      options: ["How-to Guide", "Listicle"],
    },
  },

  generateButton: {
    idle: "Generate Article",
    busy: "Generating...",
  },

  generatedArticleTitle: "2. Generated Article",

  seoAnalysis: {
    title: "SEO Analysis",
    score: 92,
    scoreLabel: "Excellent",

    checks: [
      "Keyword used (8 times)",
      "Meta title optimized",
      "Meta description added",
      "Headings (H1, H2, H3)",
      "Internal links (3)",
      "Readability (Good)",
    ],
  },

  researchData: {
    title: "Article Research Data",

    rows: [
      ["Target Keyword", "SEO strategies for small businesses"],
      ["Word Count", "1,824 words"],
      ["Read Time", "8 min"],
      ["Reading Level", "8th Grade"],
      ["Generated On", "Sep 15, 2026"],
    ],
  },

  export: {
    title: "Export Options",

    options: [
      {
        type: "word",
        label: "Word",
      },
      {
        type: "pdf",
        label: "PDF",
      },
      {
        type: "copy",
        label: "Copy",
      },
    ],
  },
};

// ============================================================
// FAQ GENERATOR
// ============================================================

export const faqGeneratorConfig = {
  title: "FAQ Generator",

  description:
    "Create SEO-friendly FAQs to improve your content's visibility in search engines.",

  exportLabel: "Export",

  fields: {
    topic: {
      label: "Topic / Primary Keyword",
      defaultValue: "SEO services for small businesses",
    },

    targetAudience: {
      label: "Target Audience",
      options: ["Small Business Owners"],
    },

    numberOfFaqs: {
      label: "Number of FAQs",
      options: ["10", "5"],
    },

    tone: {
      label: "Tone",
      options: ["Informative", "Friendly"],
    },
  },

  includeAnswersLabel: "Include Answers",

  generateButton: {
    idle: "Generate FAQs",
    busy: "Generating...",
  },

  generatedTitle: "2. AI Generated FAQs",

  exportFileName: "faqs.txt",
};

// ============================================================
// META TITLE GENERATOR
// ============================================================

export const metaTitleGeneratorConfig = {
  title: "Meta Title Generator",

  description:
    "Create SEO-optimized, high-converting meta titles for better visibility.",

  form: {
    title: "1. Enter Details",

    topic: {
      label: "Topic / Primary Keyword",
      defaultValue: "SEO services for small businesses",
    },

    secondaryKeywords: {
      label: "Secondary Keywords",

      initial: ["affordable seo", "local seo"],
    },

    targetAudience: {
      label: "Target Audience",

      options: ["Small Business Owners"],
    },

    platformLocation: {
      label: "Platform / Location",

      options: ["Google (Global)", "Google (India)"],
    },

    numberOfSuggestions: {
      label: "Number of Suggestions",

      options: ["10", "5"],
    },
  },

  generateButton: {
    idle: "Generate Titles",
    busy: "Generating...",
  },

  generatedSection: {
    title: "2. AI Generated Meta Titles",
    regenerateLabel: "Regenerate",
  },

  tableHeaders: ["", "#", "Meta Title", "Characters", "SEO Score", "Action"],

  seoScore: {
    startingScore: 94,
    decrementPerIndex: 2,
    successCount: 3,
  },

  export: {
    label: "Export",
    fileName: "meta-titles.csv",
  },

  selectedLabel: "Selected:",
};

// ============================================================
// SIDEBAR NAVIGATION
// ============================================================

export const sidebarNavigation = [
  {
    label: "Dashboard",
    icon: "home",
    to: "/dashboard",
  },

  {
    label: "Website Audit",
    icon: "scan-eye",
  },

  {
    label: "Keyword Research",
    icon: "search",
  },

  {
    label: "Technical SEO",
    icon: "search",
    to: "/technical-seo",
  },

  {
    label: "Content / AI Writer",
    icon: "file-text",
    to: "/content",
  },

  {
    label: "On-Page SEO",
    icon: "file-check",
  },

  {
    label: "Backlink Analysis",
    icon: "link",
  },

  {
    label: "Rank Tracking",
    icon: "star",
  },

  {
    label: "Competitor Analysis",
    icon: "users",
  },

  {
    label: "AI Recommendations",
    icon: "star",
  },

  {
    label: "Reports",
    icon: "file-chart",
  },

  {
    label: "Settings",
    icon: "settings",
  },
];
