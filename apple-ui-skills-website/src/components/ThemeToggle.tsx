"use client";

import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");

  useEffect(() => {
    const saved = localStorage.getItem("apple-ui-theme") as "system" | "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (mode: "system" | "light" | "dark") => {
    if (mode === "system") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("apple-ui-theme");
    } else {
      document.documentElement.setAttribute("data-theme", mode);
      localStorage.setItem("apple-ui-theme", mode);
    }
  };

  const toggleTheme = () => {
    let next: "system" | "light" | "dark";
    if (theme === "system") {
      next = "dark";
    } else if (theme === "dark") {
      next = "light";
    } else {
      next = "system";
    }
    setTheme(next);
    applyTheme(next);
  };

  const labelText =
    theme === "system"
      ? "Auto appearance (click to switch theme)"
      : theme === "dark"
      ? "Dark mode (click to switch theme)"
      : "Light mode (click to switch theme)";

  return (
    <button
      type="button"
      className="btn btn--gray btn--small"
      onClick={toggleTheme}
      aria-label={labelText}
      title={`Theme: ${theme}`}
      style={{
        width: "44px",
        height: "44px",
        minHeight: "44px",
        minWidth: "44px",
        padding: 0,
        borderRadius: "var(--r-pill)",
      }}
    >
      {theme === "dark" ? (
        <MoonIcon size={18} style={{ color: "var(--yellow)" }} />
      ) : theme === "light" ? (
        <SunIcon size={18} style={{ color: "var(--orange)" }} />
      ) : (
        <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em" }}>Auto</span>
      )}
    </button>
  );
}
