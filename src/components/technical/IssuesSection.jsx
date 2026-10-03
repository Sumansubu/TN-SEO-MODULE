import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  TriangleAlert,
  Download,
  Info,
  CheckCircle2,
  X,
  AlertTriangle,
  FileText,
  Wrench,
  Check,
} from "lucide-react";

import Panel from "../ui/Panel.jsx";
import StatCard from "../ui/StatCard.jsx";
import SubTabs from "../ui/SubTabs.jsx";

import {
  BADGE_CLASSES,
  ISSUES_FULL,
  ISSUE_FILTERS,
} from "../../data/technicalSeo.js";

export default function IssuesSection({
  onBack,
  issuesData = ISSUES_FULL,
  filters = ISSUE_FILTERS,
  fixedIssues = 0,
  onExport,
  onViewIssue,
}) {
  const [filter, setFilter] = useState("All");

  // Currently selected issue
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Issues that have been fixed during this session
  const [fixedIssueIds, setFixedIssueIds] = useState([]);

  // Message shown after fixing an issue
  const [actionMessage, setActionMessage] = useState("");

  /*
   * Combine original issue data with local fixed state.
   *
   * This is temporary frontend behavior.
   * Later, the fixed status can come from your backend/database.
   */
  const allIssues = useMemo(() => {
    return issuesData.map((issue) => ({
      ...issue,
      isFixed: fixedIssueIds.includes(issue.n),
    }));
  }, [issuesData, fixedIssueIds]);

  /*
   * Active issue rows.
   *
   * Fixed issues are hidden from Critical / Warning / Notice
   * filters because they are no longer active.
   *
   * "All" continues showing everything.
   */
  const rows = useMemo(() => {
    if (filter === "All") {
      return allIssues;
    }

    return allIssues.filter(
      (issue) => issue.severity === filter && !issue.isFixed,
    );
  }, [allIssues, filter]);

  /*
   * Issue statistics only count ACTIVE issues.
   *
   * Fixed issues are counted separately.
   */
  const issueStats = useMemo(() => {
    const activeIssues = allIssues.filter((issue) => !issue.isFixed);

    return {
      critical: activeIssues.filter((issue) => issue.severity === "Critical")
        .length,

      warnings: activeIssues.filter((issue) => issue.severity === "Warning")
        .length,

      notices: activeIssues.filter((issue) => issue.severity === "Notice")
        .length,

      fixed: fixedIssues + fixedIssueIds.length,
    };
  }, [allIssues, fixedIssues, fixedIssueIds]);

  const activeFilterLabel =
    filters.find((item) => item.key === filter)?.label ?? filters[0]?.label;

  // =========================================================
  // OPEN ISSUE
  // =========================================================

  const handleViewIssue = (issue) => {
    setSelectedIssue(issue);
    setActionMessage("");

    // Keep parent callback available for future navigation/API use.
    onViewIssue?.(issue);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const handleCloseModal = () => {
    setSelectedIssue(null);
    setActionMessage("");
  };

  // =========================================================
  // FIX ISSUE
  // =========================================================

  const handleFixIssue = (issue) => {
    if (!issue || fixedIssueIds.includes(issue.n)) {
      return;
    }

    /*
     * Simulate fixing the issue.
     *
     * Later replace this with:
     *
     * await fetch("/api/technical-seo/issues/fix", ...)
     */
    setFixedIssueIds((current) => [...current, issue.n]);

    setActionMessage(`"${issue.issue}" has been marked as fixed.`);

    /*
     * Update the selected issue inside the modal so the
     * user immediately sees the new status.
     */
    setSelectedIssue({
      ...issue,
      isFixed: true,
    });
  };

  // =========================================================
  // EXPORT CSV
  // =========================================================

  const handleExport = () => {
    if (!rows.length) {
      setActionMessage("There are no issues to export.");
      return;
    }

    /*
     * Create CSV content from the currently visible rows.
     */
    const headers = [
      "Issue Number",
      "Issue",
      "Severity",
      "Affected Pages",
      "Status",
    ];

    const csvRows = rows.map((issue) => [
      issue.n,
      issue.issue,
      issue.severity,
      issue.pages,
      issue.isFixed ? "Fixed" : "Open",
    ]);

    const escapeCsvValue = (value) => {
      const stringValue = String(value ?? "");

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const csvContent = [headers, ...csvRows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    /*
     * Download CSV in browser.
     */
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `technical-seo-issues-${filter.toLowerCase()}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setActionMessage("Issues exported successfully.");

    /*
     * Keep parent callback available.
     */
    onExport?.(rows);
  };

  // =========================================================
  // ISSUE DETAILS
  // =========================================================

  const getIssueDetails = (issue) => {
    if (!issue) {
      return null;
    }

    const details = {
      "Missing meta descriptions": {
        description:
          "Some pages do not have a meta description. Meta descriptions help search engines and users understand the content of a page.",

        recommendation:
          "Add a unique and relevant meta description to every affected page.",

        impact:
          "Pages without useful meta descriptions may have less descriptive search result snippets.",

        icon: FileText,
      },

      "4XX (404) pages found": {
        description:
          "Some URLs are returning a 4XX HTTP response. These pages may no longer exist or may be incorrectly linked.",

        recommendation:
          "Review the affected URLs and either restore the page, redirect it to a relevant page, or remove broken internal links.",

        impact:
          "Broken pages can create a poor user experience and waste crawl resources.",

        icon: AlertTriangle,
      },

      "Images without ALT text": {
        description:
          "Some images do not contain alternative text. ALT text provides a text description of an image.",

        recommendation:
          "Add meaningful ALT text to informative images and use empty ALT attributes for purely decorative images.",

        impact:
          "Missing ALT text can reduce accessibility and make image content harder to understand.",

        icon: Info,
      },

      "Multiple H1 tags": {
        description:
          "Some pages contain multiple H1 headings. The page structure should clearly communicate its primary topic.",

        recommendation:
          "Review the page headings and use a clear primary H1 while keeping secondary headings appropriately structured.",

        impact:
          "An unclear heading structure can make page content harder to understand.",

        icon: FileText,
      },

      "Slow page load speed": {
        description:
          "Some affected pages are taking longer than expected to load.",

        recommendation:
          "Optimize images, reduce unnecessary JavaScript, improve server response time, and remove render-blocking resources.",

        impact:
          "Slow pages can negatively affect user experience and page performance.",

        icon: AlertCircle,
      },

      "Duplicate title tags": {
        description: "Multiple pages are using the same title tag.",

        recommendation:
          "Create unique and descriptive title tags that accurately represent each page.",

        impact:
          "Duplicate titles make it harder to distinguish pages in search results.",

        icon: FileText,
      },

      "Redirect chains": {
        description:
          "Some URLs pass through multiple redirects before reaching the final destination.",

        recommendation:
          "Update redirects so the original URL points directly to the final destination whenever possible.",

        impact:
          "Long redirect chains can add unnecessary requests and slow navigation.",

        icon: ArrowRight,
      },

      "Large image file sizes": {
        description:
          "Some images are larger than necessary and may require more bandwidth to load.",

        recommendation:
          "Compress images and use appropriately sized modern image formats.",

        impact: "Large images can increase page load time and resource usage.",

        icon: FileText,
      },
    };

    return (
      details[issue.issue] || {
        description:
          "This issue was identified during the technical SEO audit.",

        recommendation:
          "Review the affected pages and apply the appropriate technical SEO improvement.",

        impact:
          "Resolving this issue can help maintain a healthier technical SEO setup.",

        icon: AlertCircle,
      }
    );
  };

  const selectedIssueDetails = getIssueDetails(selectedIssue);

  const IssueIcon = selectedIssueDetails?.icon || AlertCircle;

  return (
    <>
      <div className="w-full">
        {/* =====================================================
            SUB NAVIGATION
        ===================================================== */}

        <div className="mb-5 flex items-center gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Technical SEO overview"
            title="Back to Technical SEO overview"
            className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0 flex-1 overflow-x-auto">
            <SubTabs
              items={filters.map((item) => item.label)}
              active={activeFilterLabel}
              onChange={(label) => {
                const selectedFilter = filters.find(
                  (item) => item.label === label,
                );

                if (selectedFilter) {
                  setFilter(selectedFilter.key);
                }
              }}
            />
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={AlertCircle}
            tone="red"
            label="Critical Issues"
            value={issueStats.critical}
          />

          <StatCard
            icon={TriangleAlert}
            tone="amber"
            label="Warnings"
            value={issueStats.warnings}
          />

          <StatCard
            icon={Info}
            tone="blue"
            label="Notices"
            value={issueStats.notices}
          />

          <StatCard
            icon={CheckCircle2}
            tone="green"
            label="Fixed Issues"
            value={issueStats.fixed}
          />
        </section>

        {/* =====================================================
            SUCCESS / ACTION MESSAGE
        ===================================================== */}

        {actionMessage && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />

              <p className="text-[12.5px] font-medium text-emerald-700">
                {actionMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActionMessage("")}
              className="text-emerald-600 hover:text-emerald-800"
              aria-label="Close message"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* =====================================================
            ISSUES TABLE
        ===================================================== */}

        <Panel
          title="Issues"
          action={
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Download size={14} />
              Export
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr>
                  {[
                    "#",
                    "Issue",
                    "Severity",
                    "Affected Pages",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="border-b border-slate-100 pb-2 text-[11.5px] font-semibold text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-[13px]">
                {rows.map((row, index) => (
                  <tr key={row.n}>
                    {/* Number */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.n}
                    </td>

                    {/* Issue */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          row.isFixed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {row.issue}
                      </span>
                    </td>

                    {/* Severity */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <span
                        className={`rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${
                          BADGE_CLASSES[row.severity] || ""
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>

                    {/* Pages */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.pages}
                    </td>

                    {/* Status */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {row.isFixed ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                          <Check size={12} />
                          Fixed
                        </span>
                      ) : (
                        <span className="text-[11.5px] font-medium text-slate-400">
                          Open
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td
                      className={`py-3 ${
                        index < rows.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleViewIssue(row)}
                        className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        View
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-[13px] text-slate-400"
                    >
                      No issues found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* =========================================================
          ISSUE DETAILS / FIX MODAL
      ========================================================= */}

      {selectedIssue && selectedIssueDetails && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="issue-details-title"
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* =================================================
                  HEADER
              ================================================= */}

            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    selectedIssue.isFixed
                      ? "bg-emerald-50 text-emerald-600"
                      : selectedIssue.severity === "Critical"
                        ? "bg-red-50 text-red-600"
                        : selectedIssue.severity === "Warning"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {selectedIssue.isFixed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <IssueIcon size={20} />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {selectedIssue.isFixed ? (
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10.5px] font-semibold text-emerald-700">
                        Fixed
                      </span>
                    ) : (
                      <span
                        className={`rounded-md px-2 py-1 text-[10.5px] font-semibold ${
                          BADGE_CLASSES[selectedIssue.severity] || ""
                        }`}
                      >
                        {selectedIssue.severity}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400">
                      Issue #{selectedIssue.n}
                    </span>
                  </div>

                  <h2
                    id="issue-details-title"
                    className="text-[17px] font-semibold leading-6 text-slate-800"
                  >
                    {selectedIssue.issue}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close issue details"
                title="Close"
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* =================================================
                  BODY
              ================================================= */}

            <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">
              {/* Summary */}
              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="mb-1 text-[11px] font-medium text-slate-400">
                    Affected Pages
                  </p>

                  <p className="text-xl font-semibold text-slate-800">
                    {selectedIssue.pages}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="mb-1 text-[11px] font-medium text-slate-400">
                    Severity
                  </p>

                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${
                      selectedIssue.isFixed
                        ? "bg-emerald-50 text-emerald-700"
                        : BADGE_CLASSES[selectedIssue.severity] || ""
                    }`}
                  >
                    {selectedIssue.isFixed ? "Fixed" : selectedIssue.severity}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="mb-1 text-[11px] font-medium text-slate-400">
                    Status
                  </p>

                  <p className="text-[13px] font-semibold text-slate-700">
                    {selectedIssue.isFixed ? "Resolved" : "Needs Attention"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <Info size={15} className="text-slate-400" />

                  <h3 className="text-[13px] font-semibold text-slate-800">
                    What is the issue?
                  </h3>
                </div>

                <p className="text-[13px] leading-6 text-slate-500">
                  {selectedIssueDetails.description}
                </p>
              </div>

              {/* Impact */}
              <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h3 className="mb-2 text-[13px] font-semibold text-slate-800">
                  Potential Impact
                </h3>

                <p className="text-[12.5px] leading-6 text-slate-500">
                  {selectedIssueDetails.impact}
                </p>
              </div>

              {/* Recommendation */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Wrench size={16} className="text-emerald-600" />

                  <h3 className="text-[13px] font-semibold text-emerald-800">
                    How to Fix
                  </h3>
                </div>

                <p className="text-[12.5px] leading-6 text-emerald-800/80">
                  {selectedIssueDetails.recommendation}
                </p>
              </div>

              {/* Fix result */}
              {selectedIssue.isFixed && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-[13px] font-semibold text-emerald-800">
                      Issue fixed successfully
                    </p>

                    <p className="mt-1 text-[12px] leading-5 text-emerald-700">
                      This issue has been marked as fixed in the current audit
                      session.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                  FOOTER
              ================================================= */}

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg border border-slate-200 px-4 py-2 text-[12px] font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              {!selectedIssue.isFixed ? (
                <button
                  type="button"
                  onClick={() => handleFixIssue(selectedIssue)}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Wrench size={14} />
                  Fix Issue
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex cursor-default items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-[12px] font-semibold text-emerald-700"
                >
                  <Check size={14} />
                  Issue Fixed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
