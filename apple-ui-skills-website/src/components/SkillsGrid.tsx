"use client";

import React, { useState } from "react";
import { SKILLS, SkillItem, PLUGIN_EXTRAS } from "@/data/skills";
import { SkillSheet } from "./SkillSheet";
import { ChevronRightIcon, SparklesIcon } from "./Icons";

export function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Setup & Core", "Platform Kits", "Figma & Design", "Code Implementation", "Quality & Audit"];

  const filteredSkills =
    selectedCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Modular Architecture</span>
          <h2 className="section-title">The 13 skills in the kit</h2>
          <p className="section-subtitle">
            Install all 12 at once or mix and match the exact skills needed for your platform, design workflow, or code stack.
          </p>
        </div>

        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn--small ${selectedCategory === cat ? "btn--prominent" : "btn--gray"}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ minHeight: "36px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 13 Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
            marginBottom: "48px",
          }}
        >
          {filteredSkills.map((skill, idx) => (
            <button
              key={skill.id}
              type="button"
              data-reveal
              className="card-content"
              onClick={() => setSelectedSkill(skill)}
              style={{
                padding: "20px 22px",
                textAlign: "left",
                cursor: "pointer",
                border: "1px solid var(--separator)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                width: "100%",
                background: "var(--bg-3)",
                "--i": idx % 4,
              } as React.CSSProperties}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--tint-text)",
                    }}
                  >
                    {skill.category}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--label-2)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Details <ChevronRightIcon size={14} />
                  </span>
                </div>

                <h3
                  style={{
                    font: "var(--text-headline)",
                    margin: "0 0 6px",
                    color: "var(--label)",
                  }}
                >
                  <code style={{ fontSize: "14px", fontWeight: 700 }}>{skill.name}</code>
                </h3>

                <p
                  style={{
                    font: "var(--text-subheadline)",
                    color: "var(--label-2)",
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {skill.oneLiner}
                </p>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "var(--tint-text)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Tap to inspect route & prompts</span>
              </div>
            </button>
          ))}
        </div>

        {/* Plugin Extras: 2 Agents & 2 Commands */}
        <div style={{ marginTop: "56px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <SparklesIcon size={18} style={{ color: "var(--purple)" }} />
            <h3 style={{ font: "var(--text-title-3)", margin: 0 }}>
              Claude Code Plugin Extras
            </h3>
          </div>
          <p style={{ font: "var(--text-subheadline)", color: "var(--label-2)", marginBottom: "20px" }}>
            When installed as a Claude Code plugin, Apple UI Skills bundles 2 specialized autonomous agents and 2 shortcut slash commands:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Agent 1 */}
            <div
              className="card-content"
              style={{
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--purple-text)", textTransform: "uppercase", marginBottom: "6px" }}>
                Agent • Implementer
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                <code>{PLUGIN_EXTRAS.agents[0].name}</code>
              </div>
              <div style={{ fontSize: "13px", color: "var(--label-2)", lineHeight: 1.45 }}>
                {PLUGIN_EXTRAS.agents[0].description}
              </div>
            </div>

            {/* Agent 2 */}
            <div
              className="card-content"
              style={{
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--purple-text)", textTransform: "uppercase", marginBottom: "6px" }}>
                Agent • Auditor
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                <code>{PLUGIN_EXTRAS.agents[1].name}</code>
              </div>
              <div style={{ fontSize: "13px", color: "var(--label-2)", lineHeight: 1.45 }}>
                {PLUGIN_EXTRAS.agents[1].description}
              </div>
            </div>

            {/* Command 1 */}
            <div
              className="card-content"
              style={{
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--teal-text)", textTransform: "uppercase", marginBottom: "6px" }}>
                Slash Command
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                <code>{PLUGIN_EXTRAS.commands[0].command}</code>
              </div>
              <div style={{ fontSize: "13px", color: "var(--label-2)", lineHeight: 1.45 }}>
                {PLUGIN_EXTRAS.commands[0].description}
              </div>
            </div>

            {/* Command 2 */}
            <div
              className="card-content"
              style={{
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--teal-text)", textTransform: "uppercase", marginBottom: "6px" }}>
                Slash Command
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                <code>{PLUGIN_EXTRAS.commands[1].command}</code>
              </div>
              <div style={{ fontSize: "13px", color: "var(--label-2)", lineHeight: 1.45 }}>
                {PLUGIN_EXTRAS.commands[1].description}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sheet for selected skill */}
        <SkillSheet skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      </div>
    </section>
  );
}
