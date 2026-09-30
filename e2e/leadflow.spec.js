import { test, expect } from "@playwright/test";

test.describe("LeadFlow Primary User Journey", () => {
  test("user explores value proposition and starts interactive qualification flow", async ({
    page,
  }) => {
    // 1. Visit the home landing page
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /I build LeadFlow so small Kenyan real estate businesses/i,
      })
    ).toBeVisible();

    // 2. Navigate to case study
    const caseStudyLink = page.getByRole("link", { name: /Read the case study/i });
    await expect(caseStudyLink).toBeVisible();
    await caseStudyLink.click();
    await expect(page).toHaveURL(/.*case-study/);

    // 3. Navigate to live lead chat demo
    await page.goto("/demo/lead-chat");
    await expect(
      page.getByRole("heading", { name: /Lead Qualification Chat/i })
    ).toBeVisible();

    // 4. Click an onboarding starter prompt
    const promptButton = page.getByRole("button", {
      name: /I'm looking to buy a 2-bedroom in the next few months/i,
    });
    await expect(promptButton).toBeVisible();
    await promptButton.click();

    // 5. Verify the textarea is populated with the selected prompt
    const textarea = page.getByPlaceholder("Type a message...");
    await expect(textarea).toHaveValue(
      "I'm looking to buy a 2-bedroom in the next few months"
    );

    // 6. Verify send button is active and enabled
    const sendButton = page.getByRole("button", { name: "Send" });
    await expect(sendButton).toBeEnabled();
  });
});
