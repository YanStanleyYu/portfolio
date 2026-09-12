// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { appStyleText, viewport } from "./appStyles";
import { globalStyleText } from "./globalStyles";
import { getScrollDirection } from "./useScrollReveal";

afterEach(cleanup);

describe("portfolio copy", () => {
  it("keeps the approved recruiter-facing hero and project copy", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Certainty in every estimate. Confidence in every Build." })).toBeTruthy();
    expect(screen.getByText("Open to remote opportunities")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Competitive bids\.\s*Clear ownership\./ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Operational improvements\s*that compound\./ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Field-informed leadership." })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Director of Preconstruction & Operations" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Senior Preconstruction Manager & Estimator" })).toBeTruthy();
    expect(screen.getByText(/Multilingual preconstruction and operations leader/)).toBeTruthy();
    expect(screen.getByText(/reported efficiency gain of about 75%/)).toBeTruthy();
    expect(screen.getByText("Preconstruction Director")).toBeTruthy();
    expect(screen.getByText("Director of Preconstruction & Estimating")).toBeTruthy();
    expect(screen.getByText("Chief Estimator", { selector: ".target-roles span" })).toBeTruthy();
    expect(screen.getByText("Director of Operations / General Manager")).toBeTruthy();
    expect(screen.queryByText("Accountable handoffs.")).toBeNull();
  });
});

describe("portfolio navigation", () => {
  it("links primary actions to their intended destinations", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Impact" }).getAttribute("href")).toBe("#impact");
    expect(screen.getByRole("link", { name: "Projects" }).getAttribute("href")).toBe("#projects");
    expect(screen.getByRole("link", { name: "Experience" }).getAttribute("href")).toBe("#experience");
    expect(screen.getByRole("link", { name: /View selected work/ }).getAttribute("href")).toBe("#projects");
    expect(screen.getByRole("link", { name: "Discuss an opportunity" }).getAttribute("href")).toBe("mailto:stanleyu9898@gmail.com");
    expect(screen.getByRole("link", { name: "770-886-9898" }).getAttribute("href")).toBe("tel:+17708869898");
  });
});

describe("responsive styling", () => {
  it("keeps styles in TypeScript with rem-based tablet and contact values", () => {
    expect(viewport.tablet).toBe("47.5rem");
    expect(appStyleText).toMatch(/\.contact-section\s*\{\s*padding:\s*3rem 2rem;/);
    expect(appStyleText).toMatch(/@media\s*\(max-width:\s*47\.5rem\)/);
    expect(appStyleText).toMatch(/\.contact-section\s*\{\s*padding:\s*3rem 1\.5rem;/);
    expect(appStyleText).not.toMatch(/\dpx\b/);
  });

  it("prevents horizontal overflow at every viewport width", () => {
    expect(globalStyleText).toMatch(/html\s*\{[^}]*max-width:\s*100%;[^}]*overflow-x:\s*clip;/s);
    expect(globalStyleText).toMatch(/body\s*\{[^}]*min-width:\s*0;[^}]*overflow-x:\s*clip;/s);
    expect(globalStyleText).toMatch(/#root\s*\{[^}]*overflow-x:\s*clip;/s);
    expect(appStyleText).toContain("main, main > section { width: 100%; max-width: 100%; overflow-x: clip; }");
    expect(appStyleText).toContain(".contact-main > * { min-width: 0; }");
  });
});

describe("section reveal animation", () => {
  it("resolves both downward and upward scroll directions", () => {
    expect(getScrollDirection(100, 160, "up")).toBe("down");
    expect(getScrollDirection(160, 100, "down")).toBe("up");
  });

  it("gives every adjacent section a different reveal", () => {
    const { container } = render(<App />);
    const variants = Array.from(container.querySelectorAll<HTMLElement>("main > section"))
      .map((section) => section.dataset.scrollReveal);

    expect(variants).toHaveLength(6);
    variants.slice(1).forEach((variant, index) => {
      expect(variant).not.toBe(variants[index]);
    });
    expect(appStyleText).toContain('[data-scroll-direction="down"]');
    expect(appStyleText).toContain('[data-scroll-direction="up"]');
    expect(appStyleText).toContain("opacity .42s cubic-bezier(.2, .8, .2, 1)");
  });

  it("animates hero content on initial page load", () => {
    expect(appStyleText).toContain("@keyframes hero-text-in");
    expect(appStyleText).toContain("animation: hero-text-in .42s cubic-bezier(.2, .8, .2, 1) forwards");
    expect(appStyleText).toContain(".availability { animation-delay: .32s; }");
    expect(appStyleText).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*animation:\s*none;/);
  });
});
