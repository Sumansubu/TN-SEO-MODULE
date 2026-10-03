/* Pure helpers — every display value derived here, never hand-typed. */

import { COLORS as theme } from "./theme.js";

/** 8400 -> "8.4K", 1200 -> "1.2K", 30000 -> "30K", 946 -> "946" */
export const formatCompact = (n) => {
    if (n >= 1e6) return `${Math.round((n / 1e6) * 10) / 10}M`;
    if (n >= 1e3) return `${Math.round((n / 1e3) * 10) / 10}K`;
    return String(n);
};

/** 20800 -> 24600  =>  18  (integer percent) */
export const percentChange = (prev, curr) => Math.round(((curr - prev) / prev) * 100);

/** keyword density: 12 uses / 1042 words -> "1.2%" */
export const densityPercent = (count, words) => `${Math.round((count / words) * 1000) / 10}%`;

/** score >= 70 -> Good, else Needs Improvement */
export const scoreBadge = (score, goodMin = 70) => (score >= goodMin ? "Good" : "Needs Improvement");

/** low scores render with the amber gauge color */
export const scoreColor = (score, goodMin = 70) => (score >= goodMin ? theme.gaugeGood : theme.gaugeWarn);

/** metric tile status from its score (threshold 75) */
export const metricStatus = (score) =>
    score >= 75
        ? { status: "Good", tone: "good" }
        : { status: "Needs Improvement", tone: "warn" };

/** current calendar month: "Oct 1, 2026 - Oct 31, 2026" */
export const monthRange = (d = new Date()) => {
    const fmt = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return `${fmt(start)} - ${fmt(end)}`;
};

/** time-of-day greeting: "Good Morning," / "Good Afternoon," / "Good Evening," */
export const greeting = (d = new Date()) => {
    const h = d.getHours();
    return h < 12 ? "Good Morning," : h < 17 ? "Good Afternoon," : "Good Evening,";
};

/** weekly labels from a start date: ["Aug 1", "Aug 8", ...] */
export const weeklyLabels = (startIso, count, stepDays = 7) => {
    const start = new Date(`${startIso}T00:00:00`);
    return Array.from({ length: count }, (_, i) =>
        new Date(start.getFullYear(), start.getMonth(), start.getDate() + i * stepDays).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
        )
    );
};

/** area-chart polyline pairs: values (y-down scale) -> [x, y] in a width x height box */
export const seriesPoints = (values, { width, height, maxValue, xPad = 20, yPad = 2 }) => {
    const step = (width - xPad) / (values.length - 1);
    return values.map((v, i) => [
        Math.round(i * step),
        Math.round((1 - v / maxValue) * (height - yPad)),
    ]);
};

/** mini sparkline pairs: normalizes values into a 100x50 box (y grows down) */
export const sparkPoints = (values) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const step = 96 / (values.length - 1);
    return values.map((v, i) => [
        Math.round(2 + i * step),
        Math.round(46 - ((v - min) / span) * 42),
    ]);
};

/** average of a numeric list */
export const average = (list) => list.reduce((sum, n) => sum + n, 0) / list.length;
