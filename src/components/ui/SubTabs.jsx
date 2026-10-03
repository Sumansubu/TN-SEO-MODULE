import { ArrowLeft } from "lucide-react";

export default function SubTabs({
  items = [],
  active,
  onChange,
  onBack,
  className = "",
}) {
  return (
    <div
      className={`
        mb-4
        flex
        items-center
        gap-4
        border-b
        border-[var(--border-color)]
        ${className}
      `}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          title="Go back"
          className="
            mb-1
            shrink-0
            rounded-lg
            border
            border-[var(--border-color)]
            bg-white
            p-1.5
            text-slate-500
            transition-colors
            hover:border-emerald-200
            hover:bg-emerald-50
            hover:text-emerald-700
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          <ArrowLeft className="size-4" />
        </button>
      )}

      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-5
          overflow-x-auto
          scrollbar-none
        "
      >
        {items.map((item) => {
          const value = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;

          const isActive = value === active;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange?.(value)}
              className={`
                relative
                shrink-0
                whitespace-nowrap
                pb-2.5
                pt-1
                text-[13px]
                transition-colors
                duration-150
                ${
                  isActive
                    ? "font-semibold text-emerald-700"
                    : "font-medium text-slate-500 hover:text-slate-800"
                }
              `}
            >
              {label}

              {isActive && (
                <span
                  className="
                    absolute
                    inset-x-0
                    -bottom-px
                    h-0.5
                    rounded-full
                    bg-emerald-600
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
