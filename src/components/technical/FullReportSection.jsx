import { ArrowRight, Lightbulb } from "lucide-react";

import Panel from "../ui/Panel.jsx";
import ScoreGauge from "./ScoreGauge.jsx";

import {
  SECTION_BREAKDOWN,
  FULL_REPORT_SUMMARY,
} from "../../data/technicalSeo.js";

export default function FullReportSection({
  reportData = FULL_REPORT_SUMMARY,
  sectionData = SECTION_BREAKDOWN,
  onViewDetails,
}) {
  return (
    <>
      {/* =====================================================
          REPORT SUMMARY
      ===================================================== */}
      <Panel className="mb-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <ScoreGauge score={reportData.score} />

          <div className="flex flex-col gap-1.5">
            <span className="text-[14px] font-bold text-emerald-700">
              {reportData.status}
            </span>

            <p className="max-w-sm text-[12.5px] leading-relaxed text-slate-500">
              {reportData.description}
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-3 sm:ml-auto sm:max-w-xs">
            {reportData.statistics.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-[11.5px] text-slate-400">
                  {item.label}
                </span>

                <span className="text-[13.5px] font-semibold">
                  {item.value}
                </span>
              </div>
            ))}

            <div className="col-span-2 flex flex-col">
              <span className="text-[11.5px] text-slate-400">Generated On</span>

              <span className="text-[13.5px] font-semibold">
                {reportData.generatedOn}
              </span>
            </div>
          </div>
        </div>
      </Panel>

      {/* =====================================================
          SECTION BREAKDOWN
      ===================================================== */}
      <Panel title="Section Breakdown" className="mb-4">
        <ul className="flex flex-col gap-4">
          {sectionData.map((section) => (
            <li key={section.label} className="flex items-center gap-4">
              <span className="w-32 shrink-0 text-[13px] text-slate-600">
                {section.label}
              </span>

              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{
                    width: `${section.score}%`,
                  }}
                />
              </div>

              <span className="w-16 shrink-0 text-right text-[12.5px] font-semibold text-slate-500">
                {section.score}/100
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* =====================================================
          RECOMMENDATION
      ===================================================== */}
      <section className="flex flex-col items-start gap-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-50/30 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-emerald-600">
            <Lightbulb size={20} />
          </span>

          <p className="max-w-lg text-[13px] text-slate-600">
            {reportData.recommendation}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails?.()}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-800"
        >
          View All Details
          <ArrowRight size={16} />
        </button>
      </section>
    </>
  );
}
