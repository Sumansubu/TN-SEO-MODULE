export default function ScoreGauge({ score = 78, size = 118, thickness = 13 }) {
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));
  const angle = (safeScore / 100) * 360;

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#22c55e ${angle}deg, #e5e7eb ${angle}deg 360deg)`,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white"
        style={{
          width: size - thickness * 2,
          height: size - thickness * 2,
        }}
      >
        <span className="text-[26px] font-bold">
          {safeScore}
          <span className="text-[13px] font-medium text-slate-400">/100</span>
        </span>
      </div>
    </div>
  );
}
