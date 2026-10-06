import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Bell,
    Check,
    Home,
    LoaderCircle,
    LogOut,
    Menu,
} from "lucide-react";
import { TOPBAR } from "../data/site.js";
import { useAuth } from "../context/useAuth.js";

export default function Topbar({ onMenuClick }) {
    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | done
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    /* Home shortcut is shown everywhere except the dashboard and projects pages. */
    const showHomeIcon =
        location.pathname !== "/dashboard" &&
        location.pathname !== "/projects";

    const displayName = user?.fullName || TOPBAR.user;
    const avatarLetter = (user?.fullName || TOPBAR.avatarLetter || "U")
        .trim()
        .charAt(0)
        .toUpperCase();

    useEffect(() => {
        if (!menuOpen) return;

        const close = (event) => {
            if (!event.target.closest("[data-profile-menu]")) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [menuOpen]);

    const analyze = () => {
        if (status === "loading") return;

        const trimmed = domain.trim();
        if (!trimmed) {
            alert(TOPBAR.emptyDomainAlert);
            return;
        }

        setStatus("loading");
        setTimeout(() => {
            setStatus("done");
            alert(TOPBAR.analysisDoneAlert(trimmed));
            navigate("/on-page-seo");
            setTimeout(() => {
                setStatus("idle");
                setDomain("");
            }, 2000);
        }, 1500);
    };

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);
        await logout();
        setLoggingOut(false);
        setMenuOpen(false);
        navigate("/login", { replace: true, state: { loggedOut: true } });
    };

    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:px-5">

            <div className="flex min-w-0 flex-1 items-center gap-3">
                {onMenuClick && (
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Open menu"
                        className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-gray-700 transition hover:text-gray-900 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}

                <div className="flex h-9 w-full max-w-[440px] overflow-hidden rounded-lg border border-line">
                    <input
                        type="text"
                        placeholder={TOPBAR.domainPlaceholder}
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && analyze()}
                        className="min-w-0 flex-1 border-none px-3.5 text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
                    />
                    <button
                        onClick={analyze}
                        disabled={status === "loading"}
                        className="flex shrink-0 items-center gap-1.5 border-none bg-primary px-3 text-[13px] font-medium text-white hover:bg-primary-dark sm:px-4"
                    >
                        {status === "loading" && <>{TOPBAR.analyzeLoading} <LoaderCircle className="h-3.5 w-3.5 animate-spin" /></>}
                        {status === "done" && <>{TOPBAR.analyzeDone} <Check className="h-3.5 w-3.5" /></>}
                        {status === "idle" && (
                            <>
                                <span className="hidden sm:inline">{TOPBAR.analyzeIdle}</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
                {showHomeIcon && (
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        aria-label="Home"
                        title="Go to dashboard"
                        className="cursor-pointer border-none bg-transparent p-1 text-gray-700 transition hover:text-gray-900"
                    >
                        <Home className="h-[18px] w-[18px]" />
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => navigate("/notifications")}
                    aria-label="Notifications"
                    title="Notifications"
                    className="relative cursor-pointer border-none bg-transparent p-1 text-gray-700 transition hover:text-gray-900"
                >
                    <Bell className="h-[18px] w-[18px]" />
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </button>

                {/* PROFILE MENU */}
                <div className="relative" data-profile-menu>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        aria-label="Account menu"
                        className="flex cursor-pointer items-center gap-3.5 border-none bg-transparent p-0"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-600/60 bg-[#073e35] text-[13px] text-white">
                            {avatarLetter}
                        </div>

                        <div className="hidden flex-col leading-4 sm:flex">
                            <span className="text-[11px] text-muted">{TOPBAR.greeting}</span>
                            <strong className="text-[13px]">{displayName}</strong>
                        </div>
                    </button>

                    {menuOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-white py-1.5 shadow-md"
                        >
                            <div className="border-b border-line px-4 pb-3 pt-2">
                                <p className="truncate text-[13px] font-semibold text-ink">
                                    {user?.fullName || displayName}
                                </p>
                                <p className="truncate text-[11px] text-muted">
                                    {user?.email || "Signed in"}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                            >
                                <LogOut className="h-4 w-4" />
                                {loggingOut ? "Signing out..." : "Log out"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}
