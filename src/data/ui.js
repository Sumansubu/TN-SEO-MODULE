/* Shared style tokens — single source of truth for pill/table/action classes.
   Colors come from theme.js so nothing is hand-typed. */

import { COLORS } from "./theme.js";

export const PILL = {
    good: `bg-[#e2f6ec] text-[${COLORS.green}]`,
    warn: `bg-[#fff3d6] text-[${COLORS.amberDark}]`,
    bad: `bg-[#fdeaea] text-[${COLORS.red}]`,
    neutral: "bg-gray-100 text-muted",
};

export const TINTS = {
    green: `bg-mint text-[${COLORS.green}]`,
    red: `bg-[#fdeaea] text-[${COLORS.red}]`,
    yellow: `bg-[#fff3d6] text-[${COLORS.amberDark}]`,
    purple: `bg-[#f1edfd] text-[${COLORS.purple}]`,
    blue: `bg-[#e8f1fe] text-[${COLORS.blue}]`,
};

export const TH = "bg-gray-50 px-2.5 py-2 text-left text-xs font-medium text-muted";
export const TD = "border-t border-gray-100 px-2.5 py-2 text-[13px] text-gray-700";
export const ACTION_BTN =
    "whitespace-nowrap rounded-lg border border-line px-2.5 py-1 text-[11px] text-gray-700 transition hover:border-primary hover:bg-[#effaf5] hover:text-primary";
export const VIEW_ALL = "flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary hover:underline";
