import { test, expect } from "@playwright/test";

test("Has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Solitaire/);
});

test("Has heading", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Welcome to Solitaire" }),
  ).toBeVisible();
});

// // Click the get started link.
// await page.getByRole('link', { name: 'Get started' }).click();
