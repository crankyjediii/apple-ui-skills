import React from "react";
import { FAQS } from "@/data/faq";
import { ExternalLinkIcon } from "./Icons";

export function FaqSection() {
  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header">
          <span className="section-eyebrow">Frequently Asked Questions</span>
          <h2 className="section-title">Everything you need to know</h2>
          <p className="section-subtitle">
            Licensing, kit fidelity, web approximations, and how to get involved.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              data-reveal
              className="card-content"
              style={{
                borderRadius: "var(--r-card)",
                background: "var(--bg-3)",
                border: "1px solid var(--separator)",
                overflow: "hidden",
                transition: "box-shadow 200ms ease",
                "--i": idx,
              } as React.CSSProperties}
            >
              <summary
                style={{
                  padding: "20px 24px",
                  font: "var(--text-headline)",
                  fontSize: "17px",
                  color: "var(--label)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  userSelect: "none",
                  listStyle: "none",
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "var(--label-2)",
                    marginLeft: "16px",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div
                style={{
                  padding: "0 24px 22px",
                  borderTop: "1px solid var(--separator)",
                  paddingTop: "16px",
                }}
              >
                <p
                  style={{
                    font: "var(--text-body)",
                    color: "var(--label-2)",
                    lineHeight: 1.55,
                    marginBottom: faq.moreLink ? "12px" : 0,
                  }}
                >
                  {faq.answer}
                </p>

                {faq.moreLink && (
                  <a
                    href={faq.moreLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--tint)",
                    }}
                  >
                    <span>{faq.moreLink.text}</span>
                    <ExternalLinkIcon size={14} />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
