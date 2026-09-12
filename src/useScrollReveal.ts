import { useEffect } from "react";

export type ScrollDirection = "down" | "up";

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

export function useScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));

    if (sections.length === 0) {
      return;
    }

    document.documentElement.classList.add("scroll-reveal-ready");

    let previousPosition = window.scrollY;
    let direction: ScrollDirection = "down";

    sections.forEach((section) => {
      section.dataset.scrollDirection = direction;
      section.dataset.scrollState = "hidden";
    });

    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const nextDirection = getScrollDirection(previousPosition, currentPosition, direction);

      if (nextDirection !== direction) {
        direction = nextDirection;
        sections.forEach((section) => {
          if (section.dataset.scrollState !== "visible") {
            section.dataset.scrollDirection = direction;
          }
        });
      }

      previousPosition = currentPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.dataset.scrollState = "visible";
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        document.documentElement.classList.remove("scroll-reveal-ready");
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          section.dataset.scrollDirection = direction;
          section.dataset.scrollState = "visible";
        } else {
          section.dataset.scrollState = "hidden";
        }
      });
    }, {
      rootMargin: "0%",
      threshold: 0.01,
    });

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("scroll-reveal-ready");
    };
  }, []);
}
