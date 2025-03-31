import { describe, expect, it, vi } from "vitest";
import middlewareLoggin from "../middleware/authenticated";
import middlewareRole from "../middleware/role";

import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { RouteLocationNormalizedGeneric } from "vue-router";

mockNuxtImport("navigateTo", () => vi.fn());

describe("My middleware flow", async () => {
  const to: RouteLocationNormalizedGeneric = {
    path: "/admin-path",
    name: undefined,
    params: {},
    matched: [],
    fullPath: "",
    query: {},
    hash: "",
    redirectedFrom: undefined,
    meta: {},
  };
  const from: RouteLocationNormalizedGeneric = {
    path: "/non-admin-path",
    name: undefined,
    params: {},
    matched: [],
    fullPath: "",
    query: {},
    hash: "",
    redirectedFrom: undefined,
    meta: {},
  };

  it("should redirect to login page", async () => {
    const result = await middlewareLoggin(to, from);
    expect(navigateTo).toHaveBeenCalledWith("/login");
  });
});
