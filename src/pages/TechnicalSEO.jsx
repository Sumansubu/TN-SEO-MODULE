import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Download,
  RefreshCw,
  X,
} from "lucide-react";

import OverviewSection from "../components/technical/OverviewSection.jsx";
import SiteCrawlSection from "../components/technical/SiteCrawlSection.jsx";
import IssuesSection from "../components/technical/IssuesSection.jsx";
import CoreWebVitalsSection from "../components/technical/CoreWebVitalsSection.jsx";
import SitemapSection from "../components/technical/SitemapSection.jsx";
import FullReportSection from "../components/technical/FullReportSection.jsx";

import { TABS, TAB_META } from "../data/technicalSeo.js";

export default function TechnicalSEO() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [view, setView] = useState("dashboard");

  const [websiteUrl, setWebsiteUrl] = useState("https://example.com");

  const [auditRunning, setAuditRunning] = useState(false);
  const [auditMessage, setAuditMessage] = useState("");

  // =========================================================
  // DATE STATE
  // =========================================================

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [startDate, setStartDate] = useState("2026-09-15");
  const [endDate, setEndDate] = useState("2026-09-15");

  const [draftStartDate, setDraftStartDate] = useState("2026-09-15");
  const [draftEndDate, setDraftEndDate] = useState("2026-09-15");

  // =========================================================
  // DATE HELPERS
  // =========================================================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayedDateRange =
    startDate === endDate
      ? formatDate(startDate)
      : `${formatDate(startDate)} - ${formatDate(endDate)}`;

  // =========================================================
  // DATE PICKER
  // =========================================================

  const openDatePicker = () => {
    setDraftStartDate(startDate);
    setDraftEndDate(endDate);
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setDraftStartDate(startDate);
    setDraftEndDate(endDate);
    setIsDatePickerOpen(false);
  };

  const applyDateRange = () => {
    if (!draftStartDate || !draftEndDate) {
      setAuditMessage("Please select both start and end dates.");
      return;
    }

    if (draftStartDate > draftEndDate) {
      setAuditMessage("End date cannot be earlier than start date.");
      return;
    }

    setStartDate(draftStartDate);
    setEndDate(draftEndDate);
    setIsDatePickerOpen(false);

    setAuditMessage(
      `Date range updated: ${formatDate(
        draftStartDate,
      )} - ${formatDate(draftEndDate)}`,
    );
  };

  const clearDateRange = () => {
    setDraftStartDate("");
    setDraftEndDate("");
  };

  // =========================================================
  // RUN AUDIT
  // =========================================================

  const handleAudit = (url) => {
    const cleanUrl = url?.trim();

    if (!cleanUrl) {
      setAuditMessage("Please enter a website URL.");
      return;
    }

    let formattedUrl = cleanUrl;

    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setWebsiteUrl(formattedUrl);
    setAuditRunning(true);
    setAuditMessage("");

    /*
          FRONTEND DEMO ONLY.

          Later replace this with your backend API:

          const response = await fetch("/api/technical-seo/audit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: formattedUrl,
              startDate,
              endDate,
            }),
          });

          const data = await response.json();

          Then store the returned data in state and pass it
          to the Technical SEO sections.
        */

    setTimeout(() => {
      setAuditRunning(false);
      setAuditMessage(`Technical audit completed for ${formattedUrl}`);
    }, 1200);
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goHome = () => {
    setActiveTab("Overview");
    setView("dashboard");
    setAuditMessage("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setView("dashboard");
    setAuditMessage("");
  };

  return (
    <>
      {view === "report" ? (
        <>
          {/* =================================================
                        FULL REPORT
                    ================================================= */}

          <div className="mb-5">
            <button
              type="button"
              onClick={() => setView("dashboard")}
              className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition hover:text-emerald-700"
            >
              <ArrowLeft size={15} />
              Back to Overview
            </button>

            <h1 className="mb-1 text-[22px] font-bold tracking-tight text-slate-900 sm:text-[26px]">
              Technical SEO - Full Report
            </h1>

            <p className="max-w-[560px] text-[13.5px] leading-6 text-slate-500">
              A complete report of your website&apos;s technical SEO
              performance.
            </p>
          </div>

          <FullReportSection />
        </>
      ) : (
        <>
          {/* =================================================
                        PAGE HEADER
                    ================================================= */}

          <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <h1 className="mb-1 text-[22px] font-bold tracking-tight text-slate-900 sm:text-[26px]">
                {TAB_META[activeTab]?.title || activeTab}
              </h1>

              <p className="max-w-[620px] text-[13.5px] leading-6 text-slate-500">
                {TAB_META[activeTab]?.subtitle || ""}
              </p>
            </div>

            {/* =================================================
                            DATE
                        ================================================= */}

            {activeTab === "Overview" && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={openDatePicker}
                  className="flex items-center gap-2.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Calendar size={16} className="text-slate-400" />

                  <span>{displayedDateRange || "Select date range"}</span>

                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${
                      isDatePickerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDatePickerOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[310px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-[14px] font-semibold text-slate-900">
                          Select Date Range
                        </h3>

                        <p className="mt-0.5 text-[11.5px] text-slate-400">
                          Choose the audit period
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={closeDatePicker}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="technical-seo-start-date"
                        className="mb-1.5 block text-[12px] font-medium text-slate-600"
                      >
                        Start Date
                      </label>

                      <input
                        id="technical-seo-start-date"
                        type="date"
                        value={draftStartDate}
                        onChange={(event) =>
                          setDraftStartDate(event.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="technical-seo-end-date"
                        className="mb-1.5 block text-[12px] font-medium text-slate-600"
                      >
                        End Date
                      </label>

                      <input
                        id="technical-seo-end-date"
                        type="date"
                        value={draftEndDate}
                        min={draftStartDate || undefined}
                        onChange={(event) =>
                          setDraftEndDate(event.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={clearDateRange}
                        className="rounded-lg px-3 py-2 text-[12px] font-medium text-slate-500 transition hover:bg-slate-100"
                      >
                        Clear
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={closeDatePicker}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={applyDateRange}
                          disabled={!draftStartDate || !draftEndDate}
                          className="rounded-lg bg-emerald-700 px-3.5 py-2 text-[12px] font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                            EXPORT
                        ================================================= */}

            {(activeTab === "Site Crawl" || activeTab === "Issues") && (
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Download size={15} />
                Export
              </button>
            )}
          </div>

          {/* =================================================
                        AUDIT MESSAGE
                    ================================================= */}

          {auditMessage && (
            <div className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-[12.5px] font-medium text-emerald-700">
              {auditMessage}
            </div>
          )}

          {/* =================================================
                        MAIN TECHNICAL SEO NAVIGATION

                        Shown on Overview only.
                    ================================================= */}

          {activeTab === "Overview" && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 overflow-x-auto">
                <div className="flex min-w-max items-center gap-1">
                  {TABS.map((tab) => {
                    const isActive = tab === activeTab;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`
                                                    shrink-0
                                                    rounded-lg
                                                    px-4
                                                    py-2
                                                    text-[13.5px]
                                                    transition-all
                                                    duration-200
                                                    ${
                                                      isActive
                                                        ? "bg-emerald-700 font-semibold text-white shadow-sm"
                                                        : "font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                                    }
                                                `}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAudit(websiteUrl)}
                disabled={auditRunning}
                className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-emerald-700 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex"
              >
                <RefreshCw
                  size={15}
                  className={auditRunning ? "animate-spin" : ""}
                />

                {auditRunning ? "Auditing..." : "Re-run Audit"}
              </button>
            </div>
          )}

          {/* =================================================
                        MOBILE RE-RUN
                    ================================================= */}

          {activeTab === "Overview" && (
            <div className="mb-5 sm:hidden">
              <button
                type="button"
                onClick={() => handleAudit(websiteUrl)}
                disabled={auditRunning}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-white px-4 py-2.5 text-[13px] font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={15}
                  className={auditRunning ? "animate-spin" : ""}
                />

                {auditRunning ? "Auditing..." : "Re-run Audit"}
              </button>
            </div>
          )}

          {/* =================================================
                        CONTENT
                    ================================================= */}

          {activeTab === "Overview" && (
            <OverviewSection
              onViewReport={() => setView("report")}
              onViewDetails={() => {
                setActiveTab("Core Web Vitals");
              }}
              onViewAll={() => {
                setActiveTab("Issues");
              }}
              onViewIssue={(issue) => {
                setActiveTab("Issues");
                console.log("Selected issue:", issue);
              }}
              onUpgrade={() => {
                console.log("Upgrade plan clicked");
              }}
            />
          )}

          {activeTab === "Site Crawl" && (
            <SiteCrawlSection
              onBack={goHome}
              websiteUrl={websiteUrl}
              startDate={startDate}
              endDate={endDate}
            />
          )}

          {activeTab === "Issues" && (
            <IssuesSection
              onBack={goHome}
              websiteUrl={websiteUrl}
              startDate={startDate}
              endDate={endDate}
            />
          )}

          {activeTab === "Core Web Vitals" && (
            <CoreWebVitalsSection
              onBack={goHome}
              websiteUrl={websiteUrl}
              startDate={startDate}
              endDate={endDate}
            />
          )}

          {activeTab === "Sitemap" && (
            <SitemapSection
              onBack={goHome}
              websiteUrl={websiteUrl}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </>
      )}
    </>
  );
}
