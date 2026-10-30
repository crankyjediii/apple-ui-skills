"use client";

import React from "react";
import { PROMPT_EXAMPLES } from "@/data/prompts";
import { CopyButton } from "./CopyButton";

export function PromptsSection() {
  return (
    <section id="prompts" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Ready-To-Paste</span>
          <h2 className="section-title">Try these prompts with your agent</h2>
          <p className="section-subtitle">
            Copy any prompt below into Claude Code, Cursor, Codex, or your favorite agent to see Apple UI Skills in action.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {PROMPT_EXAMPLES.map((item, idx) => (
            <div
              key={idx}
              data-reveal
              className="card-content"
              style={{
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                "--i": idx % 3,
              } as React.CSSProperties}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color:
                        item.category === "Design"
                          ? "var(--tint-text)"
                          : item.category === "SwiftUI"
                          ? "var(--indigo-text)"
                          : item.category === "Web"
                          ? "var(--teal-text)"
                          : item.category === "Audit"
                          ? "var(--green-text)"
                          : "var(--orange-text)",
                    }}
                  >
                    {item.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--label-2)", fontWeight: 500 }}>
                    {item.title}
                  </span>
                </div>

                {/* Prompt block with copy button */}
                <div
                  style={{
                    background: "var(--bg-2)",
                    borderRadius: "var(--r-control)",
                    padding: "14px 16px",
                    border: "1px solid var(--separator)",
                    position: "relative",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      font: "var(--text-callout)",
                      color: "var(--label)",
                      fontStyle: "italic",
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    &ldquo;{item.prompt}&rdquo;
                  </p>
                </div>

                <p
                  style={{
                    font: "var(--text-footnote)",
                    color: "var(--label-2)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <CopyButton
                  text={item.prompt}
                  variant="tinted"
                  size="small"
                  label="Copy Prompt"
                  ariaLabel={`Copy prompt: ${item.prompt}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
