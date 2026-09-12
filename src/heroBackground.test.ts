import { describe, expect, it } from "vitest";

import { appStyleText } from "./appStyles";

describe("hero background", () => {
  it("uses a faded commercial glazing photograph", () => {
    expect(appStyleText).toContain('url("/portfolio/assets/commercial-glazing-hero-v2.jpg")');
    expect(appStyleText).toContain("linear-gradient(90deg, rgba(7,22,36,.96)");
  });
});
