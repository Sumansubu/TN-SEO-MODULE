export default function Tabs({ tabs = [], active, onChange, className = "" }) {
  return (
    <div
      className={`
        flex
        gap-1
        overflow-x-auto
        border-b
        border-[var(--border-color)]
        ${className}
      `}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange?.(tab.value)}
            className={`
              relative
              shrink-0
              whitespace-nowrap
              border-b-2
              px-3
              py-2.5
              text-xs
              font-semibold
              transition-colors
              duration-150
              sm:px-4
              ${
                isActive
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
