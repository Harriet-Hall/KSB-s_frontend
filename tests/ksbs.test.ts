import { afterEach, describe, expect, it, vi } from "vitest";
import { mockNuxtImport, renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import KsbList from "~/components/KsbList.vue";

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}));

mockNuxtImport("useFetch", () => mockFetch);

afterEach(() => {
  mockFetch.mockReset();
});

const MOCKED_VALUE = [
  {
    type: "Knowledge",
    code: 2,
    description: "knowledge description",
    updated_at: "Wed, 12 Mar 2025 12:45:39 GMT",
  },
  {
    type: "Skill",
    code: 3,
    description: "skill description",
    updated_at: "Wed, 13 Mar 2025 12:45:39 GMT",
  },
  {
    type: "Behaviour",
    code: 2,
    description: "behaviour description",
    updated_at: "Wed, 14 Mar 2025 12:45:39 GMT",
  },
];
describe("ksbs", async () => {
  mockFetch.mockReturnValue({
    data: ref(MOCKED_VALUE),
  });

  it("should display a list of ksbs", async () => {
    await renderSuspended(KsbList, {props: {data: MOCKED_VALUE}});

    // expect(mockFetch).toHaveBeenCalled();
    const headers = screen.getAllByRole("columnheader")
    const headerTexts = headers.map((header) => header.textContent);
    for (let expectedHeader in ["KSB Type", "KSB Code", "KSB description", "KSB was last updated at:"]){
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
});
