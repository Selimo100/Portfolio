"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MomoMark from "./MomoMark";
import { href, type Lang } from "@/lib/i18n";
import { MOMO_PROMPTS, type Translation } from "@/lib/content";

type Message = { from: "user" | "momo"; text: string };

type MomoResponse = {
  success?: boolean;
  answer?: string;
  action?: string | null;
  error?: string;
};

/**
 * Chat launcher for the site assistant. The answers come from ask.php, which
 * ships next to the static export on the same origin.
 */
export default function Momo({ lang, momo }: { lang: Lang; momo: Translation["momo"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const history = messages.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setDraft("");
    setBusy(true);

    try {
      const res = await fetch("/ask.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, history }),
      });
      const data: MomoResponse = await res.json();

      if (!data.success || !data.answer) {
        throw new Error(data.error ?? "Momo is unavailable.");
      }

      setMessages((prev) => [...prev, { from: "momo", text: data.answer as string }]);

      if (data.action === "show-projects") router.push(href(lang, "work"));
      if (data.action === "open-contact") router.push(href(lang, "contact"));
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "momo", text: error instanceof Error ? error.message : "Momo is unavailable." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        className="momoLauncher"
        onClick={() => setOpen((v) => !v)}
        title={momo.label}
        aria-label={momo.label}
        aria-expanded={open}
        data-open={open}
      >
        <MomoMark size={26} />
      </button>

      {open && (
        <div className="momoPanel" role="dialog" aria-label={momo.title}>
          <div className="momoHead">
            <MomoMark size={30} />
            <div className="momoTitle">{momo.title}</div>
          </div>
          <div className="momoBlurb">{momo.blurb}</div>

          {messages.length > 0 && (
            <div className="momoLog" ref={logRef} aria-live="polite">
              {messages.map((m, i) => (
                <div className="momoMsg" data-from={m.from} key={i}>
                  {m.text}
                </div>
              ))}
              {busy && (
                <div className="momoMsg momoTyping" data-from="momo" aria-label="Momo is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          )}

          {messages.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {MOMO_PROMPTS[lang].map((q) => (
                <button className="momoPrompt" key={q} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            className="momoForm"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              className="input"
              value={draft}
              maxLength={500}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={momo.label}
              aria-label={momo.label}
            />
            <button className="btn btnPrimary" style={{ padding: "0 16px" }} disabled={busy}>
              →
            </button>
          </form>

          <div className="momoNote">{momo.note}</div>
        </div>
      )}
    </>
  );
}
