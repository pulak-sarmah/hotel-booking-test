import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to register", async ({ page }) => {
  await page.goto(`${UI_URL}UserRegister`);

  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  const timestamp = Date.now();
  const email = `john${timestamp}@doe.com`;

  await page.locator("[name=firstName]").fill("John");
  await page.locator("[name=lastName]").fill("Doe");
  await page.locator("[name=email]").fill(email);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.locator('button[type="submit"]').click();

  await expect(page.getByText("Account created successfully")).toBeVisible();

  expect(page.url()).toBe(`${UI_URL}`);
});

test("should allow the user to sign-In", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "LogIn To Your Account" })
  ).toBeVisible();

  await page.locator("[name=email]").fill("john1707122971532@doe.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Account logged in successfully")).toBeVisible();

  expect(page.url()).toBe(`${UI_URL}`);
});

test("should allow the user to log out", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await page.locator("[name=email]").fill("john1707122971532@doe.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Account logged in successfully")).toBeVisible();

  await page.waitForTimeout(3000);

  await page.click('[data-testid="user-icon"]');

  await page.waitForTimeout(2000);

  await page.click('text="Log Out"');

  await expect(page.locator('text="Sign In"')).toBeVisible();
});

test("should allow the user to update profile", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await page.locator("[name=email]").fill("john1707122971532@doe.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Account logged in successfully")).toBeVisible();

  await page.click('[data-testid="user-icon"]');

  await page.waitForTimeout(2000);

  await page.click('text="Update Profile"');

  await expect(page.getByText("Update Profile Details")).toBeVisible();

  await page.locator("[name=email]").fill("john1707122971532@doe.com");

  await page.getByRole("button", { name: "Update Profile" }).click();

  await page.waitForTimeout(2000);

  expect(page.url()).toBe(`${UI_URL}`);
});
