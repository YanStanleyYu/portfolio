import { expect, test } from "@playwright/test";

test("matches the approved responsive portfolio", async ({ page }, testInfo) => {
  await page.goto("/portfolio/");
  await page.evaluate(async () => document.fonts.ready);

  const layout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const header = document.querySelector<HTMLElement>(".site-header");
    const eyebrow = document.querySelector<HTMLElement>(".eyebrow");
    const actions = document.querySelector<HTMLElement>(".hero-actions");
    const availability = document.querySelector<HTMLElement>(".availability");

    if (!hero || !header || !eyebrow || !actions || !availability) {
      throw new Error("Hero layout elements were not found");
    }

    const heroRect = hero.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const eyebrowRect = eyebrow.getBoundingClientRect();
    const actionsRect = actions.getBoundingClientRect();
    const availabilityRect = availability.getBoundingClientRect();

    return {
      viewportWidth: window.innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      availabilityPosition: getComputedStyle(availability).position,
      actionAvailabilityGap: availabilityRect.top - actionsRect.bottom,
      availabilityContained: availabilityRect.bottom <= heroRect.bottom,
      topGap: eyebrowRect.top - headerRect.bottom,
      bottomGap: heroRect.bottom - actionsRect.bottom,
    };
  });

  expect(layout.horizontalOverflow).toBe(false);

  if (layout.viewportWidth <= 760) {
    expect(layout.availabilityPosition).toBe("static");
    expect(Math.abs(layout.actionAvailabilityGap - 32)).toBeLessThan(2);
    expect(layout.availabilityContained).toBe(true);
  } else {
    expect(layout.availabilityPosition).toBe("absolute");
    expect(Math.abs(layout.topGap - layout.bottomGap)).toBeLessThan(1);
  }

  await expect(page).toHaveScreenshot("portfolio.png", {
    animations: "disabled",
    fullPage: false,
    maxDiffPixelRatio: testInfo.project.name === "mobile" ? 0.1 : 0.08,
    threshold: 0.3,
  });

  expect(testInfo.errors).toHaveLength(0);
});
