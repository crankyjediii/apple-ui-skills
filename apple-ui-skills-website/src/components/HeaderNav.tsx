"use client";

import React, { useState } from "react";
import { PROJECT } from "@/data/project";
import { GitHubIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Platforms", href: "#platforms" },
    { label: "Playground", href: "#playground" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "13 Skills", href: "#skills" },
    { label: "Prompts", href: "#prompts" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: "12px",
        zIndex: 100,
        padding: "0 16px",
        margin: "0 auto",
        maxWidth: "1120px",
      }}
    >
      <nav
        className="glass"
        aria-label="Main Navigation"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderRadius: "var(--r-pill)",
          transition: "background var(--dur) var(--ease-spring)",
        }}
      >
        {/* Brand */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "var(--label)",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "17px",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--blue), var(--indigo))",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
            }}
            aria-hidden="true"
          />
          <span className="brand-title">{PROJECT.name}</span>
          <span
            className="brand-badge"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "var(--r-pill)",
              background: "var(--fill-2)",
              color: "var(--tint-text)",
            }}
          >
            v{PROJECT.version}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 14px",
                borderRadius: "var(--r-pill)",
                color: "var(--label-2)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 150ms ease, background 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--label)";
                e.currentTarget.style.backgroundColor = "var(--fill-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--label-2)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ThemeToggle />

          <a
            href={PROJECT.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--prominent btn--small desktop-github-btn"
            style={{ textDecoration: "none" }}
            aria-label="View Apple UI Skills on GitHub"
          >
            <GitHubIcon size={16} />
            <span className="github-btn-text">GitHub</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-menu-btn btn btn--gray btn--small"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              width: "44px",
              height: "44px",
              padding: 0,
              display: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          className="glass"
          style={{
            marginTop: "8px",
            padding: "16px",
            borderRadius: "var(--r-card)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--r-control)",
                color: "var(--label)",
                fontSize: "16px",
                fontWeight: 500,
                textDecoration: "none",
                background: "var(--fill-2)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
