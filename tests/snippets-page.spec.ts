import { test, expect } from "next/experimental/testmode/playwright";

test.describe("Snippets page", () => {
  test("Should render correctly", async ({ page, next }) => {
    next.onFetch((request) => {
      if (
        request.method === "GET" &&
        request.url === "http://localhost:3001/snippet"
      ) {
        return new Response(
          JSON.stringify([
            { id: 1, title: "Snippet 1", content: "Content 1" },
            { id: 2, title: "Snippet 2", content: "Content 2" },
            { id: 3, title: "Snippet 3", content: "Content 3" },
            { id: 4, title: "Snippet 4", content: "Content 4" },
          ]),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return "abort";
    });

    await page.goto("/snippets");

    await test.step("Renders heading", async () => {
      await expect(
        page.getByRole("heading", { level: 1, name: "View", exact: true })
      ).toBeVisible();
    });

    await test.step("Renders list of snippets", async () => {
      await expect(page.getByText("Snippet 1")).toBeVisible();
      await expect(page.getByText("Snippet 2")).toBeVisible();
      await expect(page.getByText("Snippet 3")).toBeVisible();
      await expect(page.getByText("Snippet 4")).toBeVisible();
    });
  });
});
