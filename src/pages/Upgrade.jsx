import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { PILL, TD, TH } from "../data/ui.js";
import { ALERTS } from "../data/site.js";
import {
    BILLING_PERIODS,
    COMPARISON,
    COMPARISON_HEADER,
    GUARANTEE_BANNER,
    PLAN_COLUMNS,
    PLANS,
    UPGRADE_HEADER,
} from "../data/upgrade.js";

function Cell({ value }) {
    if (value === true) return <span className="font-semibold text-[#07865a]">{"\u2713"}</span>;
    if (value === false) return <X className="h-3.5 w-3.5 text-gray-300" />;
    return value;
}

export default function Upgrade() {
    const navigate = useNavigate();
    const [annual, setAnnual] = useState(true);

    const choosePlan = (plan) => {
        if (plan.current) return;
        const price = annual ? plan.annual : plan.monthly;
        const billing = annual && plan.monthly > 0 ? `$${plan.annual * 12} billed yearly` : "";
        alert(ALERTS.checkout(plan.name, `$${price}`, billing));
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto [scrollbar-width:thin] pb-1">

            {/* HEADER */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-gray-600 transition hover:border-primary/50 hover:text-primary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold leading-7">{UPGRADE_HEADER.title}</h1>
                        <p className="mt-0.5 truncate text-xs text-muted">
                            {UPGRADE_HEADER.subtitle}
                        </p>
                    </div>
                </div>

                {/* BILLING TOGGLE */}
                <div className="flex shrink-0 items-center gap-1 rounded-lg border border-line bg-white p-1">
                    {BILLING_PERIODS.map((period) => {
                        const isAnnual = period.key === "annual";
                        const active = annual === isAnnual;
                        return (
                            <button
                                key={period.key}
                                onClick={() => setAnnual(isAnnual)}
                                className={
                                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition " +
                                    (active ? "bg-primary text-white" : "text-muted hover:text-gray-700")
                                }
                            >
                                {period.label}
                                {period.badge && (
                                    <span
                                        className={
                                            "rounded px-1.5 py-0.5 text-[10px] font-semibold " +
                                            (annual ? "bg-white/20 text-white" : "bg-mint text-[#07865a]")
                                        }
                                    >
                                        {period.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* PLAN CARDS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 md:grid-cols-3">
                {PLANS.map((plan) => {
                    const price = annual ? plan.annual : plan.monthly;
                    return (
                        <div
                            key={plan.id}
                            className={
                                "relative flex flex-col rounded-xl border bg-white p-5 shadow-sm transition " +
                                (plan.popular
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-line hover:-translate-y-0.5 hover:shadow-md")
                            }
                        >
                            {plan.popular && (
                                <span className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-white">
                                    {"\u2605"} MOST POPULAR
                                </span>
                            )}

                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold">{plan.name}</h2>
                                {plan.current && (
                                    <span className={"rounded-md px-2 py-0.5 text-[10px] font-medium " + PILL.neutral}>
                                        Active
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-xs leading-4 text-muted">{plan.tagline}</p>

                            <div className="mt-4 flex items-baseline gap-1">
                                <strong className="text-3xl leading-9">{price === 0 ? "$0" : `$${price}`}</strong>
                                <small className="text-xs text-muted">/month</small>
                            </div>
                            <small className="mt-0.5 block h-4 text-[11px] text-gray-400">
                                {price === 0
                                    ? "Free forever"
                                    : annual
                                      ? `Billed $${price * 12} yearly`
                                      : "Billed monthly"}
                            </small>

                            <div className="my-3 h-px bg-gray-100"></div>

                            <ul className="flex flex-1 flex-col gap-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-[13px] leading-4 text-gray-700">
                                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => choosePlan(plan)}
                                disabled={plan.current}
                                className={
                                    "mt-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition " +
                                    (plan.current
                                        ? "cursor-default border border-line bg-gray-50 text-muted"
                                        : plan.popular
                                          ? "bg-primary text-white hover:bg-primary-dark"
                                          : "border border-primary text-primary hover:bg-[#effaf5]")
                                }
                            >
                                {plan.cta}
                                {!plan.current && <ArrowRight className="h-3.5 w-3.5" />}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* COMPARISON TABLE */}
            <div className="shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                    <h2 className="text-sm font-semibold">{COMPARISON_HEADER.title}</h2>
                    <span className="flex items-center gap-1 text-[11px] text-muted">
                        {COMPARISON_HEADER.priceNote(annual)}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={TH}>Feature</th>
                                {PLAN_COLUMNS.map((key) => (
                                    <th key={key} className={TH}>{PLANS.find((p) => p.id === key).name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row) => (
                                <tr key={row.feature} className="hover:bg-gray-50/60">
                                    <td className={TD + " whitespace-nowrap font-medium text-ink"}>{row.feature}</td>
                                    <td className={TD}><Cell value={row.free} /></td>
                                    <td className={TD}>
                                        {row.pro === true ? (
                                            <Cell value={true} />
                                        ) : row.pro === false ? (
                                            <Cell value={false} />
                                        ) : (
                                            <span className="font-medium text-[#07865a]">{row.pro}</span>
                                        )}
                                    </td>
                                    <td className={TD}>
                                        {row.business === true ? (
                                            <Cell value={true} />
                                        ) : row.business === false ? (
                                            <Cell value={false} />
                                        ) : (
                                            <span className="font-medium text-[#07865a]">{row.business}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* GUARANTEE BANNER */}
            <div className="relative flex shrink-0 flex-wrap items-center justify-between gap-3 overflow-hidden rounded-xl border border-[#d4efe5] bg-[radial-gradient(ellipse_at_72%_100%,rgba(112,222,174,.22),transparent_35%),#e8faf4] px-5 py-3.5">
                <div className="absolute right-[120px] top-2 h-20 w-[320px] rounded-full border border-primary/10"></div>

                <div className="relative z-10 flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-primary">
                        <Sparkles className="h-6 w-6" />
                    </span>                        <div className="min-w-0">
                            <h2 className="text-sm font-bold">{GUARANTEE_BANNER.title}</h2>
                            <p className="text-[11px] text-muted">
                                {GUARANTEE_BANNER.text}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => alert(ALERTS.salesChat)}
                        className="relative z-10 flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary-dark px-4 text-xs font-semibold text-white transition hover:bg-primary"
                    >
                        {GUARANTEE_BANNER.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
            </div>

        </div>
    );
}
