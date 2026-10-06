import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { NAV_ITEMS } from "../data/site.js";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  /* Close the mobile drawer whenever the route changes. */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen overflow-hidden bg-page text-ink">
      {/* Mobile drawer backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        items={NAV_ITEMS}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex h-screen flex-col overflow-hidden lg:ml-[172px]">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <section className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-0 sm:px-5">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
