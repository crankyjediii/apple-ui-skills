"use client";

import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "./Icons";

interface CopyButtonProps {
  text: string;
  label?: string;
  ariaLabel?: string;
  variant?: "prominent" | "tinted" | "gray" | "plain";
  size?: "small" | "regular";
  className?: string;
}

export function CopyButton({
  text,
  label,
  ariaLabel = "Copy to clipboard",
  variant = "gray",
  size = "regular",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const btnClass = `btn btn--${variant} ${size === "small" ? "btn--small" : ""} ${className}`.trim();

  return (
    <button
      type="button"
      className={btnClass}
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : ariaLabel}
      title={copied ? "Copied!" : "Click to copy"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: label ? "8px" : "0",
        minWidth: label ? undefined : "44px",
        minHeight: "44px",
      }}
    >
      {copied ? (
        <CheckIcon size={size === "small" ? 16 : 18} className="icon-pop" style={{ color: "var(--green)" }} />
      ) : (
        <CopyIcon size={size === "small" ? 16 : 18} />
      )}
      {label && <span>{copied ? "Copied!" : label}</span>}
      <span className="sr-only" role="status">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
