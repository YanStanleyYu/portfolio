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
    const impact = document.querySelector<HTMLElement>(".impact-section");
    const projects = document.querySelector<HTMLElement>(".projects-section");
    const systems = document.querySelector<HTMLElement>(".systems-section");
    const experience = document.querySelector<HTMLElement>(".experience-section");
    const contact = document.querySelector<HTMLElement>(".contact-section");

    if (
      !hero || !header || !eyebrow || !actions || !availability ||
      !impact || !projects || !systems || !experience || !contact
    ) {
      throw new Error("Responsive layout elements were not found");
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
      sectionPadding: {
        impact: getComputedStyle(impact).padding,
        projects: getComputedStyle(projects).padding,
        systems: getComputedStyle(systems).padding,
        experience: getComputedStyle(experience).padding,
        contact: getComputedStyle(contact).padding,
      },
      availabilityPosition: getComputedStyle(availability).position,
      actionAvailabilityGap: availabilityRect.top - actionsRect.bottom,
      availabilityContained: availabilityRect.bottom <= heroRect.bottom,
      topGap: eyebrowRect.top - headerRect.bottom,
      bottomGap: heroRect.bottom - actionsRect.bottom,
    };
  });

  expect(layout.horizontalOverflow).toBe(false);
  expect(layout.headerPosition).toBe("sticky");

  if (layout.viewportWidth <= 620) {
    expect(layout.sectionPadding).toEqual({
      impact: "56px 24px",
      projects: "80px 24px",
      systems: "80px 24px",
      experience: "80px 24px",
      contact: "48px 24px",
    });
  } else if (layout.viewportWidth <= 760) {
    expect(layout.sectionPadding).toEqual({
      impact: "64px 24px",
      projects: "96px 24px",
      systems: "96px 24px",
      experience: "96px 24px",
      contact: "48px 24px",
    });
  } else {
    expect(layout.sectionPadding).toEqual({
      impact: "64px 32px",
      projects: "128px 32px",
      systems: "128px 32px",
      experience: "128px 32px",
      contact: "48px 32px",
    });
  }

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

test("aligns bookmark targets beneath the sticky header", async ({ page }) => {
  await page.goto("/");

  await page.locator('.site-header a[href="#projects"]').evaluate((link) =>
    (link as HTMLAnchorElement).click(),
  );

  await expect.poll(async () => page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const target = document.querySelector<HTMLElement>("#projects");

    if (!header || !target) {
      throw new Error("Sticky header or bookmark target was not found");
    }

    return Math.abs(target.getBoundingClientRect().top - header.getBoundingClientRect().bottom);
  })).toBeLessThan(2);
});

test("links section reveal progress to its viewport position", async ({ page }) => {
  await page.goto("/");

  const setSectionTop = async (viewportRatio: number) => {
    await page.locator("#projects").evaluate((section, ratio) => {
      let documentTop = 0;
      let current: HTMLElement | null = section as HTMLElement;

      while (current) {
        documentTop += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, documentTop - window.innerHeight * ratio);
    }, viewportRatio);
    await page.evaluate(() => new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    ));
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

test("does not update reveal state without a real scroll change", async ({ page }) => {
  await page.goto("/");
  const impact = page.locator("#impact");

  await impact.evaluate((section) => {
    let documentTop = 0;
    let current: HTMLElement | null = section as HTMLElement;

    while (current) {
      documentTop += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, documentTop - window.innerHeight * 0.5);
  });
  await expect(impact).toHaveAttribute("data-scroll-state", "visible");
  await page.waitForTimeout(100);

  await impact.evaluate((section) => {
    section.dataset.scrollState = "stationary";
    section.style.setProperty("--reveal-progress", "0.321");
    window.dispatchEvent(new Event("scroll"));
  });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  await expect(impact).toHaveAttribute("data-scroll-state", "stationary");
  await expect(impact).toHaveCSS("--reveal-progress", "0.321");

  await page.evaluate(() => window.scrollBy(0, 1));
  await expect(impact).not.toHaveAttribute("data-scroll-state", "stationary");
});

test("keeps the Impact heading visible at the bottom of a tall viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");

  await page.setViewportSize({ width: 1173, height: 979 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  const impactState = await page.locator("#impact").evaluate((section) => {
    const heading = section.querySelector<HTMLElement>(".section-intro");

    if (!heading) {
      throw new Error("Impact heading was not found");
    }

    return {
      containerOpacity: Number(getComputedStyle(section).opacity),
      contentOpacity: Number(getComputedStyle(heading).opacity),
      riseOffset: Math.abs(Number(section.style.getPropertyValue("--reveal-y").replace("rem", ""))),
      headingTop: heading.getBoundingClientRect().top,
      viewportHeight: window.innerHeight,
    };
  });

  expect(impactState.containerOpacity).toBe(1);
  expect(impactState.contentOpacity).toBeGreaterThanOrEqual(0.18);
  expect(impactState.riseOffset).toBeLessThanOrEqual(1);
  expect(impactState.headingTop).toBeLessThan(impactState.viewportHeight);
});

test("animates content without moving or fading section backgrounds", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const expectedBackgrounds = {
    projects: "rgb(7, 22, 36)",
    systems: "rgb(255, 255, 255)",
    experience: "rgb(244, 247, 248)",
  } as const;

  for (const [sectionId, expectedBackground] of Object.entries(expectedBackgrounds)) {
    const section = page.locator(`#${sectionId}`);

    await section.evaluate((element) => {
      let documentTop = 0;
      let current: HTMLElement | null = element as HTMLElement;

      while (current) {
        documentTop += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, documentTop - window.innerHeight * 0.625);
    });
    await page.evaluate(() => new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    ));
    await page.waitForTimeout(600);

    const appearance = await section.evaluate((element) => {
      const sectionStyle = getComputedStyle(element);
      const content = element.firstElementChild;

      if (!content) {
        throw new Error("Animated section content was not found");
      }

      const contentStyle = getComputedStyle(content);

      return {
        background: sectionStyle.backgroundColor,
        borderWidth: sectionStyle.borderWidth,
        outlineStyle: sectionStyle.outlineStyle,
        containerOpacity: Number(sectionStyle.opacity),
        containerTransform: sectionStyle.transform,
        contentOpacity: Number(contentStyle.opacity),
        contentTransform: contentStyle.transform,
        progress: Number((element as HTMLElement).style.getPropertyValue("--reveal-progress")),
      };
    });

    expect(appearance.background).toBe(expectedBackground);
    expect(appearance.borderWidth).toBe("0px");
    expect(appearance.outlineStyle).toBe("none");
    expect(appearance.containerOpacity).toBe(1);
    expect(appearance.containerTransform).toBe("none");
    expect(appearance.contentOpacity).toBeGreaterThan(0.18);
    expect(appearance.contentOpacity).toBeLessThan(1);
    expect(appearance.contentTransform).not.toBe("none");
    expect(appearance.progress).toBeCloseTo(0.5, 1);
  }
});
