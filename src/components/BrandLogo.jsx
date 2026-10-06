import { useId } from "react";

/**
 * Canonical TN SEO logo mark - a gradient squircle tile with a magnifying
 * glass (search/audit) whose lens holds three ascending bars (rank growth).
 * Every surface of the app renders this exact mark via this component.
 */
export default function BrandMark({ size = 40, className = "" }) {
    const rawId = useId();
    const gradientId = `tnseo-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <rect width="48" height="48" rx="14" fill={`url(#${gradientId})`} />

            {/* Magnifying glass lens */}
            <circle cx="21" cy="21" r="11" stroke="#ffffff" strokeWidth="3.4" />

            {/* Ascending growth bars inside the lens */}
            <rect x="15.8" y="21.5" width="3.2" height="5" rx="1.6" fill="#ffffff" opacity="0.75" />
            <rect x="20.4" y="18" width="3.2" height="8.5" rx="1.6" fill="#ffffff" opacity="0.88" />
            <rect x="25" y="15.5" width="3.2" height="11" rx="1.6" fill="#ffffff" />

            {/* Handle */}
            <path
                d="M28.7 28.7 35.8 35.8"
                stroke="#ffffff"
                strokeWidth="3.8"
                strokeLinecap="round"
            />

            <defs>
                <linearGradient
                    id={gradientId}
                    x1="4"
                    y1="2"
                    x2="44"
                    y2="46"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#059669" />
                    <stop offset="1" stopColor="#10B981" />
                </linearGradient>
            </defs>
        </svg>
    );
}
