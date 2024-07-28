import { test, expect } from "next/experimental/testmode/playwright/msw";
import { rest } from "msw";

test.describe("Snippet details page", () => {
  // The loading page is a feature of NextJS and doesn't need to be tested really, but I want to be able to test the CONTENTS of said loading page
  test("As a user I should see a loading indicator when the page is loading", async ({
    page,
    msw,
  }) => {
    // This mocks requests from Next to an external API, not requests from the browser
    msw.use(
      rest.get("http://localhost:3001/snippet/1", (_, res, ctx) => {
        return res(
          ctx.delay(2000), // Give a 2 second opening to assert the loading page
          ctx.json({ id: 1, title: "Snippet 1", content: "Content 1" })
        );
      })
    );

    // { waitUntil: "commit" } allows me to start asserting as soon as the request to "http://localhost:3000/snippet/1" is made from the browser
    // This allows me to assert the loading indicator exists, otherwise assertions start AFTER the Next server returns the HTML page (after fetching the snippet)
    await page.goto("/snippets/1", { waitUntil: "commit" });
    await expect(page.getByText("Loading...")).toBeVisible();
  });

  test("As a user I should see the details of a snippet", async ({
    page,
    msw,
  }) => {
    msw.use(
      rest.get("http://localhost:3001/snippet/1", (_, res, ctx) => {
        return res(
          ctx.json({ id: 1, title: "Snippet 1", content: "Content 1" })
        );
      })
    );

    await page.goto("/snippets/1");

    await test.step("Title is visible", async () => {
      await expect(
        page.getByRole("heading", { level: 1, name: "Snippet 1", exact: true })
      ).toBeVisible();
    });

    await test.step('"Update" link is visible', async () => {
      await expect(
        page.getByRole("link", { name: "Update", exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Update", exact: true })
      ).toHaveAttribute("href", "#");
    });

    await test.step('"Delete" link is visible', async () => {
      await expect(
        page.getByRole("link", { name: "Delete", exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Delete", exact: true })
      ).toHaveAttribute("href", "#");
    });

    await test.step("Snippet is visible", async () => {
      await expect(page.getByText("Content 1")).toBeVisible();
    });
  });

  // Here I do control when to show the Not Found page, so I need to test it
  test('As a user I should see a "Not Found" page if the page doesn\'t exist', async ({
    page,
    msw,
  }) => {
    msw.use(
      rest.get("http://localhost:3001/snippet/1", (_, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ message: "Not Found", status: 404 })
        );
      })
    );

    await page.goto("/snippets/1");
    await expect(
      page.getByText("Sorry, but we couldn't find that particular snippet.")
    ).toBeVisible();
  });
});
