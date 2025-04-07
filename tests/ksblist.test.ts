import { afterEach, describe, expect, it, vi } from "vitest";

import KsbList from "../components/KsbList.vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, waitFor } from "@testing-library/vue";
import type { Ksb } from "../types.ts";
import { handleRemove } from "~/components/KsbList.vue";
import { mount } from "@vue/test-utils";

describe("Ksb homepage", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

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
  it("should display a list of ksbs", async () => {
    await renderSuspended(KsbList, { props: { data: MOCKED_DATA } });

    const expectedHeaders = [
      "Edit KSB",
      "KSB Type",
      "KSB Code",
      "KSB Description",
      "KSB Last updated",
      "KSB theme",
      "Delete KSB",
    ];
    expectedHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeDefined();
    });

    expect(screen.getByText("Knowledge")).toBeDefined();
    expect(screen.getByText("Skill")).toBeDefined();
    expect(screen.getByText("Behaviour")).toBeDefined();

    expect(screen.getByText("knowledge description")).toBeDefined();
    expect(screen.getByText("skill description")).toBeDefined();
    expect(screen.getByText("behaviour description")).toBeDefined();

    expect(screen.getByText("Wed, 12 Mar 2025 12:45:39 GMT")).toBeDefined();
    expect(screen.getByText("Wed, 13 Mar 2025 12:45:39 GMT")).toBeDefined();
    expect(screen.getByText("Wed, 14 Mar 2025 12:45:39 GMT")).toBeDefined();

    expect(screen.getAllByText("code quality")).toBeDefined();
    expect(screen.getAllByText("data persistence")).toBeDefined();
  });
  it("should call handleRemove when the delete button is clicked", async () => {
    vi.mock("/composables/useAPI.ts", () => ({
      useAPI: vi.fn(),
    }));

    const id = "1";

    await handleRemove(id);

    expect(useAPI).toHaveBeenCalledWith(
      `/ksbs/${id}`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
  
});
