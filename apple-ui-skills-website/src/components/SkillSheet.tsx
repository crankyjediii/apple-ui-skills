"use client";

import React, { useEffect, useRef } from "react";
import { SkillItem } from "@/data/skills";
import { CloseIcon, TerminalIcon } from "./Icons";
import { CopyButton } from "./CopyButton";

interface SkillSheetProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export function SkillSheet({ skill, onClose }: SkillSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (skill) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [skill]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!skill) return null;

  const selectiveCommand = `npx skills add crankyjediii/apple-ui-skills --skill ${skill.id}`;

  return (
    <dialog
      ref={dialogRef}
      className="sheet"
      onClick={handleBackdropClick}
      onClose={onClose}
      aria-labelledby="sheet-title"
      aria-describedby="sheet-desc"
    >
      <div className="grabber" aria-hidden="true" onClick={onClose} />

      {/* Header with Title and Close button */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--tint-text)",
              display: "inline-block",
              marginBottom: "4px",
            }}
          >
            {skill.category}
          </span>
          <h2
            id="sheet-title"
            style={{
              font: "var(--text-title-2)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <code>{skill.name}</code>
          </h2>
        </div>

        <button
          type="button"
          className="btn btn--gray btn--small"
          onClick={onClose}
          aria-label="Close sheet dialog"
          style={{ width: "44px", height: "44px", minWidth: "44px", minHeight: "44px", padding: 0 }}
        >
          <CloseIcon size={16} />
        </button>
      </div>

      <p
        id="sheet-desc"
        style={{
          font: "var(--text-body)",
          color: "var(--label)",
          lineHeight: 1.5,
          marginBottom: "20px",
        }}
      >
        {skill.description}
      </p>

      {/* When to use block */}
      <div
        style={{
          padding: "14px 16px",
          borderRadius: "var(--r-control)",
          background: "var(--bg-3)",
          border: "1px solid var(--separator)",
          marginBottom: "16px",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--label-2)", marginBottom: "4px" }}>
          When to use
        </div>
        <p style={{ font: "var(--text-subheadline)", color: "var(--label)", margin: 0 }}>
          {skill.whenToUse}
        </p>
      </div>

      {/* Routing details */}
      <div
        style={{
          padding: "14px 16px",
          borderRadius: "var(--r-control)",
          background: "var(--bg-3)",
          border: "1px solid var(--separator)",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--label-2)", marginBottom: "4px" }}>
          Route & Workflow
        </div>
        <p style={{ font: "var(--text-subheadline)", color: "var(--label)", margin: 0 }}>
          {skill.routeInfo}
        </p>
      </div>

      {/* Sample prompt for this skill */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--label-2)", marginBottom: "6px" }}>
          Try this prompt with your agent
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-3)",
            border: "1px solid var(--separator)",
            borderRadius: "var(--r-control)",
            padding: "10px 14px",
            gap: "12px",
          }}
        >
          <span style={{ font: "var(--text-subheadline)", color: "var(--tint)", fontStyle: "italic" }}>
            &ldquo;{skill.samplePrompt}&rdquo;
          </span>
          <CopyButton text={skill.samplePrompt} size="small" variant="gray" />
        </div>
      </div>

      {/* Install command for just this skill */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--label-2)", marginBottom: "6px" }}>
          Install only this skill
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-3)",
            border: "1px solid var(--separator)",
            borderRadius: "var(--r-control)",
            padding: "8px 12px",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
            <TerminalIcon size={16} style={{ color: "var(--tint)", flexShrink: 0 }} />
            <code style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selectiveCommand}
            </code>
          </div>
          <CopyButton text={selectiveCommand} size="small" variant="tinted" />
        </div>
      </div>

      <button
        type="button"
        className="btn btn--prominent"
        onClick={onClose}
        style={{ width: "100%" }}
      >
        Done
      </button>
    </dialog>
  );
}
