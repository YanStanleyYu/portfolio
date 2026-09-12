// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { appStyleText } from "./appStyles";
import { revealObserverOptions } from "./useScrollReveal";

describe("sticky header and reveal timing", () => {
  it("waits until sections enter the inner quarter of the viewport", () => {
    expect(revealObserverOptions).toEqual({
      rootMargin: "-25% 0% -25% 0%",
      threshold: 0.01,
    });
  });

  it("keeps the full-width header sticky and the brand prominent", () => {
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?position: sticky;/);
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?top: 0;/);
    expect(appStyleText).toMatch(/\.site-header \{[\s\S]*?background: rgba\(7,22,36,\.94\);/);
    expect(appStyleText).toMatch(/\.brand \{[\s\S]*?font-size: x-large;/);
  });
});
