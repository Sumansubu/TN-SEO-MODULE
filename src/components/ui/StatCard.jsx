const tones = {
  green: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-600",
  },

  red: {
    bg: "bg-red-50",
    icon: "bg-red-500",
  },

  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-500",
  },

  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-500",
  },

  purple: {
    bg: "bg-violet-50",
    icon: "bg-violet-500",
  },
};

const changeTones = {
  positive: "text-emerald-600",
  negative: "text-red-500",
  warning: "text-amber-600",
  neutral: "text-slate-500",
};

export default function StatCard({
  icon: Icon,
  tone = "green",
  label,
  value,
  change,
  changeLabel,
  changeTone = "neutral",
}) {
  const currentTone = tones[tone] ?? tones.green;
  const currentChangeTone = changeTones[changeTone] ?? changeTones.neutral;

  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-3
        rounded-xl
        border
        border-[var(--border-color)]
        bg-white
        p-4
        shadow-[0_1px_3px_rgba(15,23,42,0.025)]
      "
    >
      {/* Icon */}
      {Icon && (
        <span
          className={`
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${currentTone.bg}
          `}
        >
          <span
            className={`
              flex
              size-6
              items-center
              justify-center
              rounded-full
              ${currentTone.icon}
            `}
          >
            <Icon size={14} strokeWidth={2.2} className="text-white" />
          </span>
        </span>
      )}

      {/* Content */}
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500">{label}</p>

        <p className="mt-0.5 text-xl font-bold leading-none tracking-tight text-slate-900">
          {value}
        </p>

        {(change || changeLabel) && (
          <div className="mt-1 flex min-w-0 items-center gap-1 text-[11px]">
            {change && (
              <span className={`font-semibold ${currentChangeTone}`}>
                {change}
              </span>
            )}

            {changeLabel && (
              <span className="truncate text-slate-400">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
