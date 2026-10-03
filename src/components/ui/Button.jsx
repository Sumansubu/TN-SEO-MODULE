const variants = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800",

  outline:
    "border border-[var(--border-color)] bg-white text-slate-700 hover:bg-slate-50",

  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-800",

  dark: "bg-[var(--sidebar-bg)] text-white hover:bg-[var(--sidebar-bg-dark)]",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = variants[variant] ?? variants.primary;
  const sizeClass = sizes[size] ?? sizes.md;

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-1.5
        rounded-lg
        font-semibold
        transition-colors
        duration-150
        outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500
        focus-visible:ring-offset-2
        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-60
        [&_svg]:size-4
        ${sizeClass}
        ${variantClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
