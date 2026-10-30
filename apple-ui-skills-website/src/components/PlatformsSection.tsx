"use client";

import React, { useState } from "react";
import { PLATFORMS } from "@/data/platforms";
import { CheckIcon } from "./Icons";

export function PlatformsSection() {
  const [activePlatformId, setActivePlatformId] = useState<"ios" | "macos" | "visionos" | "watchos">("ios");
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [mockTab, setMockTab] = useState("General");
  const [appearanceMode, setAppearanceMode] = useState("Auto");
  const [spatialOffset, setSpatialOffset] = useState({ x: 0, y: 0 });

  const handleSpatialMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setSpatialOffset({ x, y });
  };

  const handleSpatialLeave = () => {
    setSpatialOffset({ x: 0, y: 0 });
  };

  const currentPlatform = PLATFORMS.find((p) => p.id === activePlatformId) || PLATFORMS[0];

  return (
    <section id="platforms" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">All Four Platforms</span>
          <h2 className="section-title">Built for the 26-series era</h2>
          <p className="section-subtitle">
            Liquid Glass materials, platform-specific navigation hierarchies, and exact component mappings across iOS, macOS, visionOS, and watchOS.
          </p>
        </div>

        {/* Platform Segmented Control */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
            overflowX: "auto",
            padding: "4px",
          }}
        >
          <div className="seg" role="radiogroup" aria-label="Target platform preview">
            {PLATFORMS.map((platform) => {
              const isActive = activePlatformId === platform.id;
              return (
                <label key={platform.id} data-on={isActive}>
                  <input
                    type="radio"
                    name="platform-selector"
                    value={platform.id}
                    checked={isActive}
                    onChange={() => setActivePlatformId(platform.id)}
                  />
                  {platform.name}
                </label>
              );
            })}
          </div>
        </div>

        {/* Platform Details & Interactive Mock Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "36px",
            alignItems: "center",
          }}
        >
          {/* Left: Platform Specs & Covered Components */}
          <div>
            <div style={{ display: "inline-block", marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--tint-text)",
                }}
              >
                {currentPlatform.osName}
              </span>
            </div>

            <h3 style={{ font: "var(--text-title-1)", marginBottom: "14px" }}>
              {currentPlatform.highlight}
            </h3>

            <p style={{ font: "var(--text-body)", color: "var(--label-2)", marginBottom: "24px", lineHeight: 1.55 }}>
              {currentPlatform.description}
            </p>

            <div style={{ marginBottom: "28px" }}>
              <h4 style={{ font: "var(--text-headline)", marginBottom: "12px" }}>
                Components covered in kit index:
              </h4>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "10px",
                }}
              >
                {currentPlatform.components.map((comp) => (
                  <div
                    key={comp}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      color: "var(--label)",
                    }}
                  >
                    <CheckIcon size={16} style={{ color: "var(--green)", flexShrink: 0 }} />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "14px 18px",
                borderRadius: "var(--r-control)",
                background: "var(--bg-2)",
                border: "1px solid var(--separator)",
                fontSize: "13px",
                color: "var(--label-2)",
              }}
            >
              <strong style={{ color: "var(--label)" }}>HIG Rule: </strong>
              {currentPlatform.guidelinesSummary}
            </div>
          </div>

          {/* Right: Original Mock built from CSS recipes */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* iPhone / iPad Mock */}
            {activePlatformId === "ios" && (
              <div
                className="mock-preview"
                data-impeccable-ignore="nested-cards"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  borderRadius: "36px",
                  border: "2px solid var(--separator)",
                  background: "var(--grouped-bg)",
                  padding: "24px 16px 20px",
                  boxShadow: "0 20px 48px rgba(0, 0, 0, 0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Mobile top bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "18px",
                    padding: "0 6px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--tint)", fontWeight: 500 }}>&larr; Back</span>
                  <span style={{ font: "var(--text-headline)" }}>Preferences</span>
                  <span style={{ fontSize: "14px", color: "var(--tint)", fontWeight: 600 }}>Done</span>
                </div>

                {/* Segmented control */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                  <div className="seg" role="radiogroup" aria-label="Mode">
                    {["Auto", "Light", "Dark"].map((m) => (
                      <label key={m} data-on={appearanceMode === m}>
                        <input
                          type="radio"
                          name="mock-appearance"
                          checked={appearanceMode === m}
                          onChange={() => setAppearanceMode(m)}
                        />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Grouped inset list recipe */}
                <div role="list" className="mock-list">
                  <div role="listitem">
                    <span style={{ font: "var(--text-body)" }}>Wi-Fi Network</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        role="switch"
                        aria-label="Wi-Fi Network"
                        checked={wifiEnabled}
                        onChange={(e) => setWifiEnabled(e.target.checked)}
                      />
                    </label>
                  </div>
                  <div role="listitem">
                    <span style={{ font: "var(--text-body)" }}>iCloud Sync</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        role="switch"
                        aria-label="iCloud Sync"
                        checked={syncEnabled}
                        onChange={(e) => setSyncEnabled(e.target.checked)}
                      />
                    </label>
                  </div>
                </div>

                {/* Buttons recipe */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <button type="button" className="btn btn--prominent" style={{ width: "100%" }}>
                    Continue with Setup
                  </button>
                  <button type="button" className="btn btn--tinted" style={{ width: "100%" }}>
                    Review Options
                  </button>
                </div>

                {/* Floating Glass Tab Bar recipe */}
                <nav
                  className="glass"
                  aria-label="Mock navigation"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "6px",
                    borderRadius: "28px",
                  }}
                >
                  {["General", "Display", "Privacy"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setMockTab(tab)}
                      style={{
                        border: 0,
                        background: mockTab === tab ? "var(--fill-2)" : "transparent",
                        color: mockTab === tab ? "var(--tint-text)" : "var(--label)",
                        fontWeight: mockTab === tab ? 700 : 400,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* macOS Mock */}
            {activePlatformId === "macos" && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "460px",
                  borderRadius: "14px",
                  border: "1px solid var(--separator)",
                  background: "var(--bg-3)",
                  boxShadow: "0 24px 50px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                }}
              >
                {/* Unified Window Titlebar with Traffic Lights */}
                <div
                  style={{
                    height: "44px",
                    background: "var(--bg-2)",
                    borderBottom: "1px solid var(--separator)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 14px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--label-2)",
                    }}
                  >
                    Window Inspector — macOS 26
                  </span>
                </div>

                {/* Sidebar + Main Inspector Layout */}
                <div style={{ display: "flex", minHeight: "220px" }}>
                  {/* Mini Sidebar */}
                  <div
                    style={{
                      width: "130px",
                      background: "var(--bg-2)",
                      borderRight: "1px solid var(--separator)",
                      padding: "12px 8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      fontSize: "13px",
                    }}
                  >
                    <div style={{ padding: "6px 8px", borderRadius: "6px", background: "var(--fill-2)", color: "var(--tint-text)", fontWeight: 600 }}>
                      Components
                    </div>
                    <div style={{ padding: "6px 8px", borderRadius: "6px", color: "var(--label-2)" }}>
                      Tokens
                    </div>
                    <div style={{ padding: "6px 8px", borderRadius: "6px", color: "var(--label-2)" }}>
                      Diagnostics
                    </div>
                  </div>

                  {/* Main Panel */}
                  <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        defaultValue="Buttons / Bordered Prominent"
                        readOnly
                        aria-label="Component search"
                        style={{
                          flex: 1,
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid var(--separator)",
                          background: "var(--bg)",
                          padding: "0 10px",
                          fontSize: "12px",
                          color: "var(--label)",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button type="button" className="btn btn--prominent btn--small">
                        Apply System Style
                      </button>
                      <button type="button" className="btn btn--gray btn--small">
                        Inspect
                      </button>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: "var(--bg-2)",
                        fontSize: "12px",
                        lineHeight: 1.4,
                        color: "var(--label-2)",
                      }}
                    >
                      <strong style={{ color: "var(--label)" }}>AppKit Hierarchy:</strong> NSButton, NSSplitViewController, NSToolbar.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* visionOS Mock */}
            {activePlatformId === "visionos" && (
              <div
                onPointerMove={handleSpatialMove}
                onPointerLeave={handleSpatialLeave}
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  borderRadius: "32px",
                  background: "radial-gradient(circle at 50% 20%, rgba(94, 92, 230, 0.25), rgba(10, 132, 255, 0.15), rgba(0, 0, 0, 0.8))",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  padding: "32px 24px 28px",
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.35)",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  transform: `perspective(900px) rotateY(${spatialOffset.x * 0.45}deg) rotateX(${-spatialOffset.y * 0.45}deg)`,
                  transition: "transform 200ms var(--ease-out)",
                  willChange: "transform",
                }}
              >
                <div style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8, marginBottom: "8px" }}>
                  Spatial Computing Window
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
                  Spatial Canvas
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "18px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.8)",
                    transform: `translate(${spatialOffset.x * 0.3}px, ${spatialOffset.y * 0.3}px)`,
                    transition: "transform 200ms var(--ease-out)",
                  }}
                >
                  Volumetric 3D Scene View
                </div>

                {/* Floating Bottom Ornament with 60pt Hit Targets */}
                <div
                  className="glass"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 16px",
                    borderRadius: "36px",
                    background: "rgba(255, 255, 255, 0.18)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    transform: `translate(${spatialOffset.x * 0.65}px, ${spatialOffset.y * 0.65}px)`,
                    transition: "transform 200ms var(--ease-out)",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: 0,
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Gaze Target 60pt"
                    aria-label="Previous scene"
                  >
                    &#9664;
                  </button>
                  <button
                    type="button"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: 0,
                      background: "var(--blue)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Prominent action"
                    aria-label="Play scene"
                  >
                    &#9654;
                  </button>
                  <button
                    type="button"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: 0,
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Gaze Target 60pt"
                    aria-label="Next scene"
                  >
                    &#9654;&#9654;
                  </button>
                </div>
                <span style={{ fontSize: "12px", opacity: 0.7, marginTop: "10px" }}>
                  Anchored window ornament (60pt gaze hit areas)
                </span>
              </div>
            )}

            {/* Apple Watch Mock */}
            {activePlatformId === "watchos" && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "44px",
                  background: "#000000",
                  border: "4px solid #2c2c2e",
                  padding: "24px 18px",
                  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.25)",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Watch status bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--yellow)" }}>09:41</span>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--green)" }} />
                </div>

                {/* Smart Stack Card */}
                <div
                  style={{
                    background: "#1c1c1e",
                    borderRadius: "18px",
                    padding: "12px 14px",
                    border: "1px solid #38383a",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "var(--pink)", fontWeight: 700, textTransform: "uppercase" }}>
                    Activity
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0" }}>
                    520 <span style={{ fontSize: "13px", fontWeight: 400, color: "#8e8e93" }}>CAL</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "#38383a", overflow: "hidden" }}>
                    <div style={{ width: "75%", height: "100%", background: "var(--pink)" }} />
                  </div>
                </div>

                {/* Pill Button */}
                <button
                  type="button"
                  style={{
                    width: "100%",
                    minHeight: "44px",
                    borderRadius: "22px",
                    border: 0,
                    background: "var(--green)",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  Start Workout
                </button>

                <div
                  style={{
                    background: "#1c1c1e",
                    borderRadius: "16px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#8e8e93",
                    textAlign: "center",
                  }}
                >
                  Turn Digital Crown for Smart Stack
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
