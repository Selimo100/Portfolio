/**
 * Copy and configuration for the retro Mac mini game in the About section.
 *
 * Everything a human would want to edit lives here: the teaser text, the window
 * chrome labels and the facts each recovered file unlocks.
 */

export type MiniGameFact = {
  /** Stable id, also used inside the localStorage record of unlocked files. */
  id: string;
  /** Filename shown on the floppy in the game and in the recovered file list. */
  file: string;
  title: string;
  text: string;
};

export const MINIGAME_COPY = {
  headline: "Want to unlock more about me?",
  subtext:
    "Five personal files went missing in an old backup. Recover them in a small retro Mac app and each one tells you something the rest of this page does not.",
  button: "Open Profile Recovery",
  windowTitle: "Profile Recovery",
  statusIdle: "Ready. Insert disk to begin.",
  statusInProgress: "Recovering profile data…",
  statusComplete: "Profile recovery complete.",
  statusLocked: "Disk drive locked. Please wait.",
  lockTitle: "Disk error",
  lockText:
    "The bugs corrupted the read head. The drive needs five minutes to cool down before another recovery attempt.",
  lockReady: "The drive is ready again.",
  lockButton: "Insert disk",
} as const;

/** The five files scattered around the disk, in the order they are listed. */
export const MINIGAME_FACTS: MiniGameFact[] = [
  {
    id: "fact-1",
    file: "Origin.txt",
    title: "It started with curiosity, not a plan",
    text: "In 2019 I wanted to know how websites actually worked, so I built one. Then small tools for my family, mostly to fix things that annoyed them. Nobody told me to — that is still the reason I like this job.",
  },
  {
    id: "fact-2",
    file: "Builds.txt",
    title: "I build things people actually open",
    text: "My favourite projects are the ones with real users: a native iOS app, tooling for my karate club, infrastructure I host myself. A project only feels finished to me once someone else relies on it.",
  },
  {
    id: "fact-3",
    file: "Setup.txt",
    title: "Apprenticeship by day, BMS-W on top",
    text: "I work as an apprentice application developer and attend the Vocational Baccalaureate alongside it. Two schedules, one calendar — which is exactly why I plan carefully and write code my future self can still read.",
  },
  {
    id: "fact-4",
    file: "Offline.txt",
    title: "Karate keeps me honest",
    text: "Brown belt at Kaisho Karate Bassersdorf, competing in Kata, and teaching the kids' group since 2025. Repetition until it is clean — the same habit I bring to refactoring.",
  },
  {
    id: "fact-5",
    file: "Random.txt",
    title: "Four languages and a permanent soundtrack",
    text: "German, Italian, English and French, with Spanish in progress. And I rarely code in silence — the top tracks further up this page are genuinely what was playing while I built it.",
  },
];

/** Appears only once all five files are recovered. */
export const MINIGAME_SECRET: MiniGameFact = {
  id: "fact-secret",
  file: "Trash.txt",
  title: "There is a second easter egg on this site",
  text: "Close this window, then press the A key anywhere on the site. A little arcade opens in a new tab. You found the file in the Trash, so you get to know about it.",
};

export const MINIGAME_STORAGE_KEY = "sm.about.recovered";
/** Hearts left and, if the player ran out, the moment the drive unlocks again. */
export const MINIGAME_LOCK_KEY = "sm.about.run";
