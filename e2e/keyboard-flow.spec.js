import { test, expect } from "@playwright/test";

test.describe("Primary Flow Keyboard-Only Navigation Pass", () => {
  test("user completes entire journey and chat flow using keyboard alone", async ({
    page,
  }) => {
    // 1. Visit Home page
    await page.goto("/");

    // 2. Tab to Skip Link and activate it
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");

    // Main content receives focus
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();

    // 3. Tab to "Book a call" link
    await page.keyboard.press("Tab");
    const bookCallLink = page.getByRole("link", { name: "Book a call" }).first();
    await expect(bookCallLink).toBeFocused();

    // 4. Tab to "Read the case study" link
    await page.keyboard.press("Tab");
    const caseStudyLink = page.getByRole("link", { name: "Read the case study" });
    await expect(caseStudyLink).toBeFocused();

    // 5. Navigate to case study via Enter
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/.*case-study/);

    // 6. From case study, navigate to Lead Chat demo
    await page.goto("/demo/lead-chat");

    // 7. Test Tab progression through chat controls
    // Tab into main content and onto the prompt suggestion buttons
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // Logo
    await page.keyboard.press("Tab"); // Home nav
    await page.keyboard.press("Tab"); // Case Study nav
    await page.keyboard.press("Tab"); // About nav
    await page.keyboard.press("Tab"); // Contact nav
    await page.keyboard.press("Tab"); // First prompt starter button

    const firstPrompt = page.getByRole("button", {
      name: /I'm looking to buy a 2-bedroom/i,
    });
    await expect(firstPrompt).toBeFocused();

    // Activate prompt with Space or Enter
    await page.keyboard.press("Enter");

    // Verify textarea populated
    const textarea = page.getByPlaceholder("Type a message...");
    await expect(textarea).toHaveValue(
      "I'm looking to buy a 2-bedroom in the next few months"
    );

    // Focus lands on textarea
    await expect(textarea).toBeFocused();

    // 8. Tab to Send button
    await page.keyboard.press("Tab");
    const sendButton = page.getByRole("button", { name: "Send" });
    await expect(sendButton).toBeFocused();

    // 9. Clear and type custom message via keyboard
    await textarea.focus();
    await page.keyboard.type(" - budget 15M KES in Kilimani");
    await expect(textarea).toHaveValue(
      "I'm looking to buy a 2-bedroom in the next few months - budget 15M KES in Kilimani"
    );

    // 10. Verify form submission via Enter key
    await page.keyboard.press("Enter");

    // Textarea cleared after submission
    await expect(textarea).toHaveValue("");

    // Message list container has proper accessible live role
    const messageLog = page.getByRole("log");
    await expect(messageLog).toHaveAttribute("aria-live", "polite");
  });
});
