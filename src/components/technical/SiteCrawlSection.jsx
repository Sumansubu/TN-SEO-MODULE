import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  Link2,
  Lock,
  RefreshCw,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import Card from "../ui/Card.jsx";
import StatCard from "../ui/StatCard.jsx";
import SubTabs from "../ui/SubTabs.jsx";

import {
  SITE_CRAWL_SUB_TABS,
  SITE_CRAWL_STATS,
  CRAWLED_PAGES,
  CRAWL_DEPTH_DATA,
  REDIRECTS,
  BLOCKED_PAGES,
  SITE_CRAWL_CONFIG,
  CRAWL_SUMMARY,
} from "../../data/technicalSeo.js";

const ICONS = {
  FileText,
  Search,
  Link2,
  ShieldAlert,
};

function StatusBadge({ status }) {
  const numericStatus = Number(status);

  const isSuccess = numericStatus === 200;
  const isRedirect = numericStatus >= 300 && numericStatus < 400;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-md
        px-2
        py-1
        text-[11px]
        font-semibold
        ${
          isSuccess
            ? "bg-emerald-50 text-emerald-700"
            : isRedirect
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-700"
        }
      `}
    >
      {isSuccess ? (
        <CheckCircle2 size={12} />
      ) : isRedirect ? (
        <RefreshCw size={12} />
      ) : (
        <XCircle size={12} />
      )}

      {status}
    </span>
  );
}

function SectionHeader({ title, description, children }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[17px] font-bold text-slate-900 sm:text-[18px]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function SectionNavigation({ tabs, activeTab, onChange, onBack }) {
  return (
    <div className="mb-5 flex items-center gap-2 border-b border-slate-200">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to Technical SEO overview"
        className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="min-w-0 flex-1 overflow-x-auto">
        <SubTabs items={tabs} active={activeTab} onChange={onChange} />
      </div>
    </div>
  );
}

export default function SiteCrawlSection({
  onBack,
  crawlData,
  crawledPagesData = CRAWLED_PAGES,
  depthData = CRAWL_DEPTH_DATA,
  redirectsData = REDIRECTS,
  blockedPagesData = BLOCKED_PAGES,
}) {
  const [activeSubTab, setActiveSubTab] = useState(
    SITE_CRAWL_SUB_TABS[0] || "Overview",
  );

  const [searchQuery, setSearchQuery] = useState("");

  const currentCrawl = crawlData ?? SITE_CRAWL_CONFIG;

  const stats = useMemo(() => {
    if (crawlData?.stats) {
      return crawlData.stats;
    }

    return SITE_CRAWL_STATS;
  }, [crawlData]);

  const summary = useMemo(() => {
    if (crawlData?.summary) {
      return crawlData.summary;
    }

    return CRAWL_SUMMARY;
  }, [crawlData]);

  const filteredPages = crawledPagesData.filter((page) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      page.url?.toLowerCase().includes(query) ||
      page.title?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setSearchQuery("");
  }, [activeSubTab]);

  return (
    <div className="w-full">
      <SectionNavigation
        tabs={SITE_CRAWL_SUB_TABS}
        activeTab={activeSubTab}
        onChange={setActiveSubTab}
        onBack={onBack}
      />

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      {activeSubTab === "Overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ iconKey, tone, label, value }) => {
              const Icon = ICONS[iconKey] || FileText;

              return (
                <StatCard
                  key={label}
                  icon={Icon}
                  tone={tone}
                  label={label}
                  value={value}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
            <Card className="p-5 sm:p-6">
              <SectionHeader
                title="Crawl Progress"
                description="Current website crawling progress."
              />

              <div className="mb-3 flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{
                      width: `${Math.min(
                        Math.max(Number(currentCrawl.progress) || 0, 0),
                        100,
                      )}%`,
                    }}
                  />
                </div>

                <span className="shrink-0 text-[13px] font-semibold text-slate-500">
                  {currentCrawl.progress}%
                </span>
              </div>

              <p className="mb-5 text-[13px] text-slate-500">
                Crawling... {currentCrawl.crawledPages} /{" "}
                {currentCrawl.totalPages} pages
              </p>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-[13px] font-semibold text-red-600 transition hover:bg-red-100"
              >
                <XCircle size={15} />
                Stop Crawl
              </button>
            </Card>

            <Card className="p-5 sm:p-6">
              <SectionHeader
                title="Crawl Settings"
                description="Configuration used for this crawl."
              />

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[12.5px] font-medium text-slate-500">
                    User Agent
                  </label>

                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-[13px] text-slate-700"
                  >
                    <span>{currentCrawl.userAgent}</span>

                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-[12.5px] font-medium text-slate-500">
                    Crawl Limit
                  </label>

                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-[13px] text-slate-700"
                  >
                    <span>{currentCrawl.crawlLimit}</span>

                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <SectionHeader
                title="Recent Crawled Pages"
                description="Latest pages discovered during the crawl."
              />

              <div className="space-y-3">
                {crawledPagesData.slice(0, 4).map((page) => (
                  <div
                    key={page.url}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-slate-800">
                        {page.title}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-slate-400">
                        {page.url}
                      </p>
                    </div>

                    <StatusBadge status={page.status} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <SectionHeader
                title="Crawl Summary"
                description="Overview of the current crawl."
              />

              <div className="grid grid-cols-2 gap-3">
                {summary.map((item) => (
                  <SummaryItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* =====================================================
          CRAWLED PAGES
      ===================================================== */}

      {activeSubTab === "Crawled Pages" && (
        <Card className="overflow-hidden">
          <div className="p-5 sm:p-6">
            <SectionHeader
              title="Crawled Pages"
              description="All pages discovered during the latest website crawl."
            >
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                {crawledPagesData.length} Pages
              </span>
            </SectionHeader>

            <div className="relative mb-5">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search crawled pages..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Page
                  </th>

                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Depth
                  </th>

                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Internal Links
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPages.map((page) => (
                  <tr
                    key={page.url}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-slate-800">
                          {page.title}
                        </p>

                        <p className="mt-1 max-w-[350px] truncate text-[11px] text-slate-400">
                          {page.url}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={page.status} />
                    </td>

                    <td className="px-5 py-4 text-[13px] text-slate-600">
                      Level {page.depth}
                    </td>

                    <td className="px-5 py-4 text-[13px] text-slate-600">
                      {page.links}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        View
                        <ExternalLink size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 px-5 pb-5 md:hidden">
            {filteredPages.map((page) => (
              <div
                key={page.url}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800">
                      {page.title}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-400">
                      {page.url}
                    </p>
                  </div>

                  <StatusBadge status={page.status} />
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <span>Depth: Level {page.depth}</span>
                  <span>{page.links} links</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* =====================================================
          CRAWL DEPTH
      ===================================================== */}

      {activeSubTab === "Crawl Depth" && (
        <Card className="p-5 sm:p-6">
          <SectionHeader
            title="Crawl Depth"
            description="Understand how deeply pages are nested within your website."
          />

          <div className="space-y-4">
            {depthData.map((item) => (
              <div
                key={item.depth}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-[13px] font-semibold text-slate-800">
                      {item.depth}
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-[13px] font-bold text-slate-800">
                    {item.pages} pages
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{
                      width: `${Math.min(Number(item.percentage) || 0, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-right text-[11px] text-slate-400">
                  {item.percentage}%
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* =====================================================
          REDIRECTS
      ===================================================== */}

      {activeSubTab === "Redirects" && (
        <Card className="overflow-hidden">
          <div className="p-5 sm:p-6">
            <SectionHeader
              title="Redirects"
              description="URLs that redirect visitors to another location."
            >
              <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                {redirectsData.length} Redirects
              </span>
            </SectionHeader>
          </div>

          <div className="space-y-3 px-5 pb-5 sm:px-6">
            {redirectsData.map((item) => (
              <div
                key={item.from}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-slate-700">
                      {item.from}
                    </p>

                    <div className="my-2 flex items-center gap-2 text-slate-400">
                      <ArrowRight size={14} />
                      <span className="truncate text-[11px]">{item.to}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                      {item.type}
                    </span>

                    <span className="text-[11px] text-slate-400">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* =====================================================
          BLOCKED PAGES
      ===================================================== */}

      {activeSubTab === "Blocked Pages" && (
        <Card className="overflow-hidden">
          <div className="p-5 sm:p-6">
            <SectionHeader
              title="Blocked Pages"
              description="Pages that could not be crawled because of access restrictions."
            >
              <span className="rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                {blockedPagesData.length} Blocked
              </span>
            </SectionHeader>
          </div>

          <div className="space-y-3 px-5 pb-5 sm:px-6">
            {blockedPagesData.map((page) => (
              <div
                key={page.url}
                className="flex flex-col gap-3 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-500">
                    <Lock size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-800">
                      {page.url}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {page.reason}
                    </p>
                  </div>
                </div>

                <span className="self-start rounded-md bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-600 sm:self-auto">
                  {page.type}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-[11px] text-slate-500">{label}</p>

      <p className="mt-1 text-[20px] font-bold text-slate-900">{value}</p>
    </div>
  );
}
