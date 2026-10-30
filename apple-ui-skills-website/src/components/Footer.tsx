import React from "react";
import { PROJECT } from "@/data/project";
import { GitHubIcon } from "./Icons";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--separator)",
        background: "var(--bg-2)",
        padding: "56px 20px 72px",
        color: "var(--label-2)",
        fontSize: "13px",
        lineHeight: 1.6,
      }}
    >
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Navigation & Repo Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "36px",
            paddingBottom: "28px",
            borderBottom: "1px solid var(--separator)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--tint)",
              }}
              aria-hidden="true"
            />
            <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--label)" }}>
              {PROJECT.name}
            </span>
            <span style={{ color: "var(--label-3)" }}>•</span>
            <span>v{PROJECT.version}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <a href="#features" style={{ color: "var(--label-2)" }}>Features</a>
            <a href="#platforms" style={{ color: "var(--label-2)" }}>Platforms</a>
            <a href="#playground" style={{ color: "var(--label-2)" }}>Playground</a>
            <a href="#skills" style={{ color: "var(--label-2)" }}>13 Skills</a>
            <a href="#prompts" style={{ color: "var(--label-2)" }}>Prompts</a>
            <a href="#faq" style={{ color: "var(--label-2)" }}>FAQ</a>
            <a
              href={PROJECT.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--label)",
                fontWeight: 600,
              }}
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Legal and Disclaimer Notice */}
        <div style={{ maxWidth: "860px" }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Disclaimer:</strong> This open-source project is independent and is <strong>not affiliated with, sponsored by, or endorsed by Apple Inc.</strong>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            This repository contains original instructions, mapping tables, and code written for coding agents, plus text-only structural facts about Apple&apos;s UI kits. It contains <strong>no Apple Design Resources artwork</strong>: no exported images, SVGs, screenshots, Figma file data, font files, or SF Symbols.
          </p>

          <p style={{ margin: "0 0 16px" }}>
            Apple, iOS, iPadOS, macOS, visionOS, watchOS, SF Symbols, Face ID, Liquid Glass and related marks are trademarks of Apple Inc. Figma is a trademark of Figma, Inc.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              paddingTop: "8px",
            }}
          >
            <span>Released under the <a href={PROJECT.licenseUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--tint)", textDecoration: "underline" }}>MIT License</a>.</span>
            <span>•</span>
            <a
              href={PROJECT.noticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--tint)", fontWeight: 600, textDecoration: "underline" }}
            >
              Read full NOTICE.md
            </a>
            <span>•</span>
            <a
              href={PROJECT.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--tint)", textDecoration: "underline" }}
            >
              Release v{PROJECT.version}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
