import { afterEach, describe, expect, it, vi } from "vitest";
import KsbList from "../components/KsbList.vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import type { Ksb } from "../types.ts";
import { mount } from "@vue/test-utils";
import { ksbs } from "~/ksbsMockData.ts";

describe("Ksb homepage", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  }); 

  const MOCKED_DATA: Ksb[] = ksbs
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
    const wrapper = mount(KsbList, {
      props: { data: MOCKED_DATA },
    });
    const removeButton = wrapper.get('[aria-label="delete-id-0"]')
    await removeButton.trigger("click");
 

    expect(useAPI).toHaveBeenCalledWith(
      `/ksbs/d9385487-94de-484b-8f0c-079d365815f9`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
  it("should call handleEdit when the update button is clicked", async () => {
    vi.mock("/composables/useAPI.ts", () => ({
      useAPI: vi.fn(),
    }));

    const wrapper = mount(KsbList, {
      props: { data: MOCKED_DATA },
    });
    const descriptionTableCell = wrapper.get(
      '[data-testid="description-id-0"]'
    );
    descriptionTableCell.element.innerHTML = "Test description";
    await descriptionTableCell.trigger("input");
    const updateButton = wrapper.get('[aria-label="update-id-0"]');

    await updateButton.trigger("click");

      expect(useAPI).toHaveBeenCalledWith(
        "/ksbs/d9385487-94de-484b-8f0c-079d365815f9",
        expect.objectContaining({
          method: "PUT",
          body: {
            type: "Knowledge",
            code: 2,
            description: "Test description",
          },
        })
      );
  });
});
