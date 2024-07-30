import { test, expect, rest } from "next/experimental/testmode/playwright/msw";

test.describe("Create snippet page", () => {
  test("As a user I should be able to see a form to create a new snippet", async ({
    page,
  }) => {
    await page.goto("/snippets/create");

    await test.step("Heading is visible", async () => {
      await expect(
        page.getByRole("heading", { level: 1, name: "Create", exact: true })
      ).toBeVisible();
    });

    await test.step("Title field is visible", async () => {
      await expect(page.getByLabel("Title", { exact: true })).toBeVisible();
    });

    await test.step("Content field is visible", async () => {
      await expect(page.getByText("Content", { exact: true })).toBeVisible();
      await expect(page.locator(".monaco-editor").nth(0)).toBeVisible();
    });

    await test.step("Submit button is visible", async () => {
      await expect(
        page.getByRole("button", { name: "Save", exact: true })
      ).toBeVisible();
      await expect(page.locator(".monaco-editor").nth(0)).toBeVisible();
    });
  });

  test("As a user I should be able to create a new snippet", async ({
    page,
    msw,
  }) => {
    msw.use(
      rest.post("http://localhost:3001/snippet", (_, res, ctx) => {
        return res(ctx.delay(2000), ctx.json({}));
      }),
      rest.get("http://localhost:3001/snippet", (_, res, ctx) => {
        return res(
          ctx.delay(2000),
          ctx.json([
            { id: 1, title: "Snippet 1", content: "Content 1" },
            { id: 2, title: "Snippet 2", content: "Content 2" },
            { id: 3, title: "Snippet 3", content: "Content 3" },
            { id: 4, title: "Snippet 4", content: "Content 4" },
          ])
        );
      })
    );

    await page.goto("/snippets/create");

    await test.step("Filling out form", async () => {
      await test.step("Filling out title", async () => {
        await page
          .getByRole("textbox", { name: "title" })
          .fill("My new snippet");
      });

      await test.step("Filling out content", async () => {
        const monacoEditor = page.locator(".monaco-editor").nth(0);
        await monacoEditor.click();
        await page.keyboard.press("Meta+KeyA");
        await page.keyboard.press("Backspace");
        await page.keyboard.press("Control+A");
        await page.keyboard.press("Backspace");
        await page.keyboard.type('Console.log("Testing with Playwright!")');
      });
    });

    await test.step("Submitting form", async () => {
      await page.getByRole("button", { name: "Save", exact: true }).click();
    });

    await test.step("Waiting for page redirection", async () => {
      await page.waitForURL("**/snippets");
    });
  });

  test("As a user I should not be able to submit an invalid form", async ({
    page,
    msw,
  }) => {
    msw.use(
      rest.post("http://localhost:3001/snippet", (_, res, ctx) => {
        return res(ctx.delay(2000), ctx.json({}));
      })
    );

    await page.goto("/snippets/create");

    await test.step("Title field should not be empty", async () => {
      await page.getByLabel("Title", { exact: true }).fill("");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await expect(
        page.getByText("Title must be at least 3 characters long")
      ).toBeVisible();
    });

    await test.step("Content field should not be empty", async () => {
      await page.getByLabel("Title", { exact: true }).fill("ABCDC");
      const monacoEditor = page.locator(".monaco-editor").nth(0);
      await monacoEditor.click();
      await page.keyboard.press("Meta+KeyA");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Backspace");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await expect(
        page.getByText("Code must be at least 10 characters long")
      ).toBeInViewport();
    });
  });

  test("As a user I should see an error message within the form if a server-side error occurs", async ({
    page,
    msw,
  }) => {
    msw.use(
      rest.post("http://localhost:3001/snippet", (_, res, ctx) => {
        return res(
          ctx.delay(2000),
          ctx.status(500),
          ctx.json({ message: "Something went wrong", status: 500 })
        );
      })
    );

    await page.goto("/snippets/create");

    await test.step("Filling out form", async () => {
      await test.step("Filling out title", async () => {
        await page
          .getByRole("textbox", { name: "title" })
          .fill("My new snippet");
      });

      await test.step("Filling out content", async () => {
        const monacoEditor = page.locator(".monaco-editor").nth(0);
        await monacoEditor.click();
        await page.keyboard.press("Meta+KeyA");
        await page.keyboard.press("Backspace");
        await page.keyboard.press("Control+A");
        await page.keyboard.press("Backspace");
        await page.keyboard.type('Console.log("Testing with Playwright!")');
      });
    });

    await test.step("Submitting form", async () => {
      await page.getByRole("button", { name: "Save", exact: true }).click();
    });

    await test.step("Error message is visible", async () => {
      await expect(
        page.getByText("Request failed with status code 500")
      ).toBeVisible();
    });
  });
});
