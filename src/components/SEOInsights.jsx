import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

import Panel from "./ui/Panel.jsx";

import {
  insights as defaultInsights,
  seoScoreLabels,
  seoInsightsContent,
} from "../data/mock.js";

export default function SEOInsights({
  score = 82,
  insights = defaultInsights,
  content = seoInsightsContent,
  labels = seoScoreLabels,
  onOpenScore,
  onOpenDetails,
}) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  const getScoreLabel = () => {
    if (safeScore >= 80) {
      return labels.excellent;
    }

    if (safeScore >= 60) {
      return labels.good;
    }

    return labels.average;
  };

  return (
    <Panel
      title={content.title}
      action={
        <button
          type="button"
          onClick={onOpenDetails}
          className="flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700"
        >
          {content.detailsLabel}
          <ArrowRight size={14} />
        </button>
      }
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={onOpenScore}
          className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[12px] font-semibold text-slate-500">
              {content.title}
            </span>

            <span className="text-[22px] font-extrabold text-slate-900">
              {safeScore}
              <span className="text-sm font-medium text-slate-400">/100</span>
            </span>
          </div>

          <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{
                width: `${safeScore}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-[11.5px] font-semibold ${
                safeScore >= 80
                  ? "text-emerald-700"
                  : safeScore >= 60
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {getScoreLabel()}
            </span>

            <span className="text-[11px] text-slate-400">
              {content.viewSuggestionsLabel}
            </span>
          </div>
        </button>

        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-slate-800">
              {content.insightsTitle}
            </h3>

            <button
              type="button"
              onClick={onOpenDetails}
              className="text-[11.5px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {content.detailsLabel}
            </button>
          </div>

          <div className="space-y-2.5">
            {insights.map((insight) => {
              const isGood =
                insight.tone === "success" || insight.status === labels.good;

              return (
                <div
                  key={insight.key}
                  className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white p-3"
                >
                  <span className="mt-0.5 shrink-0">
                    {isGood ? (
                      <CheckCircle2 size={15} className="text-emerald-600" />
                    ) : (
                      <AlertCircle size={15} className="text-amber-500" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-semibold text-slate-700">
                        {insight.label}
                      </span>

                      <span
                        className={`shrink-0 text-[11px] font-bold ${
                          isGood ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {insight.score}/100
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {insight.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[12px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          {content.fullReportLabel}
          <ArrowRight size={14} />
        </button>
      </div>
    </Panel>
  );
}
