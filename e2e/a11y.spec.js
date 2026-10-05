import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Lead Chat", path: "/demo/lead-chat" },
  { name: "Demo (Settings)", path: "/demo" },
  { name: "Case Study", path: "/case-study" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

test.describe("Automated Accessibility (Axe-Core / WCAG 2.1 AA / WAVE rules)", () => {
  for (const { name, path } of PAGES) {
    test(`check accessibility on ${name} (${path})`, async ({ page }) => {
      await page.goto(path);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(`\n=== Violations on ${name} (${path}) ===`);
        for (const v of accessibilityScanResults.violations) {
          console.log(`[${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes) {
            console.log(`  Target: ${node.target.join(", ")}`);
            console.log(`  Issue: ${node.failureSummary}`);
          }
        }
      }

      // Assert zero violations
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
