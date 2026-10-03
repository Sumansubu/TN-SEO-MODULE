import { ArrowRight, Lightbulb } from "lucide-react";
import Button from "./ui/Button.jsx";
import { recommendation as defaultRecommendation } from "../data/mock.js";

export default function RecommendationBanner({
  recommendation = defaultRecommendation,
  onClick,
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center">
      <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-green-600 text-white">
        <Lightbulb className="size-5" />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-slate-900">
          {recommendation.title}
        </h3>

        <p className="text-xs text-slate-600">
          {recommendation.description}{" "}
          <b>+{recommendation.potentialGain} points</b>.
        </p>
      </div>

      <Button onClick={onClick}>
        {recommendation.actionLabel}
        <ArrowRight />
      </Button>
    </div>
  );
}
