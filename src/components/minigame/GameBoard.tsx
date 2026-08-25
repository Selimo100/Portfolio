"use client";

import { useEffect, useRef } from "react";
import { MINIGAME_FACTS, MINIGAME_SECRET } from "@/lib/minigame";
import { BugIcon, FloppyIcon, HappyMacIcon, TrashIcon } from "./MacIcons";
import type { useMiniGame } from "./useMiniGame";

type Game = ReturnType<typeof useMiniGame>;

/** Directions offered by the on-screen pad, for touch and mouse players. */
const PAD = [
  { label: "Up", dir: { x: 0, y: -1 }, cls: "macPadUp", glyph: "▲" },
  { label: "Left", dir: { x: -1, y: 0 }, cls: "macPadLeft", glyph: "◀" },
  { label: "Right", dir: { x: 1, y: 0 }, cls: "macPadRight", glyph: "▶" },
  { label: "Down", dir: { x: 0, y: 1 }, cls: "macPadDown", glyph: "▼" },
];

export default function GameBoard({ game }: { game: Game }) {
  const boardRef = useRef<HTMLDivElement>(null);

  // Take focus when play starts, and take it back after a dialog is dismissed,
  // so the arrow keys always belong to the game when the game is on screen.
  useEffect(() => {
    if (game.status !== "idle" && !game.popup) boardRef.current?.focus();
  }, [game.status, game.popup]);

  return (
    <div className="macGame">
      <div
        ref={boardRef}
        className={`macBoard${game.nudged ? " isHit" : ""}`}
        tabIndex={0}
        role="application"
        aria-label="Mini game board. Use the arrow keys to move and collect files."
        onFocus={() => game.setActive(true)}
        onBlur={() => {
          game.setActive(false);
          game.setNudge(null);
        }}
        onPointerDown={() => boardRef.current?.focus()}
      >
        <span className="macBoardGrid" aria-hidden="true" />

        {MINIGAME_FACTS.map((fact, i) => {
          const spot = game.fileSpots[i];
          const taken = game.found.includes(fact.id);
          return (
            <span
              key={fact.id}
              className={`macSprite macFile${taken ? " isTaken" : ""}`}
              style={{ left: `${spot.x}%`, top: `${(spot.y / 64) * 100}%` }}
              aria-hidden="true"
            >
              <FloppyIcon className="macSpriteArt" />
              <em className="macSpriteLabel">{fact.file}</em>
            </span>
          );
        })}

        {game.allFilesFound ? (
          <span
            className={`macSprite macSecret${game.secretFound ? " isTaken" : ""}`}
            style={{ left: `${game.secretSpot.x}%`, top: `${(game.secretSpot.y / 64) * 100}%` }}
            aria-hidden="true"
          >
            <TrashIcon className="macSpriteArt" />
            <em className="macSpriteLabel">{MINIGAME_SECRET.file}</em>
          </span>
        ) : null}

        {Array.from({ length: game.bugCount }, (_, i) => (
          <span
            key={`bug-${i}`}
            ref={game.setSpriteRef(`bug-${i}`)}
            className="macSprite macBug"
            aria-hidden="true"
          >
            <BugIcon className="macSpriteArt" />
          </span>
        ))}

        <span
          ref={game.setSpriteRef("player")}
          className="macSprite macPlayer"
          style={{ left: `${game.spawn.x}%`, top: `${(game.spawn.y / 64) * 100}%` }}
          aria-hidden="true"
        >
          <HappyMacIcon className="macSpriteArt" />
        </span>
        {/* Without focus the arrow keys belong to the page, so say so plainly. */}
        {game.active ? null : (
          <span className="macPaused">
            <b>Click the desktop to take control</b>
            <em>Then move with the arrow keys</em>
          </span>
        )}
      </div>

      <div className="macPad" aria-hidden="true">
        {PAD.map((p) => (
          <button
            key={p.label}
            type="button"
            tabIndex={-1}
            className={`macPadKey ${p.cls}`}
            onPointerDown={() => game.setNudge(p.dir)}
            onPointerUp={() => game.setNudge(null)}
            onPointerLeave={() => game.setNudge(null)}
            onPointerCancel={() => game.setNudge(null)}
          >
            {p.glyph}
          </button>
        ))}
      </div>
    </div>
  );
}
