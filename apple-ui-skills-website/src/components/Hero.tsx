"use client";

import React, { useState } from "react";
import { PROJECT } from "@/data/project";
import { GitHubIcon, TerminalIcon, ChevronRightIcon, SparklesIcon } from "./Icons";
import { CopyButton } from "./CopyButton";

export function Hero() {
  const [activeInstallTab, setActiveInstallTab] = useState<"npx" | "claude">("npx");

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        padding: "80px 20px 72px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Soft ambient gradient backdrop */}
      <div
        className="hero-gradient"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1200px, 140vw)",
          height: "600px",
          background:
            "radial-gradient(ellipse 65% 55% at 50% 25%, color-mix(in srgb, var(--tint) 20%, transparent), color-mix(in srgb, var(--purple) 12%, transparent) 45%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Floating pill badge */}
        <div data-reveal style={{ display: "inline-block", marginBottom: "24px", "--i": 0 } as React.CSSProperties}>
          <div
            className="glass shimmer-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "var(--r-pill)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--label)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            }}
          >
            <SparklesIcon size={15} style={{ color: "var(--tint)" }} />
            <span>Official 26-Series Kits</span>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--label-3)",
              }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--label-2)" }}>Release v{PROJECT.version}</span>
          </div>
        </div>

        {/* Large Title */}
        <h1
          data-reveal
          style={{
            font: "var(--text-large-title)",
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "20px",
            color: "var(--label)",
            "--i": 1,
          } as React.CSSProperties}
        >
          Teach your coding agent to build with Apple’s official UI kits.
        </h1>

        {/* One-sentence Subhead */}
        <p
          data-reveal
          style={{
            font: "var(--text-title-3)",
            fontSize: "clamp(18px, 2.4vw, 22px)",
            lineHeight: 1.45,
            color: "var(--label-2)",
            maxWidth: "720px",
            margin: "0 auto 32px",
            fontWeight: 400,
            "--i": 2,
          } as React.CSSProperties}
        >
          Agent skills and a Claude Code plugin that teach coding agents to build with Apple&apos;s official 26-series UI kits.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div
          data-reveal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "36px",
            "--i": 3,
          } as React.CSSProperties}
        >
          <a
            href={PROJECT.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--prominent btn--large"
            style={{ textDecoration: "none" }}
          >
            <GitHubIcon size={20} />
            <span>View on GitHub</span>
          </a>

          <a
            href="#how-it-works"
            className="btn btn--tinted btn--large"
            style={{ textDecoration: "none" }}
          >
            <span>Quick start</span>
            <ChevronRightIcon size={18} />
          </a>
        </div>

        {/* Interactive Install Box with Tabs (npx skills vs Claude Code plugin) */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              padding: "0 4px",
            }}
          >
            <div className="seg" role="radiogroup" aria-label="Installation method">
              <label data-on={activeInstallTab === "npx"}>
                <input
                  type="radio"
                  name="install-type"
                  checked={activeInstallTab === "npx"}
                  onChange={() => setActiveInstallTab("npx")}
                />
                npx skills
              </label>
              <label data-on={activeInstallTab === "claude"}>
                <input
                  type="radio"
                  name="install-type"
                  checked={activeInstallTab === "claude"}
                  onChange={() => setActiveInstallTab("claude")}
                />
                Claude Code plugin
              </label>
            </div>

            <span
              style={{
                font: "var(--text-caption-1)",
                color: "var(--label-2)",
              }}
            >
              MIT License
            </span>
          </div>

          {/* Floating glass-style terminal command container */}
          <div
            className="glass"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: "var(--r-control)",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              <TerminalIcon size={18} style={{ color: "var(--tint)", flexShrink: 0 }} />
              <code
                style={{
                  background: "transparent",
                  padding: 0,
                  fontSize: "14px",
                  color: "var(--label)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {activeInstallTab === "npx"
                  ? PROJECT.npxInstallCommand
                  : PROJECT.claudePluginInstall}
              </code>
            </div>

            <CopyButton
              text={
                activeInstallTab === "npx"
                  ? PROJECT.npxInstallCommand
                  : `${PROJECT.claudePluginMarketplace}\n${PROJECT.claudePluginInstall}`
              }
              variant="tinted"
              size="small"
              label="Copy"
              ariaLabel="Copy installation command to clipboard"
            />
          </div>

          <p
            style={{
              font: "var(--text-caption-1)",
              color: "var(--label-2)",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            Works with Claude Code, Codex, Cursor and dozens of other agents via <code>npx skills</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
