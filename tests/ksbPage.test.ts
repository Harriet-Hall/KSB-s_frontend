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

  it("should allow users to update a ksb type", async () => {

    await renderSuspended(KsbPage);

    const typeElement = screen.getByTestId("type-id-0");
    typeElement.textContent = "";
    
    await user.type(typeElement, "S");
    await user.type(typeElement, "k");
    await user.type(typeElement, "i");
    await user.type(typeElement, "l");
    await user.type(typeElement, "l");

    expect(typeElement.textContent).toBe("Skill");

    await user.click(screen.getByRole("button", { name: "update-id-0" }));
    const updatedRows = screen.getAllByRole("row");

    expect(updatedRows[1].textContent).toContain("Skill")
  }),
  
  it("should allow users to update a ksb code", async () => {
    
    await renderSuspended(KsbPage);
  
    const codeElement = screen.getByTestId("code-id-0");

    codeElement.textContent = "";
    await user.type(codeElement, "1")
    expect(codeElement.textContent).toBe("1");
    
    await user.click(screen.getByRole("button", { name: "update-id-0" }));
    const updatedRows = screen.getAllByRole("row");

    expect(updatedRows[1].textContent).toContain("1")
  }), 

  it("should allow users to update a ksb description", async () => {
    
    await renderSuspended(KsbPage);

    const descriptionElement = screen.getByTestId("description-id-0")
    descriptionElement.textContent = "";
    
    for(let i = 0; i <16; i++){
        await user.type(descriptionElement, "x");
      }

      expect(descriptionElement.textContent).toBe("xxxxxxxxxxxxxxxx");
  
      
      await user.click(screen.getByRole("button", { name: "update-id-0" }));
      const updatedRows = screen.getAllByRole("row");
      expect(updatedRows[1].textContent).toContain("xxxxxxxxxxxxxxxx")
    })
    
    
  });
  