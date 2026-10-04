import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  FileBarChart2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Link2,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";

/* =====================================================
   SIDEBAR MENU (shared by every page)
===================================================== */

const sidebarNavItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },

  {
    label: "Projects",
    icon: FolderKanban,
    to: "/projects",
  },

  {
    label: "Website Audit",
    icon: ShieldCheck,
  },

  {
    label: "Keyword Research",
    icon: Search,
  },

  {
    label: "Technical SEO",
    icon: SlidersHorizontal,
    to: "/technical-seo",
  },

  {
    label: "Content / AI Writer",
    icon: FileText,
    to: "/content",
  },

  {
    label: "On-Page SEO",
    icon: FileBarChart2,
    to: "/on-page-seo",
  },

  {
    label: "Backlink Analysis",
    icon: Link2,
    to: "/backlinks",
  },

  {
    label: "Competitor Analysis",
    icon: UsersRound,
    to: "/competitor-analysis",
  },

  {
    label: "AI Recommendations",
    icon: Sparkles,
  },

  {
    label: "Reports",
    icon: FileBarChart2,
    to: "/reports",
  },

  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

/* =====================================================
   SIDEBAR COMPONENT
===================================================== */

export default function AppSidebar({
  mobileOpen,
  setMobileOpen,
  onSelect,
}) {
  const navigate = useNavigate();

  const location = useLocation();


  const handleItemClick = (item) => {

    if (item.to) {

      navigate(item.to);

    } else if (onSelect) {

      onSelect(item.label);

    }


    if (
      window.innerWidth <
      1024
    ) {

      setMobileOpen(false);

    }

  };


  return (
    <>

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          w-[228px]
          bg-[#003b35]
          text-white
          transition-transform
          duration-300

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="flex h-full flex-col">

          {/* Logo */}

          <div
            className="
              flex
              h-[82px]
              items-center
              gap-3
              border-b
              border-white/10
              px-6
            "
          >

            <div className="brand-mark">

              <ArrowRight
                size={28}
              />

            </div>


            <div>

              <div
                className="
                  text-[19px]
                  font-extrabold
                "
              >
                TN SEO
                <sup>®</sup>
              </div>


              <div
                className="
                  mt-1
                  text-[12px]
                "
              >
                MODULE
              </div>

            </div>

          </div>


          {/* Navigation */}

          <nav
            className="
              flex-1
              overflow-y-auto
              px-3
              py-5
            "
          >

            {sidebarNavItems.map(
              (item) => {

                const Icon =
                  item.icon;


                const active =
                  item.to &&
                  location.pathname ===
                  item.to;


                return (

                  <button
                    key={item.label}

                    type="button"

                    onClick={() =>
                      handleItemClick(
                        item
                      )
                    }

                    className={`
                      mb-0.5
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-1.5
                      text-left
                      text-sm

                      ${
                        active
                          ? "bg-[#08a667]"
                          : "hover:bg-white/10"
                      }
                    `}
                  >

                    <Icon size={19} />

                    <span>
                      {item.label}
                    </span>

                  </button>

                );

              }
            )}

          </nav>

        </div>

      </aside>


      {/* Mobile overlay */}

      {mobileOpen && (

        <button

          type="button"

          aria-label="Close menu"

          className="
            fixed
            inset-0
            z-30
            bg-black/40
            lg:hidden
          "

          onClick={() =>
            setMobileOpen(false)
          }

        />

      )}

    </>
  );
}
