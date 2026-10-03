const tones = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-slate-100 text-slate-600",
};

export default function Badge({ children, tone = "success", className = "" }) {
  const toneClass = tones[tone] ?? tones.success;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded-md
        px-2.5
        py-1
        text-[11px]
        font-semibold
        leading-none
        ${toneClass}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
