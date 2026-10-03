import { Link } from "react-router-dom";
import { ArrowRight, FileText, HelpCircle, PenLine, Type } from "lucide-react";
import { contentTools } from "../data/mock.js";

const iconMap = {
  "blog-writer": PenLine,
  "article-generator": FileText,
  "meta-title-generator": Type,
  "faq-generator": HelpCircle,
};

export default function ContentToolCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {contentTools.map((tool, i) => {
        const Icon = iconMap[tool.key];

        return (
          <Link
            key={tool.key}
            to={tool.to}
            className={`group flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:border-green-500 hover:shadow ${
              i === 0
                ? "border-green-500 ring-1 ring-green-500"
                : "border-slate-200"
            }`}
          >
            <div
              className={`grid size-11 shrink-0 place-items-center rounded-lg ${tool.color}`}
            >
              {Icon && <Icon className="size-5" />}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-slate-900">{tool.title}</h3>

              <p className="text-xs text-slate-500">{tool.desc}</p>
            </div>

            <ArrowRight className="size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-green-600" />
          </Link>
        );
      })}
    </div>
  );
}
