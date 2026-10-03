import { NavLink, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    FileBarChart,
    FileText,
    FileCheck2,
    Home,
    Link2,
    Search,
    Settings,
    Settings2,
    Sparkles,
    Users,
    ClipboardCheck,
} from "lucide-react";
import { BRAND, SIDEBAR_UPGRADE, SIDEBAR_USER } from "../data/site.js";

const ICONS = {
    home: Home,
    "clipboard-check": ClipboardCheck,
    search: Search,
    "settings-2": Settings2,
    "file-check-2": FileCheck2,
    "link-2": Link2,
    users: Users,
    "file-text": FileText,
    sparkles: Sparkles,
    "file-bar-chart": FileBarChart,
    settings: Settings,
};

export default function Sidebar({ items }) {
    const navigate = useNavigate();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-[172px] min-w-[172px] flex-col bg-sidebar text-white">

            {/* BRAND */}
            <div className="flex h-[67px] items-center border-b border-white/10 px-4">
                <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-mint text-primary-dark">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
                </div>

                <div>
                    <h2 className="text-[13px] leading-4 tracking-wide">
                        {BRAND.name}
                        <span className="text-[8px]">{BRAND.suffix}</span>
                    </h2>

                    <p className="mt-0.5 text-[8px] tracking-[2px] text-emerald-100/70">
                        {BRAND.module}
                    </p>
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 overflow-y-auto p-2.5">
                {items.map(({ to, label, icon, end }) => {

                    // FIX:
                    // If Backlink Analysis does not have a "to" value
                    // in site.js, automatically use /backlinks.
                    const resolvedTo =
                        to || (label === "Backlink Analysis" ? "/backlinks" : null);

                    return resolvedTo ? (
                        <NavLink
                            key={label}
                            to={resolvedTo}
                            end={end}
                            className={({ isActive }) =>
                                "mb-1 flex h-10 items-center gap-2.5 rounded-md px-3 text-[11px] transition " +
                                (isActive
                                    ? "bg-[#078a5b] text-white"
                                    : "text-emerald-50/90 hover:bg-white/10")
                            }
                        >
                            {renderIcon(icon)}
                            <span>{label}</span>
                        </NavLink>
                    ) : (
                        <a
                            key={label}
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="mb-1 flex h-10 items-center gap-2.5 rounded-md px-3 text-[11px] text-emerald-50/90 transition hover:bg-white/10"
                        >
                            {renderIcon(icon)}
                            <span>{label}</span>
                        </a>
                    );
                })}
            </nav>

            {/* UPGRADE */}
            <div className="mx-2.5 mb-2 rounded-xl bg-gradient-to-b from-[#0a5344] to-[#074236] p-3 text-center ring-1 ring-white/10">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#ffd76a] text-lg shadow">
                    👑
                </div>

                <h3 className="mt-2 text-xs font-semibold">
                    {SIDEBAR_UPGRADE.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-emerald-100/80">
                    {SIDEBAR_UPGRADE.text}
                </p>

                <button
                    onClick={() => navigate("/upgrade")}
                    className="mt-2.5 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#13b76d] text-[11px] font-semibold text-white transition hover:bg-primary-dark"
                >
                    {SIDEBAR_UPGRADE.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* USER */}
            <div className="flex h-16 items-center border-t border-white/10 px-2.5">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/70 bg-[#073e35] text-[11px]">
                    {SIDEBAR_USER.avatarLetter}
                </div>

                <div className="flex flex-1 flex-col">
                    <strong className="text-[10px]">
                        {SIDEBAR_USER.name}
                    </strong>

                    <span className="mt-0.5 text-[9px] text-emerald-100/70">
                        {SIDEBAR_USER.plan}
                    </span>
                </div>

                <ArrowRight className="h-3.5 w-3.5" />
            </div>

        </aside>
    );
}

function renderIcon(name) {
    const Icon = ICONS[name];

    return Icon ? (
        <Icon className="h-4 w-4" strokeWidth={1.8} />
    ) : null;
}