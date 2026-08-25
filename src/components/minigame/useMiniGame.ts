"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MINIGAME_FACTS,
  MINIGAME_SECRET,
  MINIGAME_LOCK_KEY,
  MINIGAME_STORAGE_KEY,
  type MiniGameFact,
} from "@/lib/minigame";

/**
 * The little world the game runs in. Coordinates are abstract units, mapped to
 * the board with percentages, so the whole thing scales with the container.
 */
export const WORLD = { w: 100, h: 64 };

const SPAWN = { x: 50, y: 55 };
const PLAYER_SPEED = 46; // units per second
const PICKUP_RADIUS = 5.5;
const BUG_RADIUS = 5;
const HIT_COOLDOWN = 1200; // ms of grace after a bug knocks you back

/** Three hearts per run; losing the last one locks the disk drive for a while. */
export const MAX_LIVES = 3;
export const LOCKOUT_MS = 5 * 60 * 1000;

type Vec = { x: number; y: number };

export type Sprite = { id: string; kind: "file" | "bug" | "secret"; fact?: MiniGameFact };

/** Where each floppy sits. One per fact, hand-placed so the route is a nice loop. */
const FILE_SPOTS: Vec[] = [
  { x: 12, y: 14 },
  { x: 50, y: 9 },
  { x: 88, y: 16 },
  { x: 16, y: 50 },
  { x: 86, y: 50 },
];

const SECRET_SPOT: Vec = { x: 50, y: 33 };

const BUGS: { pos: Vec; vel: Vec }[] = [
  { pos: { x: 30, y: 30 }, vel: { x: 19, y: 13 } },
  { pos: { x: 70, y: 38 }, vel: { x: -16, y: 17 } },
  { pos: { x: 50, y: 20 }, vel: { x: 22, y: -11 } },
];

/**
 * Arrow keys only — the site already uses the plain "A" key to open the arcade,
 * so a WASD scheme would fight with it.
 */
const KEY_DIRS: Record<string, Vec> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export type Status = "idle" | "playing" | "complete" | "locked";

function readStored(): string[] {
  try {
    const raw = window.localStorage.getItem(MINIGAME_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

type RunState = { lives: number; until: number };

/**
 * The heart count and the lockout live in their own record, separate from the
 * recovered facts: a lockout must survive a refresh, or waiting it out would be
 * a matter of pressing F5.
 */
function readRun(): RunState {
  try {
    const raw = window.localStorage.getItem(MINIGAME_LOCK_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") return { lives: MAX_LIVES, until: 0 };
    const lives = Number(parsed.lives);
    const until = Number(parsed.until);
    return {
      lives: Number.isFinite(lives) ? Math.min(MAX_LIVES, Math.max(0, lives)) : MAX_LIVES,
      until: Number.isFinite(until) ? until : 0,
    };
  } catch {
    return { lives: MAX_LIVES, until: 0 };
  }
}

function writeRun(run: RunState) {
  try {
    window.localStorage.setItem(MINIGAME_LOCK_KEY, JSON.stringify(run));
  } catch {
    /* Private mode: the lockout only lasts as long as the tab does. */
  }
}

export function useMiniGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [found, setFound] = useState<string[]>([]);
  const [popup, setPopup] = useState<MiniGameFact | null>(null);
  const [nudged, setNudged] = useState(false);
  /** True while the board holds keyboard focus, i.e. while arrows drive the game. */
  const [active, setActive] = useState(false);
  const [lives, setLives] = useState(MAX_LIVES);
  /** Epoch ms the drive unlocks at; 0 when there is no lockout. */
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(0);

  const sprites = useRef(new Map<string, HTMLElement | null>());
  const player = useRef<Vec>({ ...SPAWN });
  const bugs = useRef(BUGS.map((b) => ({ pos: { ...b.pos }, vel: { ...b.vel } })));
  const keys = useRef(new Set<string>());
  const nudge = useRef<Vec | null>(null);
  const foundRef = useRef<string[]>([]);
  /** Timestamp of the last bug hit, so one collision cannot fire every frame. */
  const lastHit = useRef(0);
  const livesRef = useRef(MAX_LIVES);

  const filesFound = found.filter((id) => id !== MINIGAME_SECRET.id);
  const allFilesFound = filesFound.length >= MINIGAME_FACTS.length;
  const secretFound = found.includes(MINIGAME_SECRET.id);

  /** Restore previous progress and any running lockout once, on the client. */
  useEffect(() => {
    const run = readRun();
    livesRef.current = run.lives || MAX_LIVES;
    setLives(livesRef.current);
    if (run.until > Date.now()) {
      setLockedUntil(run.until);
      setNow(Date.now());
    }

    const stored = readStored();
    if (!stored.length) return;
    foundRef.current = stored;
    setFound(stored);
    if (stored.filter((id) => id !== MINIGAME_SECRET.id).length >= MINIGAME_FACTS.length) {
      setStatus("complete");
    }
  }, []);

  const persist = useCallback((ids: string[]) => {
    try {
      window.localStorage.setItem(MINIGAME_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* Private mode: progress simply does not survive a refresh. */
    }
  }, []);

  const setSpriteRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sprites.current.set(id, el);
    },
    [],
  );

  const place = (id: string, pos: Vec) => {
    const el = sprites.current.get(id);
    if (!el) return;
    el.style.left = `${(pos.x / WORLD.w) * 100}%`;
    el.style.top = `${(pos.y / WORLD.h) * 100}%`;
  };

  const collect = useCallback(
    (fact: MiniGameFact) => {
      if (foundRef.current.includes(fact.id)) return;
      const next = [...foundRef.current, fact.id];
      foundRef.current = next;
      setFound(next);
      setPopup(fact);
      persist(next);
      if (next.filter((id) => id !== MINIGAME_SECRET.id).length >= MINIGAME_FACTS.length) {
        setStatus("complete");
      }
    },
    [persist],
  );

  /** The loop runs while the app is open and no dialog is covering it. */
  useEffect(() => {
    if (status === "idle" || status === "locked" || popup) return;

    let last = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const dir = nudge.current ? { ...nudge.current } : { x: 0, y: 0 };
      for (const key of keys.current) {
        const d = KEY_DIRS[key];
        if (d) {
          dir.x += d.x;
          dir.y += d.y;
        }
      }
      const len = Math.hypot(dir.x, dir.y);
      if (len > 0) {
        const p = player.current;
        p.x = Math.min(WORLD.w - 4, Math.max(4, p.x + (dir.x / len) * PLAYER_SPEED * dt));
        p.y = Math.min(WORLD.h - 4, Math.max(4, p.y + (dir.y / len) * PLAYER_SPEED * dt));
      }
      place("player", player.current);

      for (const [i, bug] of bugs.current.entries()) {
        bug.pos.x += bug.vel.x * dt;
        bug.pos.y += bug.vel.y * dt;
        if (bug.pos.x < 5 || bug.pos.x > WORLD.w - 5) {
          bug.vel.x *= -1;
          bug.pos.x = Math.min(WORLD.w - 5, Math.max(5, bug.pos.x));
        }
        if (bug.pos.y < 5 || bug.pos.y > WORLD.h - 5) {
          bug.vel.y *= -1;
          bug.pos.y = Math.min(WORLD.h - 5, Math.max(5, bug.pos.y));
        }
        place(`bug-${i}`, bug.pos);

        const hit = Math.hypot(bug.pos.x - player.current.x, bug.pos.y - player.current.y) < BUG_RADIUS;
        if (hit && now - lastHit.current > HIT_COOLDOWN) {
          // Gentle penalty: back to the start, nothing lost, then a short
          // grace period so a bug parked on the spawn cannot trap the player.
          lastHit.current = now;
          player.current = { ...SPAWN };
          setNudged(true);
          window.setTimeout(() => setNudged(false), 600);

          const left = Math.max(0, livesRef.current - 1);
          livesRef.current = left;
          setLives(left);
          if (left === 0) {
            const until = Date.now() + LOCKOUT_MS;
            writeRun({ lives: MAX_LIVES, until });
            setLockedUntil(until);
            setNow(Date.now());
            setStatus("locked");
          } else {
            writeRun({ lives: left, until: 0 });
          }
        }
      }

      MINIGAME_FACTS.forEach((fact, i) => {
        if (foundRef.current.includes(fact.id)) return;
        const spot = FILE_SPOTS[i];
        if (Math.hypot(spot.x - player.current.x, spot.y - player.current.y) < PICKUP_RADIUS) {
          collect(fact);
        }
      });

      const secretUnlocked =
        foundRef.current.filter((id) => id !== MINIGAME_SECRET.id).length >= MINIGAME_FACTS.length;
      if (secretUnlocked && !foundRef.current.includes(MINIGAME_SECRET.id)) {
        if (Math.hypot(SECRET_SPOT.x - player.current.x, SECRET_SPOT.y - player.current.y) < PICKUP_RADIUS) {
          collect(MINIGAME_SECRET);
        }
      }

      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [status, popup, collect]);

  /** One timer drives the lockout countdown; it stops the moment it expires. */
  useEffect(() => {
    if (!lockedUntil) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= lockedUntil) window.clearInterval(id);
    }, 500);
    return () => window.clearInterval(id);
  }, [lockedUntil]);

  /**
   * Arrow keys are handled on the window, but only while the board holds focus.
   * Listening globally means a key released outside the board still registers,
   * which is what would otherwise leave the player gliding into a wall.
   */
  useEffect(() => {
    if (status === "idle" || status === "locked" || !active) {
      keys.current.clear();
      return;
    }

    const down = (event: KeyboardEvent) => {
      if (!KEY_DIRS[event.key]) return;
      event.preventDefault(); // Stop the page scrolling under the game.
      keys.current.add(event.key);
    };
    const up = (event: KeyboardEvent) => keys.current.delete(event.key);
    const clear = () => keys.current.clear();

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      keys.current.clear();
    };
  }, [status, active]);

  const setNudge = useCallback((dir: Vec | null) => {
    nudge.current = dir ? { ...dir } : null;
  }, []);

  /** Puts every moving thing back where it started. */
  const resetWorld = useCallback(() => {
    player.current = { ...SPAWN };
    bugs.current = BUGS.map((b) => ({ pos: { ...b.pos }, vel: { ...b.vel } }));
    keys.current.clear();
    nudge.current = null;
    lastHit.current = 0;
  }, []);

  const start = useCallback(() => {
    resetWorld();
    const run = readRun();
    if (run.until > Date.now()) {
      // A lockout from an earlier visit is still running.
      setLockedUntil(run.until);
      setNow(Date.now());
      setStatus("locked");
      return;
    }
    livesRef.current = run.lives || MAX_LIVES;
    setLives(livesRef.current);
    setStatus(
      foundRef.current.filter((id) => id !== MINIGAME_SECRET.id).length >= MINIGAME_FACTS.length
        ? "complete"
        : "playing",
    );
  }, [resetWorld]);

  /** Fresh hearts after a lockout has run out. Recovered files are kept. */
  const resume = useCallback(() => {
    if (lockedUntil && Date.now() < lockedUntil) return;
    resetWorld();
    livesRef.current = MAX_LIVES;
    setLives(MAX_LIVES);
    setLockedUntil(0);
    writeRun({ lives: MAX_LIVES, until: 0 });
    setStatus(allFilesFound ? "complete" : "playing");
  }, [lockedUntil, resetWorld, allFilesFound]);

  /** Start the whole thing over: hearts back, recovered files wiped. */
  const replay = useCallback(() => {
    if (lockedUntil && Date.now() < lockedUntil) return;
    foundRef.current = [];
    setFound([]);
    setPopup(null);
    persist([]);
    resetWorld();
    livesRef.current = MAX_LIVES;
    setLives(MAX_LIVES);
    setLockedUntil(0);
    writeRun({ lives: MAX_LIVES, until: 0 });
    setStatus("playing");
  }, [persist, resetWorld, lockedUntil]);

  /** Accessible escape hatch: hand over every fact without playing. */
  const revealAll = useCallback(() => {
    const all = [...MINIGAME_FACTS.map((f) => f.id), MINIGAME_SECRET.id];
    foundRef.current = all;
    setFound(all);
    persist(all);
    setStatus("complete");
  }, [persist]);

  return {
    status,
    found,
    filesFound,
    allFilesFound,
    secretFound,
    popup,
    nudged,
    dismissPopup: () => setPopup(null),
    fileSpots: FILE_SPOTS,
    secretSpot: SECRET_SPOT,
    bugCount: BUGS.length,
    spawn: SPAWN,
    setSpriteRef,
    lives,
    maxLives: MAX_LIVES,
    /** Milliseconds left on the lockout; 0 once the drive is free again. */
    lockRemaining: lockedUntil ? Math.max(0, lockedUntil - now) : 0,
    locked: status === "locked",
    resume,
    active,
    setActive,
    setNudge,
    start,
    replay,
    revealAll,
  };
}
