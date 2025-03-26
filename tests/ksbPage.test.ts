import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { server } from "../src/mocks/node";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, waitFor } from "@testing-library/vue";
import KsbPage from "../pages/full-access/index.vue"
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen({ onUnhandledRequest: "error" })) 

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe("KsbPage", () => {
  
  const user = userEvent.setup()
  it('should call the GET endpoint and return ksbs', async() => {
 
    await renderSuspended(KsbPage);
      expect(screen.getByText("knowledge description")).toBeDefined();
      expect(screen.getByText("skill description")).toBeDefined();
      expect(screen.getByText("behaviour description")).toBeDefined();
  
     });
     it('should call the DELETE endpoint delete a ksb', async () => {
     await renderSuspended(KsbPage);
     const rows = screen.getAllByRole("row");
     expect(rows.length).toBe(4);
     
     await user.click(screen.getByRole("button", { name: "delete-id-0" }));
     await waitFor(() => {
       expect(screen.getAllByRole("row")).toHaveLength(3);
     })
     }),
     it('should call the POST endpoint and add a ksb', async () => {
      await renderSuspended(KsbPage);
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(3);
      await user.selectOptions(screen.getByLabelText('select type:'), 'Knowledge');
      await user.type(screen.getByLabelText('select code:'), '10');
      await user.type(screen.getByLabelText('add description:'), 'Test description');
      await user.selectOptions(screen.getByLabelText('select theme:'), 'meeting user needs');
  
      await user.click(screen.getByRole("button", { name: "Add KSB" }));
      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(4);
        expect(screen.getByText('Test description')).toBeDefined()
      })
    })
        it("should allow users to sort ksbs by theme", async () => {
          await renderSuspended(KsbPage);
          const user = userEvent.setup();
          const rows = screen.getAllByRole("row");
       
          expect(rows[1].getHTML()).toContain("operability");
          expect(rows[2].getHTML()).toContain('code quality')
          expect(rows[3].getHTML()).toContain('meeting user needs')
          expect(rows[4].getHTML()).toContain('meeting user needs')

      
          await user.click(screen.getByRole("button", { name: "Sort by: theme" }));


          expect(rows[1].getHTML()).toContain('code quality')
          expect(rows[2].getHTML()).toContain('meeting user needs')
          expect(rows[3].getHTML()).toContain('meeting user needs')
          expect(rows[4].getHTML()).toContain("operability");
      
        
      })
    })
      // it('should call the PUT endpoint and update ksb', async () => {
      //   await renderSuspended(KsbPage);
      //   await user.click(screen.getByRole("button", { name: "edit-id-1" }));
      //   await user.selectOptions(screen.getByDisplayValue('Knowledge'), 'Knowledge');



      // })

     


