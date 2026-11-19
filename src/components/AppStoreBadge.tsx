import { AppleLogo } from "./AppleLogo";

/** The black "Download on the App Store" badge, as a link. */
export default function AppStoreBadge({
  href,
  top,
  label,
  className = "",
}: {
  href: string;
  top: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      className={`appStoreBadge ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${top} ${label}`}
    >
      <AppleLogo className="appStoreBadgeLogo" />
      <span className="appStoreBadgeText" aria-hidden="true">
        <span className="appStoreBadgeTop">{top}</span>
        <span className="appStoreBadgeLabel">{label}</span>
      </span>
    </a>
  );
}
