import { useEffect } from "react";

export type ScrollDirection = "down" | "up";

export const revealViewportRange = {
  hiddenBoundary: 0.25,
  fullBoundary: 0.5,
} as const;

export const revealMotion = {
  minimumOpacity: 0.18,
  riseDistance: 3,
  impactRiseDistance: 1,
} as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function getScrollDirection(
  previousPosition: number,
  currentPosition: number,
  currentDirection: ScrollDirection,
): ScrollDirection {
  if (currentPosition === previousPosition) {
    return currentDirection;
  }

  return currentPosition > previousPosition ? "down" : "up";
}

export function getRevealProgress(
  sectionTop: number,
  sectionBottom: number,
  viewportHeight: number,
) {
  if (viewportHeight <= 0) {
    return 1;
  }

  const hiddenLine = viewportHeight * revealViewportRange.hiddenBoundary;
  const fullLine = viewportHeight * revealViewportRange.fullBoundary;
  const revealDistance = fullLine - hiddenLine;
  const enteringProgress = clamp((viewportHeight - hiddenLine - sectionTop) / revealDistance);
  const leavingProgress = clamp((sectionBottom - hiddenLine) / revealDistance);

  return Math.min(enteringProgress, leavingProgress);
}

export function getRevealOpacity(progress: number) {
  const boundedProgress = clamp(progress);

  return revealMotion.minimumOpacity + (1 - revealMotion.minimumOpacity) * boundedProgress;
}

function getStableBounds(section: HTMLElement) {
  let documentTop = 0;
  let current: HTMLElement | null = section;

  while (current) {
    documentTop += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  const top = documentTop - window.scrollY;

  return {
    top,
    bottom: top + section.offsetHeight,
    height: section.offsetHeight,
  };
}

function setRevealMotion(section: HTMLElement, progress: number, direction: ScrollDirection) {
  const roundedProgress = Number(progress.toFixed(3));
  const distance = 1 - roundedProgress;
  const opacity = getRevealOpacity(roundedProgress);
  const variant = section.dataset.scrollReveal;
  let x = 0;
  let y = 0;
  let scale = 1;

  if (variant === "rise") {
    const riseDistance = section.classList.contains("impact-section")
      ? revealMotion.impactRiseDistance
      : revealMotion.riseDistance;
    y = (direction === "down" ? riseDistance : -riseDistance) * distance;
  } else if (variant === "slide-left") {
    x = (direction === "down" ? -2.5 : 2.5) * distance;
  } else if (variant === "slide-right") {
    x = (direction === "down" ? 2.5 : -2.5) * distance;
  } else if (variant === "scale") {
    scale = 1 + (direction === "down" ? -0.04 : 0.04) * distance;
  }

  section.dataset.scrollDirection = direction;
  section.dataset.scrollState =
    roundedProgress >= 1 ? "visible" : roundedProgress <= 0 ? "hidden" : "revealing";
  section.style.setProperty("--reveal-progress", roundedProgress.toFixed(3));
  section.style.setProperty("--reveal-opacity", opacity.toFixed(3));
  section.style.setProperty("--reveal-x", `${x.toFixed(3)}rem`);
  section.style.setProperty("--reveal-y", `${y.toFixed(3)}rem`);
  section.style.setProperty("--reveal-scale", scale.toFixed(3));
}

export function useScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));

    if (sections.length === 0) {
      return;
    }

    document.documentElement.classList.add("scroll-reveal-ready");

    let animationFrame = 0;
    let previousPosition = window.scrollY;
    let scrollDirection: ScrollDirection = "down";

    const updateSections = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * revealViewportRange.fullBoundary;

      sections.forEach((section) => {
        const bounds = getStableBounds(section);
        const progress = getRevealProgress(bounds.top, bounds.bottom, viewportHeight);
        const locationDirection: ScrollDirection =
          bounds.top + bounds.height / 2 >= viewportCenter ? "down" : "up";

        setRevealMotion(section, progress, progress < 1 ? locationDirection : scrollDirection);
      });

      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateSections);
      }
    };

    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition === previousPosition) {
        return;
      }

      scrollDirection = getScrollDirection(previousPosition, currentPosition, scrollDirection);
      previousPosition = currentPosition;
      scheduleUpdate();
    };

    updateSections();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleUpdate);
      document.documentElement.classList.remove("scroll-reveal-ready");
    };
  }, []);
}
