import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    CalendarDays,
    ChevronDown,
    Download,
    FileSpreadsheet,
    FileText,
    Info,
    X,
} from "lucide-react";
import { COLORS, TABLE_HEADERS } from "../data/theme.js";
import {
    AUTHORITY_TREND,
    BACKLINK_TYPES,
    CATEGORIES,
    CATEGORIES_HEADER,
    CHART_RANGES,
    CLEAR_LABEL,
    COMPARE_LABEL,
    COMPETITOR_ALERTS,
    COMPETITOR_HEADER,
    COMPETITOR_ROWS,
    DATE_RANGES,
    DEFAULT_CHART_RANGE,
    DEFAULT_DATE_RANGE,
    DOMAIN_FIELDS,
    DOMAIN_PLACEHOLDER,
    EXPORT_LABEL,
    EXPORT_OPTIONS,
    INITIAL_DOMAINS,
    LINK_ATTRIBUTES,
    METRIC_COLUMNS,
    PENDING_VALUE,
    REFERRING_TREND,
    sourcesFor,
    TRAFFIC_SOURCES_TITLE,
    YOU_BADGE,
} from "../data/competitor.js";

const EXPORT_ICONS = { FileText, FileSpreadsheet };

const MENU_BTN =
    "flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50";
const MENU_BTN_SM =
    "flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-700 transition hover:border-primary/50";
const MENU_ITEM = "block w-full rounded-md px-3 py-1.5 text-left text-xs text-gray-700 transition hover:bg-gray-50";
const MENU_ITEM_ACTIVE = "bg-gray-50 font-medium text-ink";

export default function CompetitorAnalysis() {
    const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
    const [chartRanges, setChartRanges] = useState({
        authority: DEFAULT_CHART_RANGE,
        referring: DEFAULT_CHART_RANGE,
    });
    const [domains, setDomains] = useState(INITIAL_DOMAINS);
    const [fields, setFields] = useState(() => Array(DOMAIN_FIELDS).fill(""));

    const trackRow = (domain) => COMPETITOR_ROWS.find((row) => row.domain === domain);

    const addDomain = (index, value) => {
        const domain = value.trim().toLowerCase();
        if (!domain) return;

        setFields((prev) => prev.map((field, i) => (i === index ? "" : field)));
        setDomains((prev) =>
            prev.some((entry) => entry.domain === domain) ? prev : [...prev, { domain, isYou: false }]
        );
    };

    const removeDomain = (domain) => {
        setDomains((prev) => prev.filter((entry) => entry.domain !== domain));
        alert(COMPETITOR_ALERTS.removed(domain));
    };

    const clearAll = () => {
        setDomains((prev) => prev.filter((entry) => entry.isYou));
        setFields(Array(DOMAIN_FIELDS).fill(""));
        alert(COMPETITOR_ALERTS.cleared);
    };

    const compare = () => {
        const competitors = domains.filter((entry) => !entry.isYou);

        if (competitors.length === 0) {
            alert(COMPETITOR_ALERTS.emptyCompare);
            return;
        }
        alert(COMPETITOR_ALERTS.compare([...domains.map((entry) => entry.domain)]));
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto [scrollbar-width:thin] pb-1">

            {/* PAGE HEADING */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold leading-7">{COMPETITOR_HEADER.title}</h1>
                    <p className="text-xs text-muted">{COMPETITOR_HEADER.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Menu
                        width="w-60"
                        button={
                            <>
                                <CalendarDays className="h-4 w-4 text-primary" />
                                {dateRange}
                                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                            </>
                        }
                        buttonClassName={MENU_BTN}
                    >
                        <div className="px-3 pb-1 pt-2 text-[11px] font-semibold text-muted">Select Date Range</div>
                        {DATE_RANGES.map((range) => (
                            <MenuItem
                                key={range}
                                active={range === dateRange}
                                onClick={() => setDateRange(range)}
                            >
                                {range}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Menu
                        width="w-52"
                        button={
                            <>
                                <Download className="h-4 w-4 text-primary" />
                                {EXPORT_LABEL}
                            </>
                        }
                        buttonClassName={MENU_BTN + " text-primary"}
                    >
                        {EXPORT_OPTIONS.map((option) => {
                            const OptionIcon = EXPORT_ICONS[option.Icon];
                            return (
                                <MenuItem
                                    key={option.id}
                                    onClick={() => alert(COMPETITOR_ALERTS.exported(option.label))}
                                >
                                    <span className="flex items-center gap-2.5">
                                        <OptionIcon className="h-4 w-4" style={{ color: option.color }} />
                                        {option.label}
                                    </span>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
            </div>

            {/* ROOT DOMAIN INPUTS */}
            <div className="shrink-0 rounded-xl border border-line bg-white p-4 shadow-sm">
                <label className="mb-2.5 block text-xs font-semibold">Root Domain(s)</label>

                <div className="flex flex-wrap items-center gap-2.5">
                    {domains.map((entry) => {
                        const tracked = trackRow(entry.domain);
                        const active = entry.isYou;

                        return (
                            <div
                                key={entry.domain}
                                className={
                                    "flex h-9 w-60 items-center gap-2 rounded-lg border pl-2.5 pr-2 " +
                                    (active ? "border-primary/40 bg-mint/50" : "border-line")
                                }
                            >
                                {active ? (
                                    <span className="rounded bg-mint px-1.5 py-0.5 text-[9px] font-bold text-primary-dark">
                                        {YOU_BADGE}
                                    </span>
                                ) : (
                                    <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: tracked ? tracked.color : COLORS.compPending }}
                                    ></span>
                                )}

                                <span className="flex-1 truncate text-[13px] font-medium">{entry.domain}</span>

                                <button
                                    onClick={() => removeDomain(entry.domain)}
                                    title={`Remove ${entry.domain}`}
                                    className="text-gray-400 transition hover:text-gray-700"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        );
                    })}

                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className="flex h-9 w-60 items-center gap-2 rounded-lg border border-dashed border-line pl-2.5 pr-2"
                        >
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-300"></span>
                            <input
                                type="text"
                                value={field}
                                onChange={(e) =>
                                    setFields((prev) =>
                                        prev.map((value, i) => (i === index ? e.target.value : value))
                                    )
                                }
                                onKeyDown={(e) => e.key === "Enter" && addDomain(index, field)}
                                placeholder={DOMAIN_PLACEHOLDER}
                                className="flex-1 bg-transparent text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
                            />
                        </div>
                    ))}

                    <div className="ml-auto flex items-center gap-2">
                        <button
                            onClick={compare}
                            className="flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-white transition hover:bg-primary-dark"
                        >
                            {COMPARE_LABEL}
                        </button>
                        <button
                            onClick={clearAll}
                            className="flex h-9 items-center rounded-lg border border-line bg-white px-3.5 text-xs font-medium text-gray-700 transition hover:border-primary/50"
                        >
                            {CLEAR_LABEL}
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN METRICS TABLE */}
            <div className="shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <div className="overflow-x-auto [scrollbar-width:thin]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {TABLE_HEADERS.competitorMetrics.map((label, index) => (
                                    <th
                                        key={label}
                                        className={
                                            "whitespace-nowrap bg-gray-50 px-3 py-2 text-[11px] font-medium text-muted " +
                                            (index === 0 ? "text-left" : "text-center")
                                        }
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map((entry) => {
                                const tracked = trackRow(entry.domain);
                                const sources = sourcesFor(entry.domain);

                                return (
                                    <tr key={entry.domain} className="hover:bg-gray-50/60">
                                        <td className="whitespace-nowrap border-t border-gray-100 px-3 py-2">
                                            <span className="flex items-center gap-2 font-medium">
                                                <span
                                                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                    style={{
                                                        backgroundColor: tracked
                                                            ? tracked.color
                                                            : COLORS.compPending,
                                                    }}
                                                ></span>
                                                {entry.domain}
                                            </span>
                                        </td>

                                        {METRIC_COLUMNS.map((column) => {
                                            const cell = tracked?.values[column.key];
                                            const isTraffic = column.key === "traffic";

                                            if (isTraffic) {
                                                return (
                                                    <td
                                                        key={column.key}
                                                        className={
                                                            "whitespace-nowrap border-t border-gray-100 px-3 py-2 text-center " +
                                                            (cell.best ? "bg-mint/50" : "")
                                                        }
                                                    >
                                                        {cell ? (
                                                            <Popover
                                                                button={
                                                                    <>
                                                                        <span
                                                                            className={
                                                                                "font-medium " +
                                                                                (cell.best ? "text-primary" : "text-gray-700")
                                                                            }
                                                                        >
                                                                            {cell.text}
                                                                        </span>
                                                                        <ChevronDown className="h-3 w-3 text-primary" />
                                                                    </>
                                                                }
                                                                buttonClassName="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-gray-100"
                                                            >
                                                                <div className="border-b border-gray-100 px-3 pb-1 pt-1.5 text-center text-[10px] font-semibold text-muted">
                                                                    {TRAFFIC_SOURCES_TITLE}
                                                                </div>
                                                                {sources.map((source) => (
                                                                    <div
                                                                        key={source.label}
                                                                        className="flex justify-between px-3 py-1 text-[11px] text-gray-700"
                                                                    >
                                                                        <span>{source.label}</span>
                                                                        <span>{source.share}</span>
                                                                    </div>
                                                                ))}
                                                            </Popover>
                                                        ) : (
                                                            <span className="text-gray-400">{PENDING_VALUE}</span>
                                                        )}
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td
                                                    key={column.key}
                                                    className={
                                                        "whitespace-nowrap border-t border-gray-100 px-3 py-2 text-center " +
                                                        (cell
                                                            ? cell.best
                                                                ? "bg-mint/50 font-semibold"
                                                                : "text-gray-700"
                                                            : "text-gray-400")
                                                    }
                                                >
                                                    {cell ? cell.text : PENDING_VALUE}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TREND CHARTS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-2">
                <TrendCard
                    title="Authority Score Trend"
                    trend={AUTHORITY_TREND}
                    range={chartRanges.authority}
                    onRange={(range) => setChartRanges((prev) => ({ ...prev, authority: range }))}
                />
                <TrendCard
                    title="Referring Domains Trend"
                    trend={REFERRING_TREND}
                    range={chartRanges.referring}
                    onRange={(range) => setChartRanges((prev) => ({ ...prev, referring: range }))}
                />
            </div>

            {/* STACKED BARS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-2">
                <StackedCard card={BACKLINK_TYPES} />
                <StackedCard card={LINK_ATTRIBUTES} />
            </div>

            {/* TOP CATEGORIES TABLE */}
            <div className="shrink-0 rounded-xl border border-line bg-white p-4 shadow-sm">
                <CardTitle title="Top Categories of Referring Domains" />

                <div className="mt-2.5 overflow-x-auto [scrollbar-width:thin]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="w-1/2 bg-gray-50 px-3 py-2 text-left text-[11px] font-medium text-muted">
                                    {CATEGORIES_HEADER}
                                </th>
                                {COMPETITOR_ROWS.map((row) => (
                                    <th
                                        key={row.domain}
                                        className="whitespace-nowrap bg-gray-50 px-3 py-2 text-[11px] font-medium text-muted"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{ backgroundColor: row.color }}
                                            ></span>
                                            {row.domain}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {CATEGORIES.map((row) => (
                                <tr key={row.category} className="hover:bg-gray-50/60">
                                    <td className="border-t border-gray-100 px-3 py-2 text-[13px] text-gray-700">
                                        {row.category}
                                    </td>
                                    {COMPETITOR_ROWS.map((col) => {
                                        const cell = row.cells[col.isYou ? "you" : "them"];
                                        return (
                                            <td
                                                key={col.domain}
                                                className={
                                                    "border-t border-gray-100 px-3 py-2 text-center text-[13px] " +
                                                    (cell.best ? "bg-mint/50 font-semibold" : "text-gray-700")
                                                }
                                            >
                                                {cell.text}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

/* ---------------- local building blocks ---------------- */

function CardTitle({ title }) {
    return (
        <div className="flex items-center gap-1.5">
            <h2 className="whitespace-nowrap text-sm font-semibold">{title}</h2>
            <Info className="h-4 w-4 cursor-help text-gray-400" />
        </div>
    );
}

function TrendCard({ title, trend, range, onRange }) {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="flex shrink-0 items-center justify-between gap-2">
                <CardTitle title={title} />

                <Menu
                    width="w-36"
                    button={
                        <>
                            {range}
                            <ChevronDown className="h-3 w-3" />
                        </>
                    }
                    buttonClassName={MENU_BTN_SM}
                >
                    {CHART_RANGES.map((option) => (
                        <MenuItem key={option} active={option === range} onClick={() => onRange(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            <div className="mt-3 flex min-h-[160px] flex-1 gap-3">
                <div className="flex w-10 flex-col justify-between pb-5 text-[10px] text-gray-400">
                    {trend.yLabels.map((label, index) => (
                        <span key={index}>{label}</span>
                    ))}
                </div>

                <div className="relative min-h-0 flex-1">
                    <div className="absolute left-0 top-0 w-full border-t border-dashed border-gray-200"></div>
                    <div className="absolute left-0 top-1/3 w-full border-t border-dashed border-gray-200"></div>
                    <div className="absolute left-0 top-2/3 w-full border-t border-dashed border-gray-200"></div>
                    <div className="absolute bottom-5 left-0 w-full border-t border-dashed border-gray-200"></div>

                    <svg
                        className="h-full max-h-[180px] w-full overflow-visible"
                        viewBox={`0 0 ${trend.width} ${trend.height}`}
                        preserveAspectRatio="none"
                    >
                        {trend.series.map((series) => (
                            <g key={series.key}>
                                <polyline
                                    fill="none"
                                    stroke={series.color}
                                    strokeWidth="2.3"
                                    points={series.points.map(([x, y]) => `${x},${y}`).join(" ")}
                                />
                                {series.points.map(([x, y], index, all) => (
                                    <circle
                                        key={`${x}-${y}`}
                                        cx={x}
                                        cy={y}
                                        r={index === all.length - 1 ? 4.5 : 3.5}
                                        fill={series.color}
                                        stroke="#ffffff"
                                        strokeWidth="1.5"
                                    />
                                ))}
                            </g>
                        ))}
                    </svg>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-400">
                        {trend.labels.map((label) => (
                            <span key={label}>{label}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2 flex shrink-0 items-center justify-center gap-5">
                {COMPETITOR_ROWS.map((row) => (
                    <span key={row.domain} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-700">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }}></span>
                        {row.domain}
                    </span>
                ))}
            </div>
        </div>
    );
}

function StackedCard({ card }) {
    return (
        <div className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
            <CardTitle title={card.title} />

            <div className="mt-3 flex flex-wrap items-center gap-4">
                {card.segments.map((segment) => (
                    <span key={segment.label} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }}></span>
                        {segment.label}
                    </span>
                ))}
            </div>

            <div className="mt-4 flex flex-col gap-3">
                {card.rows.map((row) => (
                    <div key={row.domain} className="flex items-center gap-3">
                        <span className="w-20 shrink-0 truncate text-[11px] font-medium text-gray-700">
                            {row.domain}
                        </span>
                        <div className="flex h-6 flex-1 overflow-hidden rounded-r bg-gray-100">
                            {row.parts.map((part) => (
                                <div
                                    key={part.label}
                                    title={`${part.label}: ${part.share}`}
                                    style={{ width: part.width, backgroundColor: part.color }}
                                    className="cursor-pointer transition hover:opacity-80"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Menu({ button, buttonClassName = "", width = "w-52", align = "right", children }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return (
        <div className={"relative " + width} ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className={buttonClassName}
            >
                {button}
            </button>

            {open && (
                <div
                    className={
                        "absolute top-full z-30 mt-1.5 rounded-xl border border-line bg-white p-1 shadow-md " +
                        (align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0")
                    }
                >
                    {/* selecting any item closes the menu */}
                    {Children.map(children, (child) =>
                        isValidElement(child) && child.props.onClick
                            ? cloneElement(child, {
                                  onClick: (event) => {
                                      child.props.onClick(event);
                                      setOpen(false);
                                  },
                              })
                            : child
                    )}
                </div>
            )}
        </div>
    );
}

/* table cells live inside a scroll container, so this dropdown is portalled to <body>
   and positioned from the anchor rect instead of being absolutely positioned */
function Popover({ button, buttonClassName = "", width = 192, children }) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const anchorRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const place = () => {
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 6,
                left: Math.min(
                    Math.max(8, rect.left + rect.width / 2 - width / 2),
                    window.innerWidth - width - 8
                ),
            });
        };

        const onPointerDown = (event) => {
            const inAnchor = anchorRef.current && anchorRef.current.contains(event.target);
            const inPanel = panelRef.current && panelRef.current.contains(event.target);
            if (!inAnchor && !inPanel) setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        place();
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", place, true);
        window.addEventListener("resize", place);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", place, true);
            window.removeEventListener("resize", place);
        };
    }, [open, width]);

    return (
        <>
            <span className="inline-flex" ref={anchorRef}>
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                    className={buttonClassName}
                >
                    {button}
                </button>
            </span>

            {open &&
                createPortal(
                    <div
                        ref={panelRef}
                        style={{ top: position.top, left: position.left, width }}
                        className="fixed z-50 rounded-xl border border-line bg-white p-1 shadow-md"
                    >
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
}

function MenuItem({ active = false, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={MENU_ITEM + (active ? " " + MENU_ITEM_ACTIVE : "")}
        >
            {children}
        </button>
    );
}