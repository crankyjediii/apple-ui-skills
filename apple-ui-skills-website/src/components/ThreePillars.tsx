import React from "react";

export function ThreePillars() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Three Core Pillars</span>
          <h2 className="section-title">What Apple UI Skills does</h2>
          <p className="section-subtitle">
            A unified pipeline bridging official Figma design kits, native code synthesis, and automated Human Interface Guidelines verification.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Card 1: Design */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--i": 0,
            } as React.CSSProperties}
          >
            <div>
              {/* Original CSS/SVG Illustration: Design in Figma */}
              <div
                style={{
                  height: "170px",
                  borderRadius: "var(--r-control)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--separator)",
                  padding: "16px",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Canvas header representation */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--separator)",
                    paddingBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--tint)" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--label)" }}>Canvas • 26 Series Kit</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "var(--fill-2)", color: "var(--tint-text)" }}>AutoLayout</span>
                </div>

                {/* Simulated frame with component instances */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", height: "100%", paddingTop: "10px", minWidth: 0, overflow: "hidden" }}>
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "var(--bg-3)",
                      borderRadius: "10px",
                      border: "1.5px dashed var(--tint)",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div style={{ height: "6px", width: "55%", borderRadius: "3px", background: "var(--label)" }} />
                    <div style={{ height: "18px", borderRadius: "6px", background: "var(--fill-2)", display: "flex", alignItems: "center", padding: "0 6px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--green)" }} />
                    </div>
                    <div style={{ height: "12px", width: "70%", borderRadius: "var(--r-pill)", background: "var(--tint)", opacity: 0.8 }} />
                  </div>

                  {/* Component Inspector box */}
                  <div
                    style={{
                      width: "90px",
                      background: "var(--bg-3)",
                      borderRadius: "8px",
                      border: "1px solid var(--separator)",
                      padding: "8px",
                      fontSize: "12px",
                      color: "var(--label)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "var(--label)" }}>Instance</div>
                    <div>Style: Bordered</div>
                    <div>State: Pressed</div>
                    <div>Corner: 12px</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--tint-text)" }}>01 • Design</span>
              </div>
              <h3 style={{ font: "var(--text-title-2)", marginBottom: "12px" }}>
                Design in Figma from real kit components
              </h3>
              <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", lineHeight: 1.5, marginBottom: "20px" }}>
                Compose screens inside Figma using authentic instances from Apple&apos;s Community kits. Coding agents preserve autolayout, component variants, and named styles without detaching shapes.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--separator)", paddingTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <code style={{ fontSize: "12px" }}>apple-ui-figma-build</code>
              <code style={{ fontSize: "12px" }}>Figma MCP</code>
            </div>
          </div>

          {/* Card 2: Build */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--i": 1,
            } as React.CSSProperties}
          >
            <div>
              {/* Original CSS/SVG Illustration: Code Generation */}
              <div
                style={{
                  height: "170px",
                  borderRadius: "var(--r-control)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--separator)",
                  padding: "16px",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--separator)",
                    paddingBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--indigo)" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--label)" }}>SwiftUI & Next.js Generator</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "var(--fill-2)", color: "var(--indigo-text)" }}>Type-checked</span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    lineHeight: 1.5,
                    color: "var(--label)",
                    background: "var(--bg-3)",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--separator)",
                    marginTop: "8px",
                  }}
                >
                  <div><span style={{ color: "var(--pink-text)", fontWeight: 600 }}>struct</span> <span style={{ color: "var(--tint-text)", fontWeight: 600 }}>SettingsView</span>: View &#123;</div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "var(--purple-text)", fontWeight: 600 }}>List</span> &#123;
                    <span style={{ color: "var(--orange-text)", paddingLeft: "6px" }}>Toggle</span>(&quot;Sync&quot;)
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    &#125;.<span style={{ color: "var(--teal-text)" }}>listStyle</span>(.insetGrouped)
                  </div>
                  <div>&#125;</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--indigo-text)" }}>02 • Build</span>
              </div>
              <h3 style={{ font: "var(--text-title-2)", marginBottom: "12px" }}>
                Turn components or designs into production code
              </h3>
              <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", lineHeight: 1.5, marginBottom: "20px" }}>
                Translate kit nodes or custom screens into idiomatic SwiftUI for Apple platforms, or strict Next.js and CSS tokens for web apps, adopting Liquid Glass materials and system controls.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--separator)", paddingTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <code style={{ fontSize: "12px" }}>apple-ui-swiftui</code>
              <code style={{ fontSize: "12px" }}>apple-ui-web</code>
              <code style={{ fontSize: "12px" }}>apple-ui-figma-to-code</code>
            </div>
          </div>

          {/* Card 3: Audit */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--i": 2,
            } as React.CSSProperties}
          >
            <div>
              {/* Original CSS/SVG Illustration: Audit & Verification */}
              <div
                style={{
                  height: "170px",
                  borderRadius: "var(--r-control)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--separator)",
                  padding: "16px",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--separator)",
                    paddingBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green)" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--label)" }}>HIG Inspector • Scorecard</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "var(--fill-2)", color: "var(--green-text)" }}>0 High</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-3)", padding: "6px 10px", borderRadius: "6px", fontSize: "12px" }}>
                    <span style={{ color: "var(--label)" }}>Liquid Glass on controls</span>
                    <span style={{ color: "var(--green-text)", fontWeight: 700 }}>Pass</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-3)", padding: "6px 10px", borderRadius: "6px", fontSize: "12px" }}>
                    <span style={{ color: "var(--label)" }}>Hit Targets ≥ 44pt</span>
                    <span style={{ color: "var(--green-text)", fontWeight: 700 }}>Pass</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-3)", padding: "6px 10px", borderRadius: "6px", fontSize: "12px" }}>
                    <span style={{ color: "var(--label)" }}>Semantic Color Contrast</span>
                    <span style={{ color: "var(--green-text)", fontWeight: 700 }}>AA Pass</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green-text)" }}>03 • Audit</span>
              </div>
              <h3 style={{ font: "var(--text-title-2)", marginBottom: "12px" }}>
                Audit existing UI against kits and HIG
              </h3>
              <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", lineHeight: 1.5, marginBottom: "20px" }}>
                Critique interfaces systematically. Flag where custom elements should use native system controls, catch misplaced glass materials on content, and enforce strict accessibility standards.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--separator)", paddingTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <code style={{ fontSize: "12px" }}>apple-ui-audit</code>
              <code style={{ fontSize: "12px" }}>HIG Checklist</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
