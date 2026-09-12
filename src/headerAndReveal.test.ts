// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { appStyleText } from "./appStyles";
import { getRevealProgress, revealViewportRange } from "./useScrollReveal";

describe("sticky header and reveal timing", () => {
  it("ties reveal progress to the inner quarter and midpoint of the viewport", () => {
    expect(revealViewportRange).toEqual({ hiddenBoundary: 0.25, fullBoundary: 0.5 });
    expect(getRevealProgress(800, 1200, 1000)).toBe(0);
    expect(getRevealProgress(750, 1150, 1000)).toBe(0);
    expect(getRevealProgress(625, 1025, 1000)).toBe(0.5);
    expect(getRevealProgress(500, 900, 1000)).toBe(1);
    expect(getRevealProgress(-25, 375, 1000)).toBe(0.5);
    expect(getRevealProgress(-150, 250, 1000)).toBe(0);
  });

  it("keeps the full-width header sticky and the brand prominent", () => {
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?position: sticky;/);
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?top: 0;/);
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?background: rgba\(7,22,36,\.94\);/);
    expect(appStyleText).toMatch(/\.brand \{[\s\S]*?font-size: x-large;/);
  });
});
