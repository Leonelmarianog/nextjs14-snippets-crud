import { test, expect } from "@playwright/test";

test("has 'Hello World' message", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Hello World!", exact: true })
  ).toBeVisible();
});
