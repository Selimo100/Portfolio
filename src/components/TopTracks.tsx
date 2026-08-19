"use client";

import { useEffect, useState } from "react";
import { FALLBACK_TRACKS, MUSIC_COPY, type Track } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

/**
 * Top tracks come from spotify-top.php, which caches Spotify's answer on disk.
 * The static build ships a snapshot as the fallback, so the card is never empty
 * if the endpoint is unreachable or Spotify is not configured yet.
 */
export default function TopTracks({ lang }: { lang: Lang }) {
  const [tracks, setTracks] = useState<Track[]>(FALLBACK_TRACKS);
  const music = MUSIC_COPY[lang];

  useEffect(() => {
    let cancelled = false;

    fetch("/spotify-top.php")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.tracks?.length) return;
        setTracks(
          data.tracks.map((t: Record<string, string>, i: number) => ({
            n: String(i + 1),
            title: t.title,
            artist: t.artist,
            url: t.url,
            cover: t.cover,
          })),
        );
      })
      .catch(() => {
        /* Keep the snapshot that shipped with the build. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="musicCard" data-reveal="1">
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span className="musicPulse" aria-hidden="true" />
        <span className="eyebrow" style={{ fontSize: 10.5 }}>
          {music.label}
        </span>
      </div>
      <div style={{ marginTop: 7, fontSize: 12.5, color: "var(--mu)" }}>{music.sub}</div>
      <ol style={{ marginTop: 18, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
        {tracks.map((track) => {
          const body = (
            <>
              <span className="trackNum">{track.n}</span>
              {track.cover ? (
                <img className="trackCover" src={track.cover} alt="" loading="lazy" />
              ) : (
                <span className="trackCover hatch" aria-hidden="true" />
              )}
              <span style={{ minWidth: 0 }}>
                <span className="trackTitle" style={{ display: "block" }}>
                  {track.title}
                </span>
                <span className="trackArtist" style={{ display: "block" }}>
                  {track.artist}
                </span>
              </span>
              <span aria-hidden="true" style={{ fontSize: 15, color: "var(--accent2)", textAlign: "right" }}>
                ◉
              </span>
            </>
          );

          return (
            <li key={track.n}>
              {track.url ? (
                <a className="trackRow" href={track.url} target="_blank" rel="noreferrer">
                  {body}
                </a>
              ) : (
                <div className="trackRow">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
