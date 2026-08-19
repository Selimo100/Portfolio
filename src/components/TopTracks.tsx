"use client";

import { useEffect, useState } from "react";
import { FALLBACK_TRACKS, MUSIC_COPY, type Track } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const SPOTIFY_ICON =
  "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.668 11.531a.5.5 0 0 1-.688.165c-1.885-1.151-4.258-1.412-7.053-.777a.5.5 0 0 1-.221-.976c3.058-.695 5.686-.397 7.795.891a.5.5 0 0 1 .167.697m.982-2.186a.624.624 0 0 1-.858.206c-2.158-1.327-5.447-1.712-7.999-.936a.625.625 0 0 1-.363-1.196c2.913-.884 6.534-.456 9.017 1.07a.625.625 0 0 1 .203.856m.084-2.278C10.147 5.53 5.88 5.387 3.41 6.137a.75.75 0 0 1-.435-1.436c2.837-.86 7.554-.694 10.544 1.015a.75.75 0 1 1-.785 1.305";

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
                <span className="trackArtistRow">
                  <span className="trackArtist">{track.artist}</span>
                  {track.url ? (
                    <svg className="trackSpotify" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d={SPOTIFY_ICON} />
                    </svg>
                  ) : null}
                </span>
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
