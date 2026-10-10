import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  snapshotPathTemplate: "{testDir}/__snapshots__/{testFilePath}/{projectName}/{arg}{ext}",
  use: {
    baseURL: "http://127.0.0.1:4173/portfolio/",
    colorScheme: "light",
    deviceScaleFactor: 1,
    locale: "en-US",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/portfolio/",
    reuseExistingServer: !process.env.CI,
  },
  // @desktop-only tests use primary navigation links hidden below desktop width,
  // or set their own desktop viewport, so they are not scheduled for smaller projects.
  projects: [
    { name: "mobile", grepInvert: /@desktop-only/, use: { viewport: { width: 375, height: 812 } } },
    { name: "tablet", grepInvert: /@desktop-only/, use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
  ],
});
