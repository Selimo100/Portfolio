"use client";

import { useEffect, useState } from "react";
import { MINIGAME_COPY, MINIGAME_FACTS, MINIGAME_SECRET } from "@/lib/minigame";
import GameBoard from "./GameBoard";
import LockScreen from "./LockScreen";
import { HappyMacIcon, HeartIcon } from "./MacIcons";
import RetroMacWindow from "./RetroMacWindow";
import { UnlockDialog, UnlockList } from "./UnlockPanel";
import { useMiniGame } from "./useMiniGame";

const BOOT_MS = 900;

export default function AboutMiniGame() {
  const game = useMiniGame();
  const [open, setOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [view, setView] = useState<"board" | "files">("board");

  // Finishing the recovery hands the player over to the file list.
  useEffect(() => {
    if (game.status === "complete") setView("files");
  }, [game.status]);

  const launch = () => {
    setOpen(true);
    setBooting(true);
    window.setTimeout(() => {
      setBooting(false);
      game.start();
    }, BOOT_MS);
  };

  const statusText = game.locked
    ? MINIGAME_COPY.statusLocked
    : game.status === "complete"
      ? MINIGAME_COPY.statusComplete
      : game.status === "playing"
        ? MINIGAME_COPY.statusInProgress
        : MINIGAME_COPY.statusIdle;

  const hearts = (
    <span className={`macHearts${game.nudged ? " isHit" : ""}`} aria-label={`${game.lives} of ${game.maxLives} lives left`}>
      {Array.from({ length: game.maxLives }, (_, i) => (
        <HeartIcon key={i} className="macHeart" empty={i >= game.lives} />
      ))}
    </span>
  );

  if (!open) {
    return (
      <section className="miniGameTeaser" aria-labelledby="minigame-headline">
        <span className="miniGameBadge" aria-hidden="true">
          <HappyMacIcon className="macSpriteArt" />
        </span>
        <div>
          <h2 className="miniGameHeadline" id="minigame-headline">
            {MINIGAME_COPY.headline}
          </h2>
          <p className="miniGameSub">{MINIGAME_COPY.subtext}</p>
          <div className="miniGameActions">
            <button type="button" className="macBtn macBtnDefault" onClick={launch}>
              {MINIGAME_COPY.button}
            </button>
            <button
              type="button"
              className="miniGameSkip"
              onClick={() => {
                game.revealAll();
                setOpen(true);
                setView("files");
              }}
            >
              Reveal without playing
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="miniGameStage" aria-labelledby="minigame-headline">
      <h2 className="srOnly" id="minigame-headline">
        {MINIGAME_COPY.headline}
      </h2>

      <RetroMacWindow
        title={MINIGAME_COPY.windowTitle}
        onClose={() => setOpen(false)}
        toolbar={
          <>
            <div className="macTabs" role="group" aria-label="Mini app views">
              <button
                type="button"
                className={`macBtn${view === "board" ? " isActive" : ""}`}
                onClick={() => setView("board")}
              >
                Disk
              </button>
              <button
                type="button"
                className={`macBtn${view === "files" ? " isActive" : ""}`}
                onClick={() => setView("files")}
              >
                Files
              </button>
            </div>
            {hearts}
            <span className="macCounter">
              Files recovered: {game.filesFound.length} / {MINIGAME_FACTS.length}
              {game.secretFound ? " + 1" : ""}
            </span>
            <button type="button" className="macBtn" onClick={game.replay} disabled={game.locked}>
              Restart
            </button>
          </>
        }
        status={
          <>
            <span>{statusText}</span>
            <span className="macHint">
              {game.locked
                ? "Three hearts spent — the drive is cooling down"
                : "Arrow keys to move · a bug costs one heart"}
            </span>
          </>
        }
      >
        {booting ? (
          <div className="macBoot" role="status">
            <HappyMacIcon className="macBootIcon" />
            <p>Welcome to Macintosh</p>
            <span className="macBootBar" aria-hidden="true">
              <i />
            </span>
          </div>
        ) : game.locked && view === "board" ? (
          <LockScreen remaining={game.lockRemaining} onResume={game.resume} />
        ) : view === "board" ? (
          <GameBoard game={game} />
        ) : (
          <div className="macFiles">
            {game.status === "complete" ? (
              <p className="macFilesLead">
                {MINIGAME_COPY.statusComplete}
                {game.secretFound ? "" : " One more file is still sitting in the Trash."}
              </p>
            ) : (
              <p className="macFilesLead">
                {game.filesFound.length} of {MINIGAME_FACTS.length} files recovered. Head back to the
                disk to find the rest.
              </p>
            )}
            <UnlockList found={game.found} />
            <div className="macFilesActions">
              <button type="button" className="macBtn macBtnDefault" onClick={() => setView("board")}>
                {game.status === "complete" && !game.secretFound ? "Back to disk" : "Keep exploring"}
              </button>
              <button type="button" className="macBtn" onClick={game.replay} disabled={game.locked}>
                Play again
              </button>
              {game.found.length < MINIGAME_FACTS.length + 1 ? (
                <button type="button" className="miniGameSkip" onClick={game.revealAll}>
                  Reveal the rest
                </button>
              ) : null}
            </div>
          </div>
        )}
      </RetroMacWindow>

      {game.popup ? <UnlockDialog fact={game.popup} onClose={game.dismissPopup} /> : null}

      {/* Always-available plain-text copy of everything unlocked, for assistive tech. */}
      <p className="srOnly" role="status">
        {game.found
          .map((id) => [...MINIGAME_FACTS, MINIGAME_SECRET].find((f) => f.id === id))
          .filter(Boolean)
          .map((f) => `${f!.title}: ${f!.text}`)
          .join(" ")}
      </p>
    </section>
  );
}
