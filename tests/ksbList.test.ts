import { describe, expect, it } from "vitest";
import KsbList from "../components/KsbList.vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { nextTick } from "vue";
import type { Ksb } from "../types.ts"
import userEvent from "@testing-library/user-event";


describe("KsbList", async () => {
  const MOCKED_DATA: Ksb[] = [
    {
      id: "d9385487-94de-484b-8f0c-079d365815f9",
      type: "Knowledge",
      code: 2,
      description: "knowledge description",
      updated_at: "Wed, 12 Mar 2025 12:45:39 GMT",
      theme: "code quality",
    },
    {
      id: "d9385487-94de-484b-8f0c-079d365815f8",
      type: "Skill",
      code: 3,
      description: "skill description",
      updated_at: "Wed, 13 Mar 2025 12:45:39 GMT",
      theme: "data persistence",
    },
    {
      id: "d9385487-94de-484b-8f0c-079d365815f7",
      type: "Behaviour",
      code: 2,
      description: "behaviour description",
      updated_at: "Wed, 14 Mar 2025 12:45:39 GMT",
      theme: "code quality",
    },
  ];
  it("should get a list of ksbs", async () => {
    

    await renderSuspended(KsbList, { props: { data: MOCKED_DATA } });

    await nextTick();
    const headers = screen.getAllByRole("columnheader");
    const headerTexts = headers.map((header) => header.textContent);
    for (let expectedHeader in [
      "KSB Type",
      "KSB Code",
      "KSB description",
      "KSB was last updated at:",
    ]) {
      expect(expectedHeader in headerTexts);
    }

    expect(screen.getByText("Knowledge")).toBeDefined();
    expect(screen.getAllByText(2)).toBeDefined();
    expect(screen.getByText("knowledge description")).toBeDefined();
    expect(screen.getByText("Wed, 12 Mar 2025 12:45:39 GMT")).toBeDefined();

    expect(screen.getByText("Skill")).toBeDefined();
    expect(screen.getByText("skill description")).toBeDefined();
    expect(screen.getByText("Wed, 13 Mar 2025 12:45:39 GMT")).toBeDefined();

    expect(screen.getByText("Behaviour")).toBeDefined();
    expect(screen.getByText("behaviour description")).toBeDefined();
    expect(screen.getByText("Wed, 14 Mar 2025 12:45:39 GMT")).toBeDefined();
  });
  it("should allow users to delete a ksb", async () => {
    await renderSuspended(KsbList, { props: { data: MOCKED_DATA } });
    const user = userEvent.setup();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);

    await user.click(screen.getByRole("button", { name: "delete-id-1" }));
    MOCKED_DATA.splice(1, 1)
    await renderSuspended(KsbList, { props: { data: MOCKED_DATA } });
  
    const updatedRows = screen.getAllByRole("row");
    expect(updatedRows.length).toBe(3)
    expect(screen.queryByText('skill description')).toBeNull()
  });
});