import { useState } from "react";

import ContentToolCards from "../components/ContentToolCards.jsx";
import ContentForm from "../components/ContentForm.jsx";
import ContentEditor from "../components/ContentEditor.jsx";
import SEOInsights from "../components/SEOInsights.jsx";
import RecommendationBanner from "../components/RecommendationBanner.jsx";
import ScoreSuggestionsModal from "../components/ScoreSuggestionsModal.jsx";
import SEOInsightsModal from "../components/SEOInsightsModal.jsx";

export default function ContentAIWriter() {
  const [generating, setGenerating] = useState(false);
  const [score, setScore] = useState(82);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [dateRange, setDateRange] = useState("30");

  const generate = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
    }, 1200);
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Content / AI Writer
            </h1>

            <p className="text-xs text-slate-500">
              Create SEO-friendly content that ranks higher and drives traffic.
            </p>
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400"
            aria-label="Date range"
          >
            <option value="14">Last 2 Weeks</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>

        <ContentToolCards />

        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <ContentForm onGenerate={generate} generating={generating} />

          <ContentEditor generating={generating} />

          <SEOInsights
            score={score}
            onOpenScore={() => setScoreOpen(true)}
            onOpenDetails={() => setDetailsOpen(true)}
          />
        </div>

        <RecommendationBanner onClick={() => setScoreOpen(true)} />
      </div>

      <ScoreSuggestionsModal
        open={scoreOpen}
        onClose={() => setScoreOpen(false)}
        score={score}
        onApply={(n) => setScore((s) => Math.min(100, s + n))}
      />

      <SEOInsightsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}
