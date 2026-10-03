export default function Panel({ title, action, children, className = "" }) {
  return (
    <section
      className={`
        rounded-xl
        border
        border-[var(--border-color)]
        bg-white
        p-4
        shadow-[0_1px_3px_rgba(15,23,42,0.025)]
        sm:p-5
        ${className}
      `}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          {title && (
            <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-[15px]">
              {title}
            </h2>
          )}

          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
