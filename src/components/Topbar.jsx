import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Bell,
    Check,
    LoaderCircle,
} from "lucide-react";
import { TOPBAR } from "../data/site.js";

export default function Topbar() {
    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | done
    const navigate = useNavigate();

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

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-5">

            <div className="flex h-9 w-[440px] overflow-hidden rounded-lg border border-line">
                <input
                    type="text"
                    placeholder={TOPBAR.domainPlaceholder}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && analyze()}
                    className="flex-1 border-none px-3.5 text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
                />
                <button
                    onClick={analyze}
                    disabled={status === "loading"}
                    className="flex items-center gap-1.5 border-none bg-primary px-4 text-[13px] font-medium text-white hover:bg-primary-dark"
                >
                    {status === "loading" && <>{TOPBAR.analyzeLoading} <LoaderCircle className="h-3.5 w-3.5 animate-spin" /></>}
                    {status === "done" && <>{TOPBAR.analyzeDone} <Check className="h-3.5 w-3.5" /></>}
                    {status === "idle" && <>{TOPBAR.analyzeIdle} <ArrowRight className="h-3.5 w-3.5" /></>}
                </button>
            </div>

            <div className="flex items-center gap-3.5">
                <button className="relative border-none bg-transparent text-gray-700">
                    <Bell className="h-[18px] w-[18px]" />
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </button>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-600/60 bg-[#073e35] text-[13px] text-white">
                    {TOPBAR.avatarLetter}
                </div>

                <div className="hidden flex-col leading-4 sm:flex">
                    <span className="text-[11px] text-muted">{TOPBAR.greeting}</span>
                    <strong className="text-[13px]">{TOPBAR.user}</strong>
                </div>
            </div>

        </header>
    );
}
