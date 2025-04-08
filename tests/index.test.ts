import { renderSuspended } from "@nuxt/test-utils/runtime";
import Index from "../pages/full-access/index.vue"
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ksbs } from "~/ksbsMockData.ts";

describe("index", () => {
  afterEach(() => {
    vi.clearAllMocks();
  }); 
  it("should allow users to sort ksbs by theme", async () => {
    
    vi.mock("/composables/useAPI.ts", () => {
      return {
        useAPI: () => {
          return {
            data: ref(ksbs)
          }
        }
      }
    });
    await renderSuspended(Index);

      const user = userEvent.setup();
      const rows = screen.getAllByRole("row");
  
      expect(rows[1].getHTML()).toContain("code quality");
      expect(rows[2].getHTML()).toContain("data persistence");
      expect(rows[3].getHTML()).toContain("code quality");
  
      await user.click(screen.getByRole("button", { name: "Sort by: theme" }));
  
      const sortedRows = screen.getAllByRole("row");
      expect(sortedRows[1].getHTML()).toContain("code quality");
      expect(sortedRows[2].getHTML()).toContain("code quality");
      expect(sortedRows[3].getHTML()).toContain("data persistence");
    })
  
      it("should allow users to sort ksbs by last updated", async () => {
        vi.mock("/composables/useAPI.ts", () => {
          return {
            useAPI: () => {
              return {
                data: ref(ksbs)
              }
            }
          }
        });
        await renderSuspended(Index);

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
  
})


