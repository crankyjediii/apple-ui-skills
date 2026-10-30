"use client";

import React, { useState, useEffect } from "react";
import { PROJECT } from "@/data/project";
import { CopyButton } from "./CopyButton";
import { CheckIcon } from "./Icons";

export function HowItWorks() {
  const [activeTerminalTab, setActiveTerminalTab] = useState<"setup" | "design" | "audit">("setup");
  const [streamedText, setStreamedText] = useState("");
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [replayCount, setReplayCount] = useState(0);

  const terminalDemos = {
    setup: {
      title: "Step 1: Onboarding Setup",
      command: "> Set up the Apple UI kit skills for me. I'm building an iPhone app in SwiftUI.",
      output: [
        "● Detected Apple UI Skills v0.1.0",
        "✓ Figma MCP connection checked (1 duplicate kit found)",
        "✓ Platform target: iOS & iPadOS 26 (Liquid Glass era)",
        "✓ Code stack: SwiftUI (Xcode 26 SDK)",
        "✓ Ready: loaded apple-ui-core, apple-ui-ios-ipados, apple-ui-swiftui",
        "→ Suggested first task: 'Design an onboarding view with Apple buttons and grouped lists.'",
      ],
    },
    design: {
      title: "Step 2: Component Implementation",
      command: "> Implement the macOS Buttons page in SwiftUI: https://figma.com/design/1oJBVhr...",
      output: [
        "● Connecting to Figma via read-only session...",
        "✓ Reading Page 'Buttons' (node id: 483:8848)",
        "✓ Extracted 8 component variants: Bordered Prominent, Tinted, Gray, Plain",
        "✓ Reading radii (--r-control: 12px) and semantic colors",
        "✓ Synthesizing SwiftUI: struct MacButtonsView: View with .buttonStyle(.borderedProminent)",
        "✓ Swift type-check passed against macOS 26 SDK",
      ],
    },
    audit: {
      title: "Step 3: HIG & Kit Audit",
      command: "> Audit this SwiftUI view against the Apple kits.",
      output: [
        "● Running apple-ui-audit checklist...",
        "✓ Structure: NavigationStack + TabBar (Pass)",
        "✓ Hit targets: 44pt touch targets verified (Pass)",
        "✓ Dynamic Type: system text styles honored (Pass)",
        "✓ Liquid Glass: verified only on floating navigation chrome (Pass)",
        "→ Audit result: 0 High severity findings. Ready for production.",
      ],
    },
  };

  const currentDemo = terminalDemos[activeTerminalTab];

  useEffect(() => {
    let isCancelled = false;
    setStreamedText("");
    setVisibleLineCount(0);
    setIsTyping(true);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStreamedText(currentDemo.command);
      setVisibleLineCount(currentDemo.output.length);
      setIsTyping(false);
      return;
    }

    const fullCommand = currentDemo.command;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (isCancelled) return;
      charIndex++;
      setStreamedText(fullCommand.slice(0, charIndex));

      if (charIndex >= fullCommand.length) {
        clearInterval(typeInterval);
        setIsTyping(false);

        let lineIdx = 0;
        const lineInterval = setInterval(() => {
          if (isCancelled) return;
          lineIdx++;
          setVisibleLineCount(lineIdx);
          if (lineIdx >= currentDemo.output.length) {
            clearInterval(lineInterval);
          }
        }, 120);
      }
    }, 18);

    return () => {
      isCancelled = true;
      clearInterval(typeInterval);
    };
  }, [activeTerminalTab, replayCount, currentDemo.command, currentDemo.output.length]);

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Quick Start</span>
          <h2 className="section-title">How it works in 3 minutes</h2>
          <p className="section-subtitle">
            Get up and running with any AI coding agent in three simple steps. No proprietary setups, no complex configuration.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {/* Step 1 */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              "--i": 0,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--fill)",
                color: "var(--tint-text)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "16px",
              }}
            >
              1
            </div>

            <h3 style={{ font: "var(--text-title-3)", marginBottom: "8px" }}>
              Install via npx or plugin
            </h3>

            <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "16px", lineHeight: 1.5 }}>
              Add all 13 skills to your agent with a single universal command, or install the Claude Code plugin.
            </p>

            <div
              style={{
                marginTop: "auto",
                background: "var(--bg-2)",
                borderRadius: "var(--r-control)",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <code
                style={{
                  fontSize: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {PROJECT.npxInstallCommand}
              </code>
              <CopyButton text={PROJECT.npxInstallCommand} size="small" variant="gray" />
            </div>
          </div>

          {/* Step 2 */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              "--i": 1,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--fill)",
                color: "var(--tint-text)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "16px",
              }}
            >
              2
            </div>

            <h3 style={{ font: "var(--text-title-3)", marginBottom: "8px" }}>
              Duplicate kits & connect Figma
            </h3>

            <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "16px", lineHeight: 1.5 }}>
              Duplicate Apple&apos;s Community files into your drafts and connect the Figma MCP server. (No Figma? Native and web recipes work standalone!).
            </p>

            <div
              style={{
                marginTop: "auto",
                fontSize: "13px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              <a
                href="https://www.figma.com/design/huNIqDttz2Gg4R8L6g91YA/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gray btn--small"
                style={{ textDecoration: "none", fontSize: "12px", minHeight: "36px", padding: "0 12px", display: "inline-flex", alignItems: "center" }}
              >
                iOS Kit &rarr;
              </a>
              <a
                href="https://www.figma.com/design/1oJBVhrLD3oLk3FwQPlFD4/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gray btn--small"
                style={{ textDecoration: "none", fontSize: "12px", minHeight: "36px", padding: "0 12px", display: "inline-flex", alignItems: "center" }}
              >
                macOS Kit &rarr;
              </a>
              <a
                href="https://www.figma.com/design/r9eDkx0DAfRqGdTX6UkkG4/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gray btn--small"
                style={{ textDecoration: "none", fontSize: "12px", minHeight: "36px", padding: "0 12px", display: "inline-flex", alignItems: "center" }}
              >
                visionOS &rarr;
              </a>
              <a
                href="https://www.figma.com/design/il8U8FmGZmtGH3yNPFCPUV/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gray btn--small"
                style={{ textDecoration: "none", fontSize: "12px", minHeight: "36px", padding: "0 12px", display: "inline-flex", alignItems: "center" }}
              >
                watchOS &rarr;
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              "--i": 2,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--fill)",
                color: "var(--tint-text)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "16px",
              }}
            >
              3
            </div>

            <h3 style={{ font: "var(--text-title-3)", marginBottom: "8px" }}>
              Prompt your agent
            </h3>

            <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "16px", lineHeight: 1.5 }}>
              Ask your agent naturally. It automatically routes the task, inspects kit components, and generates verified code.
            </p>

            <div
              style={{
                marginTop: "auto",
                background: "var(--bg-2)",
                borderRadius: "var(--r-control)",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--label)",
                  fontStyle: "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                &ldquo;Set up the Apple UI kit skills for me...&rdquo;
              </span>
              <CopyButton
                text="Set up the Apple UI kit skills for me. I'm building an iPhone app in SwiftUI."
                size="small"
                variant="gray"
              />
            </div>
          </div>
        </div>

        {/* Interactive Terminal Simulator */}
        <div
          data-reveal
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            borderRadius: "var(--r-card)",
            background: "#1c1c1e",
            color: "#f5f5f7",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            "--i": 3,
          } as React.CSSProperties}
        >
          {/* Terminal Titlebar with Mode Tabs & Replay */}
          <div
            style={{
              padding: "12px 18px",
              background: "#2c2c2e",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
              <span
                style={{
                  marginLeft: "10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "#aeaeb2",
                }}
              >
                agent-session — bash
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Replay streaming animation button */}
              <button
                type="button"
                onClick={() => setReplayCount((c) => c + 1)}
                className="btn btn--gray btn--small"
                style={{
                  fontSize: "12px",
                  height: "38px",
                  minHeight: "38px",
                  padding: "0 14px",
                  borderRadius: "var(--r-pill)",
                }}
                aria-label="Replay terminal typing animation"
                title="Replay animation"
              >
                <span>Replay</span> ↺
              </button>

              {/* Simulation Scenario Tabs */}
              <div className="seg" role="radiogroup" aria-label="Terminal simulation mode">
                <label data-on={activeTerminalTab === "setup"}>
                  <input
                    type="radio"
                    name="terminal-mode"
                    checked={activeTerminalTab === "setup"}
                    onChange={() => setActiveTerminalTab("setup")}
                  />
                  1. Onboarding
                </label>
                <label data-on={activeTerminalTab === "design"}>
                  <input
                    type="radio"
                    name="terminal-mode"
                    checked={activeTerminalTab === "design"}
                    onChange={() => setActiveTerminalTab("design")}
                  />
                  2. Implement
                </label>
                <label data-on={activeTerminalTab === "audit"}>
                  <input
                    type="radio"
                    name="terminal-mode"
                    checked={activeTerminalTab === "audit"}
                    onChange={() => setActiveTerminalTab("audit")}
                  />
                  3. Audit
                </label>
              </div>
            </div>
          </div>

          {/* Terminal Body with Streaming Text */}
          <div
            style={{
              padding: "24px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: 1.7,
              minHeight: "220px",
            }}
          >
            {/* Accessible screen reader announcement for live terminal state */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {`Terminal demo: ${currentDemo.title}. Command: ${currentDemo.command}. Output: ${currentDemo.output.join(". ")}`}
            </div>

            {/* Input prompt with typewriter streaming effect */}
            <div
              style={{
                color: "#64d2ff",
                fontWeight: 600,
                marginBottom: "16px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div aria-hidden="true">
                <span>{streamedText || currentDemo.command.slice(0, 1)}</span>
                {isTyping && <span className="terminal-caret" />}
              </div>
              <CopyButton
                text={currentDemo.command.replace(/^>\s*/, "")}
                size="small"
                variant="gray"
                ariaLabel="Copy simulated command"
              />
            </div>

            {/* Output lines appearing progressively */}
            <div
              aria-hidden="true"
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {currentDemo.output.slice(0, visibleLineCount).map((line, idx) => {
                const isSuccess = line.startsWith("✓");
                const isPointer = line.startsWith("→");
                const isBullet = line.startsWith("●");

                return (
                  <div
                    key={idx}
                    style={{
                      color: isSuccess
                        ? "#30d158"
                        : isPointer
                        ? "#ffd60a"
                        : isBullet
                        ? "#bf5af2"
                        : "#e5e5ea",
                      paddingLeft: isSuccess ? "4px" : "0",
                      animation: "fadeIn 220ms ease both",
                    }}
                  >
                    {isSuccess ? (
                      <>
                        <span className="icon-pop" style={{ display: "inline-block", marginRight: "6px" }}>✓</span>
                        {line.slice(2)}
                      </>
                    ) : (
                      line
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
