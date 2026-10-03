import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function GeneratorHeader({ title, description, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          to="/content"
          aria-label="Back"
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            {title}
          </h1>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
