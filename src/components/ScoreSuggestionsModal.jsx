import { useState } from "react";
import { CheckCircle2, Wand2 } from "lucide-react";
import Modal from "./ui/Modal.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";
import ScoreRing from "./ui/ScoreRing.jsx";

import {
  suggestions,
  seoSuggestionFilters,
  seoPrioritySummary,
  seoScoreLabels,
} from "../data/mock.js";

const toneOf = {
  High: "danger",
  Medium: "warning",
  Low: "info",
};

export default function ScoreSuggestionsModal({
  open,
  onClose,
  score,
  onApply,
}) {
  const [filter, setFilter] = useState("All");
  const [applied, setApplied] = useState([]);

  const list = suggestions.filter(
    (s) => filter === "All" || s.priority === filter,
  );

  const apply = (s) => {
    if (applied.includes(s.id)) return;

    setApplied((a) => [...a, s.id]);
    onApply?.(parseInt(s.impact, 10));
  };

  const applyAll = () => {
    suggestions.forEach(apply);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Content Score Suggestions"
      description="Fix these issues to improve your content score."
    >
      <div className="mb-5 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <ScoreRing
          value={score}
          size={110}
          stroke={10}
          label={score >= 90 ? seoScoreLabels.excellent : seoScoreLabels.good}
        />

        <div className="grid grid-cols-3 gap-3 text-center">
          {seoPrioritySummary.map((item) => (
            <div key={item.label} className="rounded-lg bg-white p-3">
              <div className={`text-xl font-extrabold ${item.colorClass}`}>
                {item.count}
              </div>

              <div className="text-[11px] text-slate-500">
                {item.label} priority
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {seoSuggestionFilters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                filter === item
                  ? "bg-nav text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Button onClick={applyAll} className="text-xs">
          <Wand2 />
          Apply All Fixes
        </Button>
      </div>

      <ul className="space-y-2">
        {list.map((s) => (
          <li
            key={s.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <b className="text-sm">{s.title}</b>

                <Badge tone={toneOf[s.priority]}>{s.priority}</Badge>

                <Badge tone="success">{s.impact} pts</Badge>
              </div>

              <p className="mt-1 text-xs text-slate-500">{s.desc}</p>
            </div>

            {applied.includes(s.id) ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <CheckCircle2 className="size-4" />
                Applied
              </span>
            ) : (
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => apply(s)}
              >
                Apply Fix
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
