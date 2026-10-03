import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

import Modal from "./ui/Modal.jsx";
import Tabs from "./ui/Tabs.jsx";
import Badge from "./ui/Badge.jsx";
import ScoreRing from "./ui/ScoreRing.jsx";

import {
  insights,
  keywords,
  seoInsightDetails,
  seoOverviewStats,
  seoOverviewContent,
} from "../data/mock.js";

function Overview() {
  const max = Math.max(...keywords.map((k) => k.count));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 p-4">
        <h3 className="mb-3 text-sm font-bold">
          {seoOverviewContent.keywordAnalysisTitle}
        </h3>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          {seoOverviewStats.map((item) => (
            <div key={item.label} className="rounded-lg bg-slate-50 p-2">
              <div className="text-lg font-extrabold">{item.value}</div>

              <div className="text-[10px] text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>

        <h4 className="mb-2 text-xs font-semibold text-slate-600">
          {seoOverviewContent.distributionTitle}
        </h4>

        <div className="space-y-2">
          {keywords.map((k) => (
            <div
              key={k.kw}
              className="grid grid-cols-[1fr_2fr] items-center gap-2 text-[11px]"
            >
              <span className="truncate">{k.kw}</span>

              <div className="h-2 rounded bg-slate-100">
                <div
                  className="h-2 rounded bg-green-600"
                  style={{
                    width: `${(k.count / max) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200">
        <h3 className="border-b border-slate-200 p-4 text-sm font-bold">
          {seoOverviewContent.usedKeywordsTitle}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[380px] text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2">
                  {seoOverviewContent.tableHeaders.keyword}
                </th>

                <th>{seoOverviewContent.tableHeaders.count}</th>

                <th>{seoOverviewContent.tableHeaders.density}</th>

                <th>{seoOverviewContent.tableHeaders.status}</th>
              </tr>
            </thead>

            <tbody>
              {keywords.map((k) => (
                <tr key={k.kw} className="border-t border-slate-100">
                  <td className="px-4 py-2">{k.kw}</td>

                  <td>{k.count}</td>

                  <td>{k.density}</td>

                  <td>
                    <Badge tone={k.status === "Good" ? "success" : "warning"}>
                      {k.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InsightDetail({ ins }) {
  const detail = seoInsightDetails[ins.key];

  if (!detail) return null;

  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4">
        <ScoreRing value={ins.score} size={110} stroke={10} />

        <Badge tone={ins.tone}>{ins.status}</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-1 text-xs font-semibold text-slate-500">Current</h4>

          <p className="rounded-lg border border-slate-200 p-3 text-sm">
            {detail.current}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-xs font-semibold text-green-700">
              What's working
            </h4>

            <ul className="space-y-1.5">
              {detail.good.map((item) => (
                <li key={item} className="flex gap-2 text-xs">
                  <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold text-amber-700">
              Recommendations
            </h4>

            <ul className="space-y-1.5">
              {detail.fix.map((item) => (
                <li key={item} className="flex gap-2 text-xs">
                  <AlertCircle className="size-4 shrink-0 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SEOInsightsModal({ open, onClose }) {
  const [tab, setTab] = useState("overview");

  const tabs = [
    {
      value: "overview",
      label: "Overview",
    },
    ...insights.map((i) => ({
      value: i.key,
      label: i.label,
    })),
  ];

  const ins = insights.find((i) => i.key === tab);

  return (
    <Modal
      wide
      open={open}
      onClose={onClose}
      title="Key SEO Insights"
      description="Detailed analysis of your content's on-page SEO."
    >
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="pt-4">
        {ins ? <InsightDetail ins={ins} /> : <Overview />}
      </div>
    </Modal>
  );
}
