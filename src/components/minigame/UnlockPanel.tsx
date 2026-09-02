"use client";

import { MINIGAME_FACTS, MINIGAME_SECRET, type MiniGameFact } from "@/lib/minigame";
import { FloppyIcon, FolderIcon, TrashIcon } from "./MacIcons";

/** The classic "alert" dialog shown the moment a file is recovered. */
export function UnlockDialog({ fact, onClose }: { fact: MiniGameFact; onClose: () => void }) {
  const secret = fact.id === MINIGAME_SECRET.id;

  return (
    <div className="macAlertLayer" role="dialog" aria-modal="false" aria-label={fact.title}>
      <div className="macAlert">
        <span className="macAlertIcon" aria-hidden="true">
          {secret ? <TrashIcon className="macSpriteArt" /> : <FloppyIcon className="macSpriteArt" />}
        </span>
        <div>
          <p className="macAlertKicker">
            {secret ? "Achievement unlocked" : `Recovered · ${fact.file}`}
          </p>
          <h4 className="macAlertTitle">{fact.title}</h4>
          <p className="macAlertText">{fact.text}</p>
        </div>
        <button type="button" className="macBtn macBtnDefault" onClick={onClose} autoFocus>
          OK
        </button>
      </div>
    </div>
  );
}

/** The Finder-style list of everything recovered so far. */
export function UnlockList({ found }: { found: string[] }) {
  const items = [...MINIGAME_FACTS, ...(found.includes(MINIGAME_SECRET.id) ? [MINIGAME_SECRET] : [])];

  return (
    <ul className="macList">
      {items.map((fact) => {
        const open = found.includes(fact.id);
        return (
          <li key={fact.id} className={`macListRow${open ? " isOpen" : ""}`}>
            <span className="macListIcon" aria-hidden="true">
              {open ? <FloppyIcon className="macSpriteArt" /> : <FolderIcon className="macSpriteArt" />}
            </span>
            <div>
              <p className="macListName">{open ? fact.title : "Locked file"}</p>
              <p className="macListMeta">{open ? fact.text : `${fact.file} — not recovered yet`}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
