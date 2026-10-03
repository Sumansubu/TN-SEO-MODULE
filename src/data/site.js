/* App-wide site data — brand, navigation, sidebar, and topbar copy. */

import { greeting } from "./compute.js";

export const BRAND = {
  name: "TN SEO",
  suffix: "\u00ae",
  module: "MODULE",
  avatarLetter: "G",
};

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "home", end: true },
  { to: null, label: "Website Audit", icon: "clipboard-check" },
  { to: null, label: "Keyword Research", icon: "search" },

  // Technical SEO
  { to: "/technical-seo", label: "Technical SEO", icon: "settings-2" },

  { to: "/on-page-seo", label: "On-Page SEO", icon: "file-check-2" },
  { to: null, label: "Backlink Analysis", icon: "link-2" },
  { to: "/competitor-analysis", label: "Competitor Analysis", icon: "users" },

  // Content / AI Writer
  { to: "/content", label: "Content / AI Writer", icon: "file-text" },

  { to: null, label: "AI Recommendations", icon: "sparkles" },
  { to: null, label: "Reports", icon: "file-bar-chart" },
  { to: null, label: "Settings", icon: "settings" },
];

export const SIDEBAR_UPGRADE = {
  title: "Upgrade to Pro",
  text: "Get complete SEO tools and AI insights.",
  cta: "Upgrade Now",
};

export const SIDEBAR_USER = {
  name: "Guest User",
  plan: "Free Plan",
  avatarLetter: "G",
};

export const TOPBAR = {
  domainPlaceholder: "Enter a domain (e.g. example.com)",
  analyzeIdle: "Analyze Website",
  analyzeLoading: "Analyzing...",
  analyzeDone: "Analysis Complete",

  /** dynamic: time of day */
  greeting: greeting(),

  user: "Guest \u1f44b",
  avatarLetter: "G",

  emptyDomainAlert: "Please enter a website domain.",

  analysisDoneAlert: (domain) => `SEO analysis completed for ${domain}`,
};

export const ALERTS = {
  viewAll: "Opening detailed SEO information...",
  viewAllIssues: "Opening all SEO issues...",
  upgradePlans: "Opening Pro upgrade plans...",
  salesChat: "Opening live chat with our sales team...",

  checkout: (planName, price, billing) =>
    `Redirecting to secure checkout...\n\n${planName} Plan\n${price}/month${billing ? ` (${billing})` : ""}`,
};
