import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { NAV_ITEMS } from "../data/site.js";

export default function Layout() {
    return (
        <div className="h-screen overflow-hidden bg-page text-ink">
            <Sidebar items={NAV_ITEMS} />
            <main className="ml-[172px] flex h-screen flex-col overflow-hidden">
                <Topbar />
                <section className="flex min-h-0 flex-1 flex-col px-5 py-4">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
