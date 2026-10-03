import { useState } from "react";
import {
    AlignLeft,
    AlertTriangle,
    ArrowRight,
    Check,
    Clock,
    FileImage,
    FileText,
    Image,
    ImageOff,
    Link2,
    Star,
    Type,
} from "lucide-react";
import {
    ACTION_BTN,
    PILL,
    TD,
    TH,
    TINTS,
} from "../data/ui.js";
import {
    COLORS,
    ALERTS_EXTRA,
    GAUGE_CONFIG,
    PROGRESS_CONFIG,
    TABLE_HEADERS,
} from "../data/theme.js";
import {
    CONTENT_KEYWORDS,
    CONTENT_ROWS,
    CONTENT_SCORE,
    CONTENT_SUMMARY,
    CONTENT_OVERVIEW,
    CORE_WEB_VITALS,
    HIGHLIGHT_TERMS,
    HTML_QUICK_STATS,
    HTML_ROWS,
    HTML_SCORE,
    IMAGE_ROWS,
    IMAGE_TIPS,
    IMAGES_SCORE,
    INTERNAL_LINKS,
    LINKS_SCORE,
    LIVE_SNIPPETS,
    LIVE_TABS,
    PERFORMANCE_ROWS,
    BROKEN_LINK_COUNT,
    SPEED_SCORE,
    SPEED_TIPS,
    SUGGESTED_LINKS,
} from "../data/onPageSeo.js";

export { ACTION_BTN, PILL, TD, TH, TINTS };

/* icon registry: data files reference icons by name so they stay framework-light */
const OVERVIEW_ICONS = { "word-count": FileText, paragraphs: AlignLeft, "read-time": Clock };

/* ===================== DATA -> src/data/onPageSeo.js ===================== */

export function Pill({ tone, children }) {
    return (
        <span className={"inline-flex min-w-[68px] justify-center whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium " + PILL[tone]}>
            {children}
        </span>
    );
}

export function ScoreGauge({ score, color = GAUGE_CONFIG.good }) {
    const degrees = score * 3.6;
    return (
        <div
            className="flex h-[110px] w-[110px] shrink-0 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(${color} 0deg ${degrees}deg, ${GAUGE_CONFIG.track} ${degrees}deg 360deg)` }}
        >
            <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-white">
                <strong className="text-[24px] leading-7">{score}</strong>
                <span className="text-[11px] text-muted">/100</span>
            </div>
        </div>
    );
}

export function ScorePanel({ title, score, color = GAUGE_CONFIG.good, badge, description }) {
    return (
        <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">{title}</h2>
            <div className="mt-3 flex items-center gap-4">
                <ScoreGauge score={score} color={color} />
                <div className="min-w-0">
                    <h3 className="text-lg font-bold" style={{ color }}>{badge}</h3>
                    <p className="mt-1 text-xs leading-4 text-muted">{description}</p>
                </div>
            </div>
        </div>
    );
}

export function StatTile({ icon: Icon, badge, value, label, tint = TINTS.green }) {
    return (
        <div className="rounded-xl border border-line bg-white p-3 text-center">
            <span className={"mx-auto flex h-9 w-9 items-center justify-center rounded-lg " + tint}>
                {Icon ? <Icon className="h-4 w-4" /> : <span className="text-[11px] font-bold">{badge}</span>}
            </span>
            <strong className="mt-2 block text-xl leading-7">{value}</strong>
            <span className="block text-[11px] text-muted">{label}</span>
        </div>
    );
}

export function TableCard({ title, headers, children }) {
    return (
        <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-2.5">
                <h2 className="text-sm font-semibold">{title}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header} className={TH}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}

export function TipList({ items }) {
    return (
        <ul className="mt-3 flex flex-col gap-2.5">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-4 text-gray-700">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[${COLORS.tipCheck}]`}>
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {item}
                </li>
            ))}
        </ul>
    );
}

/* ===================== CONTENT ANALYSIS ===================== */

/* ---------- shared helpers for the subpage tabs ---------- */

function Highlight({ text }) {
    const pattern = new RegExp(`(${HIGHLIGHT_TERMS.join("|")})`, "gi");
    return text.split(pattern).map((part, index) =>
        HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
            <strong key={index} className="font-semibold text-ink">{part}</strong>
        ) : (
            <span key={index}>{part}</span>
        )
    );
}

/* ===================== HTML ELEMENTS ===================== */

/* ===================== SUBPAGE TABS ===================== */

export function ContentAnalysisTab() {
    const [liveTab, setLiveTab] = useState("Sentences");
    const [doneRows, setDoneRows] = useState([]);

    const runAction = (row) => {
        if (doneRows.includes(row.element)) return;
        const confirmed = confirm(ALERTS_EXTRA.applyContent(row.action, row.element, row.details));
        if (confirmed) {
            setDoneRows((prev) => [...prev, row.element]);
            alert(ALERTS_EXTRA.elementUpdated(row.element));
        }
    };

    return (
        <>
            {/* CONTENT OVERVIEW / CONTENT SCORE */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Content Overview</h2>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {CONTENT_OVERVIEW.map((tile) => {
                            const TileIcon = OVERVIEW_ICONS[tile.stat];
                            return (
                                <StatTile
                                    key={tile.stat}
                                    icon={TileIcon}
                                    value={tile.value}
                                    label={tile.label}
                                    tint={tile.tint && TINTS[tile.tint]}
                                />
                            );
                        })}
                    </div>
                </div>

                <ScorePanel
                    title="Content Score"
                    score={CONTENT_SCORE.score}
                    badge={CONTENT_SCORE.badge}
                    description={CONTENT_SCORE.description}
                />
            </div>

            {/* CONTENT ANALYSIS TABLE */}
            <TableCard title="Content Analysis" headers={TABLE_HEADERS.htmlElements}>
                {CONTENT_ROWS.map((row) => (
                    <tr key={row.element} className="hover:bg-gray-50/60">
                        <td className={TD + " whitespace-nowrap font-medium text-ink"}>{row.element}</td>
                        <td className={TD}>
                            <Pill tone={row.tone}>{row.status}</Pill>
                        </td>
                        <td className={TD}>{row.details}</td>
                        <td className={TD}>
                            {row.action ? (
                                <button className={ACTION_BTN} onClick={() => runAction(row)}>
                                    {doneRows.includes(row.element) ? "Done" : row.action}
                                </button>
                            ) : (
                                <span className="text-gray-400">&mdash;</span>
                            )}
                        </td>
                    </tr>
                ))}
            </TableCard>

            {/* LIVE CONTENT ANALYSIS / KEYWORD USAGE */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Live Content Analysis</h2>

                    <div className="mt-2.5 flex gap-1.5">
                        {LIVE_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setLiveTab(tab)}
                                className={
                                    "rounded-full border px-3 py-1 text-[11px] transition " +
                                    (liveTab === tab
                                        ? "border-emerald-300 bg-mint font-medium text-primary"
                                        : "border-line bg-white text-muted hover:text-gray-700")
                                }
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className={`mt-3 min-h-[92px] rounded-lg border border-gray-100 bg-[${COLORS.contentBg}] p-3 text-xs leading-5 text-gray-700`}>
                        {liveTab === "Sentences" && (
                            <div className="flex flex-col gap-2">
                                {LIVE_SNIPPETS.Sentences.map((sentence) => (
                                    <p key={sentence}><Highlight text={sentence} /></p>
                                ))}
                            </div>
                        )}
                        {liveTab === "Keywords" && (
                            <div className="flex flex-wrap gap-1.5">
                                {LIVE_SNIPPETS.Keywords.map((item) => (
                                    <span
                                        key={item.term}
                                        className={`rounded-full border border-emerald-200 bg-mint px-2.5 py-1 text-[11px] text-primary`}
                                    >
                                        {item.term} <strong className="font-semibold">&times;{item.count}</strong>
                                    </span>
                                ))}
                            </div>
                        )}
                        {liveTab === "Topics" && (
                            <div className="flex flex-wrap gap-1.5">
                                {LIVE_SNIPPETS.Topics.map((topic) => (
                                    <span key={topic} className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-mint p-3">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[${COLORS.tipCheck}] text-[10px] text-white`}>&#10003;</span>
                        <p className="text-xs leading-4 text-gray-700">
                            {CONTENT_SUMMARY}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold">Keyword Usage in Content</h2>
                        <button
                            onClick={() => alert(ALERTS_EXTRA.viewAllKeywords)}
                            className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary hover:underline"
                        >
                            View All <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mt-3 flex flex-col gap-3.5">
                        {CONTENT_KEYWORDS.map((row) => (
                            <div key={row.keyword}>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="truncate text-gray-700">{row.keyword}</span>
                                    <span className="shrink-0 font-medium text-gray-700">{row.used}/{row.target}</span>
                                </div>
                                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className={`h-full rounded-full bg-[${PROGRESS_CONFIG.fill}]`}
                                        style={{ width: `${Math.round((row.used / row.target) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export function HtmlElementsTab() {
    const [doneRows, setDoneRows] = useState([]);

    const runAction = (row) => {
        if (doneRows.includes(row.element)) return;
        const confirmed = confirm(ALERTS_EXTRA.applyHtml(row.action, row.element, row.details));
        if (confirmed) {
            setDoneRows((prev) => [...prev, row.element]);
            alert(ALERTS_EXTRA.elementUpdated(row.element));
        }
    };

    return (
        <>
            {/* HTML SEO SCORE / QUICK STATS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
                <ScorePanel
                    title="HTML SEO Score"
                    score={HTML_SCORE.score}
                    badge={HTML_SCORE.badge}
                    description={HTML_SCORE.description}
                />

                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Quick Stats</h2>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                        {HTML_QUICK_STATS.map((stat) => (
                            <StatTile key={stat.label} badge={stat.badge} value={stat.value} label={stat.label} tint={TINTS[stat.tint]} />
                        ))}
                    </div>
                </div>
            </div>

            {/* HTML ELEMENTS ANALYSIS TABLE */}
            <TableCard title="HTML Elements Analysis" headers={TABLE_HEADERS.htmlElements}>
                {HTML_ROWS.map((row) => (
                    <tr key={row.element} className="hover:bg-gray-50/60">
                        <td className={TD + " whitespace-nowrap font-medium text-ink"}>{row.element}</td>
                        <td className={TD}>
                            <Pill tone={row.tone}>{row.status}</Pill>
                        </td>
                        <td className={TD}>{row.details}</td>
                        <td className={TD}>
                            {row.action ? (
                                <button
                                    className={ACTION_BTN + (doneRows.includes(row.element) ? " border-emerald-300 text-primary" : "")}
                                    onClick={() => runAction(row)}
                                >
                                    {doneRows.includes(row.element) ? "Done" : row.action}
                                </button>
                            ) : (
                                <span className="text-gray-400">&mdash;</span>
                            )}
                        </td>
                    </tr>
                ))}
            </TableCard>
        </>
    );
}

export function ImagesTab() {
    const [altOverrides, setAltOverrides] = useState({});

    const rows = IMAGE_ROWS.map((row) => ({ ...row, alt: altOverrides[row.file] ?? row.alt }));
    const withAlt = rows.filter((row) => row.alt).length;
    const needOptimization = rows.length - withAlt;

    const addAltText = (row) => {
        if (row.alt) return;
        const value = prompt(`Enter alt text for ${row.file}:`, "");
        if (value && value.trim()) {
            setAltOverrides((prev) => ({ ...prev, [row.file]: value.trim() }));
            alert(ALERTS_EXTRA.altTextAdded(row.file));
        }
    };

    return (
        <>
            {/* IMAGES SEO SCORE / IMAGE OVERVIEW */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
                <ScorePanel
                    title="Images SEO Score"
                    score={IMAGES_SCORE.score}
                    color={IMAGES_SCORE.color}
                    badge={IMAGES_SCORE.badge}
                    description={IMAGES_SCORE.description}
                />

                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Image Overview</h2>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        <StatTile icon={Image} value={rows.length} label="Total Images" tint={TINTS.purple} />
                        <StatTile icon={Type} value={withAlt} label="With ALT Text" tint={withAlt ? TINTS.green : TINTS.red} />
                        <StatTile icon={AlertTriangle} value={needOptimization} label="Need Optimization" tint={TINTS.yellow} />
                    </div>
                </div>
            </div>

            {/* IMAGE ANALYSIS TABLE */}
            <TableCard title="Image Analysis" headers={TABLE_HEADERS.imageAnalysis}>
                {rows.map((row) => (
                    <tr key={row.file} className="hover:bg-gray-50/60">
                        <td className="border-t border-gray-100 px-2 py-1.5">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-md bg-[${COLORS.purpleLight}] text-[${COLORS.purple}]`}>
                                <FileImage className="h-4 w-4" />
                            </span>
                        </td>
                        <td className={TD + " whitespace-nowrap"}>{row.file}</td>
                        <td className={TD}>
                            {row.alt ? row.alt : <span className={`font-medium text-[${COLORS.red}]`}>Missing</span>}
                        </td>
                        <td className={TD + " whitespace-nowrap"}>{row.size}</td>
                        <td className={TD}>
                            <Pill tone={row.alt ? "good" : "warn"}>{row.alt ? "Optimized" : "Needs ALT"}</Pill>
                        </td>
                        <td className={TD}>
                            {row.alt ? (
                                <span className="text-gray-400">&mdash;</span>
                            ) : (
                                <button className={ACTION_BTN} onClick={() => addAltText(row)}>Add</button>
                            )}
                        </td>
                    </tr>
                ))}
            </TableCard>

            {/* IMAGE OPTIMIZATION TIPS */}
            <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold">Image Optimization Tips</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_170px]">
                    <TipList items={IMAGE_TIPS} />
                    <div className={`hidden flex-col items-center justify-center rounded-lg border border-dashed border-line bg-[${COLORS.contentBg}] py-5 md:flex`}>
                        <ImageOff className="h-7 w-7 text-gray-300" />
                        <span className="mt-1.5 text-[10px] text-gray-400">Add an image</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export function InternalLinksTab() {
    const [addedLinks, setAddedLinks] = useState([]);

    const addLink = (row) => {
        if (addedLinks.includes(row.page)) return;
        const confirmed = confirm(ALERTS_EXTRA.addLinkConfirm(row.page, row.anchor));
        if (confirmed) {
            setAddedLinks((prev) => [...prev, row.page]);
            alert(ALERTS_EXTRA.internalLinkAdded(row.page));
        }
    };

    return (
        <>
            {/* INTERNAL LINKS SCORE / LINK OVERVIEW */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
                <ScorePanel
                    title="Internal Links Score"
                    score={LINKS_SCORE.score}
                    badge={LINKS_SCORE.badge}
                    description={LINKS_SCORE.description}
                />

                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Link Overview</h2>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        <StatTile icon={Link2} value={INTERNAL_LINKS.length} label="Internal Links" tint={TINTS.green} />
                        <StatTile icon={Star} value={SUGGESTED_LINKS.length} label="Suggested Links" tint={TINTS.yellow} />
                        <StatTile icon={AlertTriangle} value={BROKEN_LINK_COUNT} label="Broken Links" tint={TINTS.red} />
                    </div>
                </div>
            </div>

            {/* INTERNAL LINK ANALYSIS TABLE */}
            <TableCard title="Internal Link Analysis" headers={TABLE_HEADERS.internalLinks}>
                {INTERNAL_LINKS.map((link) => (
                    <tr key={link.href} className="hover:bg-gray-50/60">
                        <td className={TD + " whitespace-nowrap"}>{link.href}</td>
                        <td className={TD}>{link.text}</td>
                        <td className={TD}>
                            <Pill tone="good">{link.status}</Pill>
                        </td>
                        <td className={TD}>
                            <span className="text-gray-400">&mdash;</span>
                        </td>
                    </tr>
                ))}
            </TableCard>

            {/* RECOMMENDED INTERNAL LINKS TABLE */}
            <TableCard title="Recommended Internal Links" headers={TABLE_HEADERS.recommendedLinks}>
                {SUGGESTED_LINKS.map((row) => {
                    const added = addedLinks.includes(row.page);
                    return (
                        <tr key={row.page} className="hover:bg-gray-50/60">
                            <td className={TD + " whitespace-nowrap"}>{row.page}</td>
                            <td className={TD}>{row.anchor}</td>
                            <td className={TD}>
                                <Pill tone={row.relevance === "High" ? "good" : "warn"}>{row.relevance}</Pill>
                            </td>
                            <td className={TD}>
                                <button
                                    className={ACTION_BTN + (added ? " border-emerald-300 text-primary" : "")}
                                    onClick={() => addLink(row)}
                                    disabled={added}
                                >
                                    {added ? "Added" : "Add Link"}
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </TableCard>
        </>
    );
}

export function PageSpeedTab() {
    const [optimizedRows, setOptimizedRows] = useState([]);

    const optimize = (row) => {
        if (optimizedRows.includes(row.metric)) return;
        const confirmed = confirm(ALERTS_EXTRA.optimizeConfirm(row.metric, row.score, row.details));
        if (confirmed) {
            setOptimizedRows((prev) => [...prev, row.metric]);
            alert(ALERTS_EXTRA.optimizationApplied(row.metric));
        }
    };

    return (
        <>
            {/* PAGE SPEED SCORE / CORE WEB VITALS */}
            <div className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
                <ScorePanel
                    title="Page Speed Score"
                    score={SPEED_SCORE.score}
                    badge={SPEED_SCORE.badge}
                    description={SPEED_SCORE.description}
                />

                <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Core Web Vitals</h2>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {CORE_WEB_VITALS.map((vital) => (
                            <div key={vital.label} className={`rounded-xl border border-emerald-100 bg-mint p-3 text-center`}>
                                <strong className="block text-xl leading-7 text-ink">{vital.value}</strong>
                                <span className="block text-xs font-medium text-gray-700">{vital.label}</span>
                                <span className={`block text-[11px] text-[${COLORS.green}]`}>({vital.status})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PERFORMANCE ANALYSIS TABLE */}
            <TableCard title="Performance Analysis" headers={TABLE_HEADERS.performance}>
                {PERFORMANCE_ROWS.map((row) => {
                    const done = optimizedRows.includes(row.metric);
                    return (
                        <tr key={row.metric} className="hover:bg-gray-50/60">
                            <td className={TD + " whitespace-nowrap font-medium text-ink"}>{row.metric}</td>
                            <td className={TD + " whitespace-nowrap"}>{row.score}</td>
                            <td className={TD}>
                                <Pill tone={done ? "good" : row.tone}>{done ? "Good" : row.status}</Pill>
                            </td>
                            <td className={TD + " whitespace-nowrap text-muted"}>{row.details}</td>
                            <td className={TD}>
                                {row.action ? (
                                    <button
                                        className={ACTION_BTN + (done ? " border-emerald-300 text-primary" : "")}
                                        onClick={() => optimize(row)}
                                    >
                                        {done ? "Done" : row.action}
                                    </button>
                                ) : (
                                    <span className="text-gray-400">&mdash;</span>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </TableCard>

            {/* TOP RECOMMENDATIONS */}
            <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold">Top Recommendations</h2>
                <TipList items={SPEED_TIPS} />
            </div>
        </>
    );
}
