import { useState } from "react";
import {
    Bell,
    BellOff,
    Check,
    CheckCheck,
    ClipboardCheck,
    FileText,
    Link2,
    Search,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        icon: ClipboardCheck,
        tone: "emerald",
        title: "Website audit completed",
        message: "Audit for example.com finished with a health score of 93. 12 critical issues need your attention.",
        time: "2 min ago",
        unread: true,
    },
    {
        id: 2,
        icon: Search,
        tone: "blue",
        title: "New keyword opportunities",
        message: "42 new low-competition keywords were found in your Keyword Research dashboard.",
        time: "18 min ago",
        unread: true,
    },
    {
        id: 3,
        icon: TrendingUp,
        tone: "emerald",
        title: "Rankings improved",
        message: "5 keywords entered the top 10 on Google this week. Keep building content around them.",
        time: "1 hour ago",
        unread: true,
    },
    {
        id: 4,
        icon: FileText,
        tone: "violet",
        title: "SEO report ready",
        message: "Your scheduled monthly SEO report for April 2026 has been generated and is ready to download.",
        time: "3 hours ago",
        unread: false,
    },
    {
        id: 5,
        icon: Link2,
        tone: "amber",
        title: "Lost backlink detected",
        message: "A referring link from a DA 62 domain was removed. Review the suggestion to reclaim it.",
        time: "Yesterday",
        unread: false,
    },
    {
        id: 6,
        icon: ShieldCheck,
        tone: "rose",
        title: "Security alert",
        message: "Your password was changed successfully. If this wasn't you, reset your password immediately.",
        time: "2 days ago",
        unread: false,
    },
    {
        id: 7,
        icon: Check,
        tone: "emerald",
        title: "Welcome to TN SEO Module",
        message: "Your account is ready. Add your first project to start tracking SEO performance.",
        time: "3 days ago",
        unread: false,
    },
];

const TONES = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
};

export default function Notifications() {
    const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState("all");

    const unreadCount = items.filter((item) => item.unread).length;
    const visible = filter === "unread" ? items.filter((item) => item.unread) : items;

    const markRead = (id) => {
        setItems((current) =>
            current.map((item) => (item.id === id ? { ...item, unread: false } : item))
        );
    };

    const markAllRead = () => {
        setItems((current) => current.map((item) => ({ ...item, unread: false })));
    };

    return (
        <div className="mx-auto max-w-[900px] pb-12 pt-6">
            {/* Heading */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-[26px] font-bold tracking-[-0.5px] text-ink">
                        Notifications
                    </h1>
                    <p className="mt-1 text-[13px] text-muted">
                        Stay on top of audits, rankings, reports and account activity.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition hover:bg-mint disabled:cursor-default disabled:opacity-50"
                >
                    <CheckCheck className="h-4 w-4" />
                    Mark all as read
                </button>
            </div>

            {/* Filters */}
            <div className="mb-4 flex items-center gap-2">
                {[
                    { key: "all", label: `All (${items.length})` },
                    { key: "unread", label: `Unread (${unreadCount})` },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setFilter(tab.key)}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                            filter === tab.key
                                ? "bg-primary text-white"
                                : "border border-line bg-white text-muted hover:text-ink"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            {visible.length === 0 ? (
                <div className="rounded-xl border border-line bg-white px-6 py-16 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-mint text-primary">
                        <BellOff className="h-6 w-6" />
                    </div>
                    <h2 className="text-[16px] font-semibold text-ink">You're all caught up</h2>
                    <p className="mt-1 text-[13px] text-muted">
                        No unread notifications right now.
                    </p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {visible.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li
                                key={item.id}
                                onClick={() => markRead(item.id)}
                                className={`flex cursor-pointer items-start gap-4 rounded-xl border bg-white px-4 py-4 transition hover:shadow-sm ${
                                    item.unread ? "border-primary/40" : "border-line"
                                }`}
                            >
                                <div
                                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                                        TONES[item.tone]
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-[14px] font-semibold text-ink">
                                            {item.title}
                                        </h3>

                                        {item.unread && (
                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                        )}
                                    </div>

                                    <p className="mt-0.5 text-[13px] leading-5 text-muted">
                                        {item.message}
                                    </p>
                                </div>

                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    <span className="whitespace-nowrap text-[11px] text-muted">
                                        {item.time}
                                    </span>

                                    {item.unread ? (
                                        <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                                            New
                                        </span>
                                    ) : (
                                        <Check className="h-3.5 w-3.5 text-muted" />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* Footer hint */}
            {visible.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-[12px] text-muted">
                    <Bell className="h-3.5 w-3.5" />
                    Click a notification to mark it as read.
                </p>
            )}
        </div>
    );
}
