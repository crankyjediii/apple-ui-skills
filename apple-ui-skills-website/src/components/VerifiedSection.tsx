import React from "react";
import { PROOF_POINTS, HONEST_LIMITS } from "@/data/project";
import { CheckIcon } from "./Icons";

export function VerifiedSection() {
  return (
    <section id="verified" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Verified & Tested</span>
          <h2 className="section-title">Tested in CI, transparent limits</h2>
          <p className="section-subtitle">
            Every snippet is tested against real compilers and live Figma specifications. Transparent boundaries ensure you stay within Apple&apos;s license.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left: Proof Points as a Grouped Inset List */}
          <div data-reveal style={{ "--i": 0 } as React.CSSProperties}>
            <h3 style={{ font: "var(--text-title-2)", marginBottom: "8px" }}>
              Technical Proof Points
            </h3>
            <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "20px" }}>
              Continuous testing and verification against Xcode 26 SDKs and live Figma Community files:
            </p>

            {/* Inset Grouped List Recipe from apple-ui-web */}
            <ul className="list" style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)" }}>
              {PROOF_POINTS.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "16px 20px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "color-mix(in srgb, var(--green) 15%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <CheckIcon size={14} style={{ color: "var(--green)" }} />
                  </div>
                  <div>
                    <h4 style={{ font: "var(--text-headline)", margin: "0 0 4px", color: "var(--label)" }}>
                      {item.title}
                    </h4>
                    <p style={{ font: "var(--text-footnote)", color: "var(--label-2)", margin: 0, lineHeight: 1.45 }}>
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Honest Limits (Trust & Licensing) */}
          <div
            data-reveal
            className="card-content"
            style={{
              padding: "32px 28px",
              background: "var(--bg-2)",
              border: "1px solid var(--separator)",
              "--i": 1,
            } as React.CSSProperties}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--orange)",
                }}
              >
                Trust & Boundaries
              </span>
            </div>

            <h3 style={{ font: "var(--text-title-2)", marginBottom: "8px" }}>
              Honest Limits
            </h3>
            <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "24px", lineHeight: 1.5 }}>
              Transparent guardrails keep your project legally sound and within Apple&apos;s license terms:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {HONEST_LIMITS.map((limit, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-3)",
                    borderRadius: "var(--r-control)",
                    padding: "16px 18px",
                    border: "1px solid var(--separator)",
                  }}
                >
                  <h4 style={{ font: "var(--text-headline)", margin: "0 0 6px", color: "var(--label)" }}>
                    {limit.title}
                  </h4>
                  <p style={{ font: "var(--text-footnote)", color: "var(--label-2)", margin: 0, lineHeight: 1.45 }}>
                    {limit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
