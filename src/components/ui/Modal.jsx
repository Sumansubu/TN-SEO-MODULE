import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  wide = false,
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[1px]"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`
          relative
          flex
          max-h-[92vh]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.15)]
          ${wide ? "max-w-5xl" : "max-w-3xl"}
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-4
            border-b
            px-5
            py-4
            sm:px-6
          "
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="min-w-0">
            {title && (
              <h2
                id="modal-title"
                className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg"
              >
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              shrink-0
              rounded-lg
              p-2
              text-slate-500
              transition-colors
              hover:bg-slate-100
              hover:text-slate-700
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
