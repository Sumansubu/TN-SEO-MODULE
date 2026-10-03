export default function DonutChart({
  data = [],
  size = 110,
  thickness = 16,
  centerValue,
  centerLabel,
}) {
  const validData = data.filter(
    (item) =>
      item && typeof item.value === "number" && item.value > 0 && item.color,
  );

  const total = validData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-slate-100"
        style={{
          width: size,
          height: size,
        }}
      >
        <div
          className="flex flex-col items-center justify-center rounded-full bg-white"
          style={{
            width: Math.max(size - thickness * 2, 0),
            height: Math.max(size - thickness * 2, 0),
          }}
        >
          <span className="text-[19px] font-bold text-slate-900">
            {centerValue ?? 0}
          </span>

          {centerLabel && (
            <span className="text-[11px] text-slate-400">{centerLabel}</span>
          )}
        </div>
      </div>
    );
  }

  let cumulative = 0;

  const stops = validData
    .map((item) => {
      const start = (cumulative / total) * 360;

      cumulative += item.value;

      const end = (cumulative / total) * 360;

      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  const innerSize = Math.max(size - thickness * 2, 0);

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${stops})`,
      }}
      role="img"
      aria-label={
        centerLabel
          ? `${centerValue ?? total} ${centerLabel}`
          : `${centerValue ?? total}`
      }
    >
      <div
        className="flex flex-col items-center justify-center rounded-full bg-white"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        <span className="text-[19px] font-bold tracking-tight text-slate-900">
          {centerValue ?? total}
        </span>

        {centerLabel && (
          <span className="text-[11px] text-slate-400">{centerLabel}</span>
        )}
      </div>
    </div>
  );
}
