"use client";

import { useState } from "react";
import type { Translation } from "@/lib/content";

type Status = { tone: "ok" | "error"; text: string } | null;

/**
 * Posts to sendMail.php, which ships beside the static export. The endpoint
 * answers with JSON so the page can stay put instead of doing a full redirect.
 */
export default function ContactForm({ t }: { t: Translation["contact"] }) {
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const form = event.currentTarget;
    setBusy(true);
    setStatus(null);

    try {
      const res = await fetch("/sendMail.php", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.error ?? "Failed to send the message.");

      setStatus({ tone: "ok", text: data.message ?? "Message sent." });
      form.reset();
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Failed to send the message.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="field">
        <span className="fieldLabel">{t.name}</span>
        <input className="input" name="name" required placeholder={t.namePh} />
      </label>
      <label className="field">
        <span className="fieldLabel">{t.email}</span>
        <input className="input" name="email" type="email" required placeholder={t.emailPh} />
      </label>
      <label className="field">
        <span className="fieldLabel">{t.message}</span>
        <textarea
          className="textarea"
          name="message"
          rows={5}
          required
          placeholder={t.messagePh}
        />
      </label>
      <button className="btn btnPrimary" style={{ marginTop: 4, padding: 14 }} disabled={busy}>
        {t.send}
      </button>
      {status && (
        <p className="formStatus" data-tone={status.tone} role="status">
          {status.text}
        </p>
      )}
      <span className="formNote">{t.note}</span>
    </form>
  );
}
