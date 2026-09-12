// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(cleanup);

describe("portfolio copy", () => {
  it("keeps the approved recruiter-facing hero and project copy", () => {
    render(<App />);

    expect(screen.getByText("Open to remote opportunities")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Competitive bids\.\s*Clear ownership\./ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Operational improvements\s*that compound\./ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Field-informed leadership." })).toBeTruthy();
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
