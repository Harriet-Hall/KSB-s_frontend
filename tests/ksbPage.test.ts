import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../src/mocks/node";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, waitFor } from "@testing-library/vue";
import KsbPage from "../pages/full-access/index.vue";
import userEvent from "@testing-library/user-event";
import { ksbs, initialKsbs } from "../src/mocks/handlers";


beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  ksbs.length = 0;
  ksbs.push(...initialKsbs);
  server.resetHandlers();
});

describe("KsbPage", () => {
  const user = userEvent.setup();

  it("should display a list of ksbs", async () => {
    await renderSuspended(KsbPage);
    const rows = screen.getAllByRole("row");

    expect(rows.length).toBe(4);
    expect(screen.getByText("knowledge description")).toBeDefined();
    expect(screen.getByText("skill description")).toBeDefined();
    expect(screen.getByText("behaviour description")).toBeDefined();
  }),

  it("should allow users to delete a ksb", async () => {
    await renderSuspended(KsbPage);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);

    await user.click(screen.getByRole("button", { name: "delete-id-0" }));

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(3);
    });
  }),

    it("should allow users to add a ksb", async () => {
      await renderSuspended(KsbPage);
      const rows = screen.getAllByRole("row");

      expect(rows.length).toBe(4);

      await user.selectOptions(
        screen.getByLabelText("select type:"),
        "Knowledge"
      );
      await user.type(screen.getByLabelText("select code:"), "10");
      await user.type(
        screen.getByLabelText("add description:"),
        "Test description"
      );
      await user.selectOptions(
        screen.getByLabelText("select theme:"),
        "meeting user needs"
      );

      await user.click(screen.getByRole("button", { name: "Add KSB" }));
      
      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(5);
      });

      expect(screen.getAllByText("Test description")).toHaveLength(1);
      expect(screen.getByText("Test description")).toBeDefined();
    }),

  it("should allow users to update a ksb", async () => {

    await renderSuspended(KsbPage);
    const rows = screen.getAllByRole("row");

    
    const typeElement = screen.getByTestId("type-id-0");
    const codeElement = screen.getByTestId("code-id-0");
    const descriptionElement = screen.getByTestId("description-id-0");
    

    typeElement.textContent = "";
    codeElement.textContent = "";
    descriptionElement.textContent = "";
  

    await user.type(typeElement, "S");
    await user.type(typeElement, "k");
    await user.type(typeElement, "i");
    await user.type(typeElement, "l");
    await user.type(typeElement, "l");

    expect(typeElement.textContent).toBe("Skill");
    
    
    
    await user.type(codeElement, "1");
    expect(codeElement.textContent).toBe("1");
    
    
    for(let i = 0; i <16; i++){
      await user.type(descriptionElement, "x");
    }
    expect(descriptionElement.textContent).toBe("xxxxxxxxxxxxxxxx");

    user.click(screen.getByRole("button", { name: "update-id-0" }));

    await waitFor(()=> {
      expect(rows[1].textContent).toBe("UpdateSkill1xxxxxxxxxxxxxxxxWed, 12 Mar 2025 12:45:39 GMTcode qualityDelete")

    })

  }),

  it("should allow users to sort ksbs by theme", async () => {

    await renderSuspended(KsbPage);
    const user = userEvent.setup();
    const rows = screen.getAllByRole("row");



    expect(rows[1].getHTML()).toContain("code quality");
    expect(rows[2].getHTML()).toContain("operability");
    expect(rows[3].getHTML()).toContain("code quality");

    await user.click(screen.getByRole("button", { name: "Sort by: theme" }));

    const sortedRows = screen.getAllByRole("row");
    expect(sortedRows[1].getHTML()).toContain("code quality");
    expect(sortedRows[2].getHTML()).toContain("code quality");
    expect(sortedRows[3].getHTML()).toContain("operability");
  }),

    it("should allow users to sort ksbs by last updated", async () => {
      await renderSuspended(KsbPage);
      const user = userEvent.setup();
      //unsort the ksbs as they are sorted by last updated by the API
      await user.click(screen.getByRole("button", { name: "Sort by: theme" }));

      const rows = screen.getAllByRole("row");

      expect(rows[1].getHTML()).toContain("Wed, 12 Mar 2025 12:45:39 GMT");
      expect(rows[2].getHTML()).toContain("Fri, 14 Mar 2025 12:45:39 GMT");
      expect(rows[3].getHTML()).toContain("Thu, 13 Mar 2025 12:45:39 GMT");
      //sort ksbs
      await user.click(
        screen.getByRole("button", { name: "Sort by: last updated" })
      );

      const sortedRows = screen.getAllByRole("row");

      expect(sortedRows[1].getHTML()).toContain(
        "Wed, 12 Mar 2025 12:45:39 GMT"
      );
      expect(sortedRows[2].getHTML()).toContain(
        "Thu, 13 Mar 2025 12:45:39 GMT"
      );
      expect(sortedRows[3].getHTML()).toContain(
        "Fri, 14 Mar 2025 12:45:39 GMT"
      );
    });

});
