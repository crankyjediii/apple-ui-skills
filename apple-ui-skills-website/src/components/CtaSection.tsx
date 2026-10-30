"use client";

import React from "react";
import { PROJECT } from "@/data/project";
import { GitHubIcon, TerminalIcon, ExternalLinkIcon } from "./Icons";
import { CopyButton } from "./CopyButton";

export function CtaSection() {
  return (
    <section className="section" style={{ background: "var(--bg)", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "760px" }}>
        <div
          data-reveal
          className="card-content"
          style={{
            padding: "56px 32px",
            background: "var(--bg-2)",
            border: "1px solid var(--separator)",
            borderRadius: "var(--r-card)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.05)",
          }}
        >
          <span className="section-eyebrow">Start Building Today</span>

          <h2
            style={{
              font: "var(--text-large-title)",
              fontSize: "clamp(30px, 4vw, 42px)",
              margin: "12px 0 16px",
            }}
          >
            Teach your agent the 26-series kits
          </h2>

          <p
            style={{
              font: "var(--text-callout)",
              color: "var(--label-2)",
              maxWidth: "540px",
              margin: "0 auto 36px",
              lineHeight: 1.5,
            }}
          >
            Compatible with Claude Code, Codex, Cursor, and dozens of other agents. Open-source under the MIT license.
          </p>

          {/* Primary Action Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <a
              href={PROJECT.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--prominent btn--large"
              style={{
                textDecoration: "none",
                fontSize: "18px",
                padding: "0 32px",
              }}
            >
              <GitHubIcon size={20} />
              <span>Get it on GitHub</span>
            </a>
          </div>

          {/* Install command pill with copy */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg-3)",
              border: "1px solid var(--separator)",
              borderRadius: "var(--r-pill)",
              padding: "6px 8px 6px 16px",
              maxWidth: "100%",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
              <TerminalIcon size={16} style={{ color: "var(--tint)", flexShrink: 0 }} />
              <code style={{ fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {PROJECT.npxInstallCommand}
              </code>
            </div>
            <CopyButton text={PROJECT.npxInstallCommand} size="small" variant="tinted" label="Copy" />
          </div>

          {/* Links to v0.1.0 release and issues tracker */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              fontSize: "14px",
            }}
          >
            <a
              href={PROJECT.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "var(--label-2)",
                fontWeight: 500,
              }}
            >
              <span>Release notes v{PROJECT.version}</span>
              <ExternalLinkIcon size={13} />
            </a>

            <span style={{ color: "var(--label-3)" }}>•</span>

            <a
              href={PROJECT.issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "var(--label-2)",
                fontWeight: 500,
              }}
            >
              <span>Report an issue or mapping error</span>
              <ExternalLinkIcon size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
