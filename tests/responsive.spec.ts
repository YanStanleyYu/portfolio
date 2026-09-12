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
      headerPosition: getComputedStyle(header).position,
      availabilityPosition: getComputedStyle(availability).position,
      actionAvailabilityGap: availabilityRect.top - actionsRect.bottom,
      availabilityContained: availabilityRect.bottom <= heroRect.bottom,
      topGap: eyebrowRect.top - headerRect.bottom,
      bottomGap: heroRect.bottom - actionsRect.bottom,
    };
  });

  expect(layout.horizontalOverflow).toBe(false);
  expect(layout.headerPosition).toBe("sticky");

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

  await page.evaluate(() => window.scrollTo(0, 1000));
  const stickyHeader = await page.locator(".site-header").boundingBox();
  expect(stickyHeader?.y).toBe(0);

  expect(testInfo.errors).toHaveLength(0);
});

test("links section reveal progress to its viewport position", async ({ page }) => {
  await page.goto("/");

  const setSectionTop = async (viewportRatio: number) => {
    await page.locator("#projects").evaluate((section, ratio) => {
      const documentTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, documentTop - window.innerHeight * ratio);
    }, viewportRatio);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    return page.locator("#projects").evaluate((section) =>
      Number(section.style.getPropertyValue("--reveal-progress")),
    );
  };

  expect(await setSectionTop(0.75)).toBeCloseTo(0, 1);
  expect(await setSectionTop(0.625)).toBeCloseTo(0.5, 1);
  expect(await setSectionTop(0.5)).toBeCloseTo(1, 1);
  expect(await setSectionTop(0.625)).toBeCloseTo(0.5, 1);
  expect(await setSectionTop(0.75)).toBeCloseTo(0, 1);
});
