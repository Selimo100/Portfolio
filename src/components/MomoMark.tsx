/**
 * Momo's mark: a speech bubble that doubles as a robot head, so the launcher
 * reads as "chatbot" rather than as an anonymous dot.
 *
 * Every colour is a theme token — `--accent` on `--onAccent` is contrasting by
 * definition, so the visor and eyes stay legible in both palettes without a
 * second set of values.
 */
export default function MomoMark({
  size = 26,
  awake = true,
}: {
  size?: number;
  /** Set false to still the antenna, e.g. in a static header. */
  awake?: boolean;
}) {
  return (
    <svg
      className="momoMark"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {/* antenna */}
      <path d="M20 8.8V5.4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle
        className={awake ? "momoMarkSpark" : undefined}
        cx="20"
        cy="3.4"
        r="2.2"
        fill="var(--accent)"
      />

      {/* ears */}
      <rect x="2.6" y="17" width="3.2" height="8" rx="1.6" fill="var(--accent)" />
      <rect x="34.2" y="17" width="3.2" height="8" rx="1.6" fill="var(--accent)" />

      {/* head — a chat bubble; the tail is what makes the metaphor land */}
      <rect x="6" y="8.4" width="28" height="23" rx="9" fill="var(--accent)" />
      <path d="M13.2 27.5 11.4 36.4 20.6 30.6Z" fill="var(--accent)" />

      {/* visor */}
      <rect x="11" y="13.9" width="18" height="11" rx="5.5" fill="var(--onAccent)" />

      {/* eyes */}
      <circle className="momoMarkEye" cx="16.4" cy="19.4" r="2.1" fill="var(--accent)" />
      <circle className="momoMarkEye" cx="23.6" cy="19.4" r="2.1" fill="var(--accent)" />
    </svg>
  );
}
