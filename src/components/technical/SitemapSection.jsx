import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  Link2,
  Network,
  X,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import Panel from "../ui/Panel.jsx";
import StatCard from "../ui/StatCard.jsx";
import SubTabs from "../ui/SubTabs.jsx";

import {
  SITEMAP_SUB_TABS,
  SITEMAP_URLS,
  SITEMAP_CONFIG,
  SITEMAP_STATUS,
  SITEMAP_HEALTH,
  SITEMAP_LINES,
} from "../../data/technicalSeo.js";

const ICONS = {
  CheckCircle2,
  AlertTriangle,
  FileText,
};

function SitemapUrlModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  const isValid = item.status === "200";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-slate-900/50 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sitemap-url-modal-title"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <Link2 className="size-4 text-emerald-600" />
              </div>

              <h2
                id="sitemap-url-modal-title"
                className="text-base font-bold text-slate-900 sm:text-lg"
              >
                Sitemap URL Details
              </h2>
            </div>

            <p className="break-all text-xs text-slate-500">{item.url}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">
          <div className="space-y-4">
            <div
              className={`flex items-start gap-3 rounded-lg p-4 ${
                isValid ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              {isValid ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              ) : (
                <XCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
              )}

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isValid ? "text-emerald-800" : "text-red-800"
                  }`}
                >
                  {isValid ? "URL is accessible" : "URL requires attention"}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    isValid ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {isValid
                    ? "This URL returned a successful HTTP response."
                    : "This URL returned an unsuccessful HTTP response and should be reviewed."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 sm:col-span-2">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  URL
                </p>

                <p className="break-all text-sm font-medium text-slate-800">
                  {item.url}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  HTTP Status
                </p>

                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
                    isValid
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Indexability
                </p>

                <p
                  className={`text-sm font-semibold ${
                    isValid ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {item.type}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Last Modified
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {item.lastModified}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Crawl Status
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {isValid ? "Successfully Crawled" : "Crawl Failed"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-slate-200 px-5 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SitemapSection({
  onBack,
  sitemapUrls = SITEMAP_URLS,
  sitemapConfig = SITEMAP_CONFIG,
  sitemapStatus = SITEMAP_STATUS,
  sitemapHealth = SITEMAP_HEALTH,
  sitemapLines = SITEMAP_LINES,
}) {
  const [subTab, setSubTab] = useState(SITEMAP_SUB_TABS[0] || "Overview");

  const [selectedUrl, setSelectedUrl] = useState(null);

  return (
    <div className="w-full">
      {/* =====================================================
          SUB NAVIGATION
      ===================================================== */}

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
          <SubTabs
            items={SITEMAP_SUB_TABS}
            active={subTab}
            onChange={setSubTab}
          />
        </div>
      </div>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      {subTab === "Overview" && (
        <div className="space-y-4">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={Network}
              tone="purple"
              label="Total URLs"
              value={sitemapConfig.totalUrls}
            />

            <StatCard
              icon={CheckCircle2}
              tone="green"
              label="Indexable"
              value={sitemapConfig.indexable}
            />

            <StatCard
              icon={XCircle}
              tone="red"
              label="Non-indexable"
              value={sitemapConfig.nonIndexable}
            />
          </section>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Panel title="Sitemap Status">
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {sitemapStatus.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {sitemapStatus.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Sitemap Location</p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                      {sitemapConfig.location}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Last Checked</p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {sitemapConfig.lastChecked}
                    </p>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel title="Sitemap Health">
              <div className="space-y-3">
                {sitemapHealth.map((item) => {
                  const Icon = ICONS[item.iconKey] || FileText;

                  const iconClass =
                    item.tone === "success"
                      ? "text-emerald-600"
                      : item.tone === "warning"
                        ? "text-amber-500"
                        : "text-blue-500";

                  const valueClass =
                    item.tone === "success"
                      ? "text-emerald-600"
                      : item.tone === "warning"
                        ? "text-amber-600"
                        : "text-slate-800";

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`size-5 ${iconClass}`} />

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <span className={`text-sm font-bold ${valueClass}`}>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          <Panel
            title="Sitemap Preview"
            action={
              <button
                type="button"
                onClick={() => setSubTab("Sitemap URLs")}
                className="flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View Sitemap URLs
                <ExternalLink size={13} />
              </button>
            }
          >
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="overflow-x-auto bg-slate-50 p-4">
                <pre className="min-w-[520px] text-[12px] leading-6">
                  {sitemapLines.map((line, index) => (
                    <div key={`${line}-${index}`} className="flex">
                      <span className="mr-4 w-6 shrink-0 select-none text-right text-slate-300">
                        {index + 1}
                      </span>

                      <span className="text-slate-700">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Panel>
        </div>
      )}

      {/* =====================================================
          SITEMAP URLS
      ===================================================== */}

      {subTab === "Sitemap URLs" && (
        <div className="space-y-4">
          <Panel
            title="Sitemap URLs"
            action={
              <span className="text-xs font-medium text-slate-500">
                {sitemapUrls.length} shown
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      URL
                    </th>

                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>

                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Type
                    </th>

                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Last Modified
                    </th>

                    <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sitemapUrls.map((item) => {
                    const isValid = item.status === "200";

                    return (
                      <tr
                        key={item.url}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-3 py-3.5">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                              <Link2 className="size-4 text-slate-500" />
                            </div>

                            <span className="max-w-[360px] truncate text-[13px] font-medium text-slate-700">
                              {item.url}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-3.5">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold ${
                              isValid
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-3 py-3.5">
                          <span
                            className={`text-[12px] font-medium ${
                              isValid ? "text-emerald-700" : "text-red-600"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>

                        <td className="px-3 py-3.5 text-[12px] text-slate-500">
                          {item.lastModified}
                        </td>

                        <td className="px-3 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedUrl(item)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            View
                            <ExternalLink size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {sitemapUrls.map((item) => {
              const isValid = item.status === "200";

              return (
                <div
                  key={`mobile-${item.url}`}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <Link2 className="size-4 text-slate-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-all text-[13px] font-semibold text-slate-800">
                        {item.url}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                            isValid
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                            isValid
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] text-slate-400">
                        Last modified: {item.lastModified}
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedUrl(item)}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        View Details
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SitemapUrlModal
        item={selectedUrl}
        onClose={() => setSelectedUrl(null)}
      />
    </div>
  );
}
