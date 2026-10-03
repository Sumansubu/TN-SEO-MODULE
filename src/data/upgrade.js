/* Upgrade page data — plan cards and feature comparison.
   Annual prices are computed from monthly x discount; nothing hand-typed twice. */

export const UPGRADE_HEADER = {
    title: "Upgrade Your Plan",
    subtitle: "Unlock advanced audits, unlimited AI insights, and competitor tracking.",
};

export const ANNUAL_DISCOUNT = 0.2;
export const DISCOUNT_LABEL = `-${Math.round(ANNUAL_DISCOUNT * 100)}%`;

export const BILLING_PERIODS = [
    { key: "monthly", label: "Monthly" },
    { key: "annual", label: "Annual", badge: DISCOUNT_LABEL },
];

/* monthly prices only — annual is derived below */
const RAW_PLANS = [
    {
        id: "free",
        name: "Free",
        tagline: "Essential SEO tools to get you started.",
        monthly: 0,
        cta: "Current Plan",
        current: true,
        features: [
            "1 project",
            "10 site audits / month",
            "5 on-page SEO reports",
            "Basic AI recommendations",
            "5 tracked keywords",
            "Community support",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "Complete SEO tools and AI insights for growing sites.",
        monthly: 29,
        cta: "Upgrade to Pro",
        popular: true,
        features: [
            "5 projects",
            "Unlimited site audits",
            "Unlimited on-page reports",
            "Advanced AI recommendations",
            "500 tracked keywords",
            "Backlink & competitor analysis",
            "Email support",
        ],
    },
    {
        id: "business",
        name: "Business",
        tagline: "Scale across clients, teams, and brands.",
        monthly: 79,
        cta: "Choose Business",
        features: [
            "20 projects",
            "Everything in Pro",
            "5,000 tracked keywords",
            "White-label reports",
            "API access",
            "10 team seats",
            "Dedicated account manager",
        ],
    },
];

export const PLANS = RAW_PLANS.map((plan) => ({
    ...plan,
    annual: Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)),
}));

export const PLAN_COLUMNS = ["free", "pro", "business"];

export const COMPARISON = [
    { feature: "Projects", free: "1", pro: "5", business: "20" },
    { feature: "Site audits / month", free: "10", pro: "Unlimited", business: "Unlimited" },
    { feature: "On-page SEO reports", free: "5", pro: "Unlimited", business: "Unlimited" },
    { feature: "AI recommendations", free: "Basic", pro: "Advanced", business: "Advanced + Custom" },
    { feature: "Tracked keywords", free: "5", pro: "500", business: "5,000" },
    { feature: "Backlink analysis", free: false, pro: true, business: true },
    { feature: "Competitor analysis", free: false, pro: "3 competitors", business: "10 competitors" },
    { feature: "Rank tracking", free: false, pro: true, business: true },
    { feature: "White-label reports", free: false, pro: false, business: true },
    { feature: "API access", free: false, pro: false, business: true },
    { feature: "Team seats", free: "1", pro: "1", business: "10" },
    { feature: "Support", free: "Community", pro: "Email", business: "Priority + Manager" },
];

export const COMPARISON_HEADER = {
    title: "Compare Plans in Detail",
    priceNote: (annual) => `Prices shown ${annual ? "annually" : "monthly"}`,
};

export const GUARANTEE_BANNER = {
    title: "14-Day Money-Back Guarantee",
    text: "Try any plan risk-free. Cancel anytime, no questions asked.",
    cta: "Talk to Sales",
};
