export default function Card({
  children,
  className = "",
  as: Component = "section",
}) {
  return (
    <Component
      className={`
        rounded-xl
        border
        border-[var(--border-color)]
        bg-white
        shadow-[0_1px_3px_rgba(15,23,42,0.025)]
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
