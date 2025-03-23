import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../src/mocks/node";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, waitFor } from "@testing-library/vue";
import KsbPage from "../pages/index.vue"

beforeAll(() => server.listen({ onUnhandledRequest: "error" })) 

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe("KsbPage", () => {

  it('should call ksb endpoint and return ksbs', async() => {

    await renderSuspended(KsbPage);
      expect(screen.getByText("knowledge description")).toBeDefined();
      expect(screen.getByText("skill description")).toBeDefined();
      expect(screen.getByText("behaviour description")).toBeDefined();
  
     });
  })


