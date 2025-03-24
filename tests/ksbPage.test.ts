import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../src/mocks/node";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, waitFor } from "@testing-library/vue";
import KsbPage from "../pages/index.vue"
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
     
     await user.click(screen.getByRole("button", { name: "delete-id-1" }));
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
      await user.selectOptions(screen.getByLabelText('select theme:'), 'code quality');
  
      await user.click(screen.getByRole("button", { name: "Add KSB" }));
      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(4);
        expect(screen.getByText('Test description')).toBeDefined()
      })
      
      })
      })
     


