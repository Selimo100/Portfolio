import type { ReactNode } from "react";

type Props = {
  title: string;
  /** Rendered in the strip under the title bar, next to the status text. */
  toolbar?: ReactNode;
  status?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
};

/**
 * Presentation-only chrome: a platinum-era window with a striped title bar,
 * beveled edges and a status strip. It knows nothing about the game inside.
 */
export default function RetroMacWindow({ title, toolbar, status, onClose, children }: Props) {
  return (
    <div className="macWin">
      <div className="macTitlebar">
        <button
          type="button"
          className="macClose"
          onClick={onClose}
          aria-label="Close the mini app"
        />
        <span className="macStripes" aria-hidden="true" />
        <span className="macWinTitle">{title}</span>
        <span className="macStripes" aria-hidden="true" />
        <span className="macZoom" aria-hidden="true" />
      </div>

      {toolbar ? <div className="macToolbar">{toolbar}</div> : null}

      <div className="macBody">{children}</div>

      {status ? <div className="macStatusbar">{status}</div> : null}
    </div>
  );
}
