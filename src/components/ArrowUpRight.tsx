/** Decorative vector arrow; avoids platform emoji substitution. */
export default function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "inline-block",
        verticalAlign: "-0.12em",
        flexShrink: 0,
      }}
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
