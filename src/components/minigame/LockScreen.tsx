"use client";

import { MINIGAME_COPY } from "@/lib/minigame";
import { BombIcon } from "./MacIcons";

function formatClock(ms: number) {
  const total = Math.ceil(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * The classic "system error" panel, shown when all three hearts are gone.
 * The countdown is driven by the hook, so a refresh cannot skip it.
 */
export default function LockScreen({
  remaining,
  onResume,
}: {
  remaining: number;
  onResume: () => void;
}) {
  const ready = remaining <= 0;

  return (
    <div className="macLock" role="alert">
      <div className="macLockBar">{MINIGAME_COPY.lockTitle}</div>
      <div className="macLockBody">
        <BombIcon className="macLockIcon" />
        <div>
          <p className="macLockText">{ready ? MINIGAME_COPY.lockReady : MINIGAME_COPY.lockText}</p>
          {ready ? null : (
            <p className="macLockClock" aria-live="off">
              {formatClock(remaining)}
            </p>
          )}
          <p className="srOnly" aria-live="polite">
            {ready
              ? MINIGAME_COPY.lockReady
              : `Locked for another ${Math.ceil(remaining / 60000)} minutes.`}
          </p>
        </div>
      </div>
      <div className="macLockActions">
        <button type="button" className="macBtn macBtnDefault" onClick={onResume} disabled={!ready}>
          {MINIGAME_COPY.lockButton}
        </button>
      </div>
    </div>
  );
}
