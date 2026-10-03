export default function ScoreRing({
  value = 0,
  size = 136,
  stroke = 12,
  label,
}) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const getScoreColor = (score) => {
    if (score >= 70) return "#059669";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const color = getScoreColor(safeValue);

  const progressOffset = circumference * (1 - safeValue / 100);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
      role="img"
      aria-label={`Score ${safeValue} out of 100`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E3EBE8"
          strokeWidth={stroke}
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{
            transition: "stroke-dashoffset 600ms ease",
          }}
        />
      </svg>

      {/* Center */}
      <div className="absolute inset-0 grid place-content-center text-center">
        <div
          className="font-extrabold tracking-tight text-slate-900"
          style={{
            fontSize: Math.max(size / 4.5, 20),
          }}
        >
          {safeValue}
          <span className="ml-0.5 text-xs font-medium text-slate-400">
            /100
          </span>
        </div>

        {label && (
          <div className="mt-0.5 text-xs font-semibold" style={{ color }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
