"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Reads whatever the inline boot script already put on <html> so the button
 * label matches the palette on first render.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Private browsing — the choice simply will not persist. */
    }
  }

  return (
    <button className="iconBtn" onClick={toggle} title={label} aria-label={label}>
      <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
