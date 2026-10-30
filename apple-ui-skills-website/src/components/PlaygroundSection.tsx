"use client";

import React, { useState } from "react";
import { CopyButton } from "./CopyButton";
import { CheckIcon } from "./Icons";

export function PlaygroundSection() {
  const [blurAmount, setBlurAmount] = useState(24);
  const [saturation, setSaturation] = useState(180);
  const [opacity, setOpacity] = useState(72);
  const [selectedTint, setSelectedTint] = useState<"blue" | "indigo" | "green" | "orange" | "purple">("blue");
  const [buttonVariant, setButtonVariant] = useState<"prominent" | "tinted" | "glass">("prominent");
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [toggleActive, setToggleActive] = useState(true);
  const [activeCodeTab, setActiveCodeTab] = useState<"swiftui" | "css">("swiftui");

  const tintColors = {
    blue: { name: "System Blue", value: "var(--blue)", hex: "#007aff" },
    indigo: { name: "System Indigo", value: "var(--indigo)", hex: "#5856d6" },
    green: { name: "System Green", value: "var(--green)", hex: "#34c759" },
    orange: { name: "System Orange", value: "var(--orange)", hex: "#ff9500" },
    purple: { name: "System Purple", value: "var(--purple)", hex: "#af52de" },
  };

  const glassStyle: React.CSSProperties = {
    background: `rgba(255, 255, 255, ${opacity / 100})`,
    backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    borderColor: `rgba(255, 255, 255, 0.45)`,
  };

  const swiftCode = `// 26-Series Liquid Glass & Dynamic Island Pattern
struct InteractiveCardPreview: View {
    @State private var isExpanded = ${islandExpanded}
    @State private var toggleOn = ${toggleActive}

    var body: some View {
        VStack(spacing: 20) {
            // Dynamic Island Capsule
            Capsule()
                .fill(.black)
                .frame(
                    width: isExpanded ? 340 : 126,
                    height: isExpanded ? 64 : 37
                )
                .animation(.spring(response: 0.32, dampingFraction: 0.76), value: isExpanded)
                .onTapGesture { isExpanded.toggle() }

            // Liquid Glass Card
            VStack(alignment: .leading, spacing: 14) {
                Toggle("Haptic Feedback", isOn: $toggleOn)
                    .tint(.${selectedTint})

                Button("Confirm Action") {}
                    .buttonStyle(.borderedProminent)
                    .tint(.${selectedTint})
            }
            .padding(20)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 22, style: .continuous))
            .shadow(color: .black.opacity(0.08), radius: 16, y: 8)
        }
    }
}`;

  const cssCode = `/* 26-Series Liquid Glass Material & Island Tokens */
.liquid-glass-card {
  background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
  backdrop-filter: blur(${blurAmount}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blurAmount}px) saturate(${saturation}%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 22px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
}

.dynamic-island-capsule {
  width: ${islandExpanded ? "340px" : "126px"};
  height: ${islandExpanded ? "64px" : "37px"};
  background: #000000;
  border-radius: 999px;
  transition: all 320ms cubic-bezier(0.32, 0.72, 0, 1);
}

.button-accent {
  background: ${tintColors[selectedTint].hex};
  color: #ffffff;
  border-radius: 999px;
}`;

  return (
    <section id="playground" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Interactive Sandbox</span>
          <h2 className="section-title">Liquid Glass & Component Playground</h2>
          <p className="section-subtitle">
            Experiment with Apple's 26-series materials, interactive component states, dynamic animations, and live CSS token adjustments in real time.
          </p>
        </div>

        {/* Playground Layout Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* Left Column: Interactive Visual Canvas */}
          <div
            className="card"
            style={{
              padding: "24px",
              position: "relative",
              overflow: "hidden",
              minHeight: "440px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(0,122,255,0.12) 0%, rgba(88,86,214,0.14) 50%, rgba(52,199,89,0.12) 100%)",
              border: "1px solid var(--separator)",
            }}
          >
            {/* Top: Dynamic Island Pill Animation */}
            <div style={{ textAlign: "center", width: "100%", paddingTop: "8px" }}>
              <div
                onClick={() => setIslandExpanded(!islandExpanded)}
                role="button"
                tabIndex={0}
                aria-label="Toggle Dynamic Island expansion"
                style={{
                  margin: "0 auto",
                  width: islandExpanded ? "320px" : "124px",
                  height: islandExpanded ? "64px" : "36px",
                  backgroundColor: "#000000",
                  borderRadius: "999px",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: islandExpanded ? "0 18px" : "0 14px",
                  cursor: "pointer",
                  transition: "all 320ms cubic-bezier(0.32, 0.72, 0, 1)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  userSelect: "none",
                }}
              >
                {islandExpanded ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: tintColors[selectedTint].hex,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        🎵
                      </span>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "12px", fontWeight: 600 }}>Now Playing</div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>Apple UI Suite</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "14px" }}>⏸</span>
                      <span style={{ fontSize: "10px", color: tintColors[selectedTint].hex }}>Live</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: "11px", fontWeight: 600 }}>Active</span>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: tintColors[selectedTint].hex,
                        boxShadow: `0 0 8px ${tintColors[selectedTint].hex}`,
                      }}
                    />
                  </>
                )}
              </div>
              <p style={{ fontSize: "11px", color: "var(--label-3)", marginTop: "8px" }}>
                Click pill to toggle compact / expanded state
              </p>
            </div>

            {/* Middle: Floating Liquid Glass Preview Card */}
            <div
              style={{
                ...glassStyle,
                width: "100%",
                maxWidth: "340px",
                padding: "20px",
                borderRadius: "22px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04)",
                border: "1px solid rgba(255,255,255,0.5)",
                margin: "16px 0",
                transition: "background var(--dur), backdrop-filter var(--dur)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--label)", margin: 0 }}>
                    Liquid Glass Card
                  </h4>
                  <span style={{ fontSize: "12px", color: "var(--label-2)" }}>26-series material</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: "var(--fill)",
                    color: "var(--label)",
                  }}
                >
                  Live
                </span>
              </div>

              {/* Interactive Toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--separator)",
                }}
              >
                <span style={{ fontSize: "14px", color: "var(--label)" }}>Real-time Reflection</span>
                <button
                  type="button"
                  onClick={() => setToggleActive(!toggleActive)}
                  style={{
                    width: "48px",
                    height: "28px",
                    borderRadius: "14px",
                    backgroundColor: toggleActive ? tintColors[selectedTint].hex : "var(--fill)",
                    border: "none",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background-color 200ms ease",
                    padding: 0,
                  }}
                  aria-label="Toggle reflection"
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: toggleActive ? "22px" : "2px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      transition: "left 200ms cubic-bezier(0.32, 0.72, 0, 1)",
                    }}
                  />
                </button>
              </div>

              {/* Action Button Preview */}
              <div style={{ marginTop: "16px" }}>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "12px 18px",
                    borderRadius: "999px",
                    border: buttonVariant === "glass" ? "1px solid var(--separator)" : "none",
                    backgroundColor:
                      buttonVariant === "prominent"
                        ? tintColors[selectedTint].hex
                        : buttonVariant === "tinted"
                        ? `rgba(0, 122, 255, 0.15)`
                        : "rgba(255, 255, 255, 0.35)",
                    color: buttonVariant === "prominent" ? "#ffffff" : tintColors[selectedTint].hex,
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: buttonVariant === "prominent" ? `0 4px 12px ${tintColors[selectedTint].hex}44` : "none",
                    transition: "transform 150ms ease, box-shadow 150ms ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Interactive Button
                </button>
              </div>
            </div>

            {/* Bottom link to standalone web demo */}
            <div style={{ textAlign: "center", width: "100%" }}>
              <a
                href="./examples/web-demo/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: tintColors[selectedTint].hex,
                  textDecoration: "none",
                }}
              >
                <span>Launch Fullscreen 4-Platform Web Demo</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Controls & Code Inspector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Tuner Controls Card */}
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px", color: "var(--label)" }}>
                Material Properties & Tint
              </h3>

              {/* Tint Picker */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--label-2)", marginBottom: "8px" }}>
                  Accent Tint Color
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {(Object.keys(tintColors) as Array<keyof typeof tintColors>).map((key) => {
                    const tint = tintColors[key];
                    const isSelected = selectedTint === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedTint(key)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: tint.hex,
                          border: isSelected ? "3px solid #ffffff" : "none",
                          outline: isSelected ? `2px solid ${tint.hex}` : "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                        }}
                        aria-label={`Select ${tint.name}`}
                      >
                        {isSelected && <CheckIcon width={14} height={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sliders */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--label-2)", marginBottom: "4px" }}>
                    <span>Background Blur</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    style={{ width: "100%", accentColor: tintColors[selectedTint].hex }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--label-2)", marginBottom: "4px" }}>
                    <span>Saturation Boost</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="240"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    style={{ width: "100%", accentColor: tintColors[selectedTint].hex }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--label-2)", marginBottom: "4px" }}>
                    <span>Surface Opacity</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    style={{ width: "100%", accentColor: tintColors[selectedTint].hex }}
                  />
                </div>
              </div>

              {/* Button Variant Picker */}
              <div style={{ marginTop: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--label-2)", marginBottom: "8px" }}>
                  Button Treatment
                </label>
                <div className="seg" role="radiogroup" aria-label="Button variant">
                  {(["prominent", "tinted", "glass"] as const).map((variant) => (
                    <label key={variant} data-on={buttonVariant === variant}>
                      <input
                        type="radio"
                        name="button-variant"
                        value={variant}
                        checked={buttonVariant === variant}
                        onChange={() => setButtonVariant(variant)}
                        style={{ position: "absolute", opacity: 0 }}
                      />
                      <span style={{ textTransform: "capitalize" }}>{variant}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Code Inspector */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab("swiftui")}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: activeCodeTab === "swiftui" ? "var(--tint)" : "var(--fill)",
                      color: activeCodeTab === "swiftui" ? "#ffffff" : "var(--label-2)",
                    }}
                  >
                    SwiftUI
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab("css")}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: activeCodeTab === "css" ? "var(--tint)" : "var(--fill)",
                      color: activeCodeTab === "css" ? "#ffffff" : "var(--label-2)",
                    }}
                  >
                    CSS / Web
                  </button>
                </div>
                <CopyButton text={activeCodeTab === "swiftui" ? swiftCode : cssCode} label="Copy Snippet" />
              </div>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  padding: "14px",
                  borderRadius: "12px",
                  background: "var(--bg)",
                  border: "1px solid var(--separator)",
                  overflowX: "auto",
                  maxHeight: "220px",
                  margin: 0,
                  color: "var(--label)",
                }}
              >
                <code>{activeCodeTab === "swiftui" ? swiftCode : cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
