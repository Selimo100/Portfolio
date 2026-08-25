/**
 * Bitmap-flavoured icons, drawn on a coarse grid so they keep the chunky feel
 * of a 32x32 classic Mac resource at any size.
 */

type IconProps = { className?: string };

export function HappyMacIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="1" y="1" width="14" height="13" fill="#dcdcdc" stroke="#1a1a1a" strokeWidth="1" />
      <rect x="3" y="3" width="10" height="7" fill="#f7fbff" stroke="#1a1a1a" strokeWidth="1" />
      <rect x="5" y="5" width="1" height="2" fill="#1a1a1a" />
      <rect x="10" y="5" width="1" height="2" fill="#1a1a1a" />
      <path d="M5 8h1v1h4V8h1v1h-1v1H6V9H5z" fill="#1a1a1a" />
      <rect x="4" y="11" width="4" height="2" fill="#9a9a9a" />
      <rect x="10" y="11" width="2" height="2" fill="#9a9a9a" />
    </svg>
  );
}

export function FloppyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="1" y="1" width="14" height="14" fill="#3b4a5a" stroke="#12181f" strokeWidth="1" />
      <rect x="4" y="2" width="8" height="5" fill="#dfe4e9" stroke="#12181f" strokeWidth="1" />
      <rect x="9" y="3" width="2" height="3" fill="#8b98a6" />
      <rect x="3" y="9" width="10" height="5" fill="#e8ecef" stroke="#12181f" strokeWidth="1" />
      <rect x="4" y="10" width="6" height="1" fill="#9aa6b2" />
      <rect x="4" y="12" width="4" height="1" fill="#9aa6b2" />
    </svg>
  );
}

export function BugIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="5" y="3" width="6" height="3" fill="#7a2f2f" stroke="#2a1010" strokeWidth="1" />
      <rect x="4" y="6" width="8" height="7" rx="1" fill="#b34141" stroke="#2a1010" strokeWidth="1" />
      <rect x="6" y="4" width="1" height="1" fill="#fff" />
      <rect x="9" y="4" width="1" height="1" fill="#fff" />
      <rect x="7" y="7" width="2" height="5" fill="#7a2f2f" />
      <rect x="1" y="6" width="3" height="1" fill="#2a1010" />
      <rect x="12" y="6" width="3" height="1" fill="#2a1010" />
      <rect x="1" y="10" width="3" height="1" fill="#2a1010" />
      <rect x="12" y="10" width="3" height="1" fill="#2a1010" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="4" y="2" width="8" height="1" fill="#3a3a3a" />
      <rect x="3" y="3" width="10" height="2" fill="#cfcfcf" stroke="#3a3a3a" strokeWidth="1" />
      <path d="M4 5h8l-1 9H5z" fill="#dedede" stroke="#3a3a3a" strokeWidth="1" />
      <rect x="6" y="7" width="1" height="5" fill="#9a9a9a" />
      <rect x="9" y="7" width="1" height="5" fill="#9a9a9a" />
    </svg>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <path d="M1 4h5l1 2h8v8H1z" fill="#e6dfc9" stroke="#4a4436" strokeWidth="1" />
      <rect x="1" y="6" width="13" height="1" fill="#c9c1a6" />
    </svg>
  );
}

export function BombIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="10" y="1" width="1" height="2" fill="#b34141" />
      <rect x="11" y="3" width="1" height="1" fill="#e0a13a" />
      <rect x="9" y="3" width="2" height="1" fill="#3a3a3a" />
      <circle cx="7" cy="10" r="5" fill="#2b2b2b" />
      <rect x="5" y="7" width="2" height="1" fill="#9a9a9a" />
      <rect x="4" y="8" width="1" height="2" fill="#9a9a9a" />
    </svg>
  );
}

/** Filled or empty pixel heart, used for the life counter. */
export function HeartIcon({ className, empty }: IconProps & { empty?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <path
        d="M3 3h3v1h1v1h2V4h1V3h3v1h1v4h-1v2h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9H3V8H2V4h1z"
        fill={empty ? "#c9c9c9" : "#c0392b"}
        stroke="#2a1010"
        strokeWidth="1"
      />
    </svg>
  );
}
