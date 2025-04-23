import { renderSuspended } from "@nuxt/test-utils/runtime";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import KsbPage from "../pages/index.vue";
import { screen } from "@testing-library/vue";
import { server } from "../src/mocks/node";
import { ksbs, initialKsbs } from "../src/mocks/handlers";
import userEvent from "@testing-library/user-event";
import _ from "lodash";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  ksbs.length = 0;
  ksbs.push(...initialKsbs);
  server.resetHandlers();
});

describe("KsbPage for unauthenitcated users", () => {

const user = userEvent.setup()

  it("should display a list of ksbs", async () => {
    await renderSuspended(KsbPage);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);
    expect(screen.getByText("knowledge description")).toBeDefined();
    expect(screen.getByText("skill description")).toBeDefined();
    expect(screen.getByText("behaviour description")).toBeDefined();
  });

  it("should allow users to sort ksbs by theme", async () => {
    await renderSuspended(KsbPage);
    const rowsBeforeSort = screen.getAllByRole("row").map(row => row.textContent);
    expect(rowsBeforeSort[1]).toContain("code quality");
    expect(rowsBeforeSort[2]).toContain("operability");
    expect(rowsBeforeSort[3]).toContain("code quality");

    await user.click(screen.getByRole("button", { name: "Sort by: theme" }));

    const sortedRows = screen.getAllByRole("row").map(row => row.textContent);
    expect(sortedRows[1]).toContain("code quality");
    expect(sortedRows[2]).toContain("code quality");
    expect(sortedRows[3]).toContain("operability");
  });

  it("should allow users to sort ksbs by last updated", async () => {
    await renderSuspended(KsbPage);

    // Unsort by theme first
    await user.click(screen.getByRole("button", { name: "Sort by: theme" }));


    const rowsBeforeSort = screen.getAllByRole("row").map(row => row.textContent);
    expect(rowsBeforeSort[1]).toContain("Wed, 12 Mar 2025 12:45:39 GMT");
    expect(rowsBeforeSort[2]).toContain("Fri, 14 Mar 2025 12:45:39 GMT");
    expect(rowsBeforeSort[3]).toContain("Thu, 13 Mar 2025 12:45:39 GMT");

    // Sort by last updated
    await user.click(
      screen.getByRole("button", { name: "Sort by: last updated" })
    );

    const sortedRows = screen.getAllByRole("row").map(row => row.textContent);
    expect(sortedRows[1]).toContain(
      "Wed, 12 Mar 2025 12:45:39 GMT"
    );
    expect(sortedRows[2]).toContain(
      "Thu, 13 Mar 2025 12:45:39 GMT"
    );
    expect(sortedRows[3]).toContain(
      "Fri, 14 Mar 2025 12:45:39 GMT"
    );
  });
});