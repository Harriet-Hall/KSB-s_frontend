import  AddKsb from '~/components/AddKsb.vue';
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { mount } from "@vue/test-utils";
import { waitFor } from '@testing-library/vue';

describe("Ksb homepage", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  }); 

  it("call addKsb function when the 'add ksb' button is clicked", async () => {

    vi.mock("/composables/useAPI.ts", () => ({
      useAPI: vi.fn(),
    }));

    const wrapper = mount(AddKsb)
    
    
    await wrapper.get('#type').setValue("Skill");
    await wrapper.get('#code').setValue(4)
    await wrapper.get('#description').setValue("Test description")
    await wrapper.get('#theme').setValue("meeting user needs")

    const addButton = wrapper.find('#addKsbButton')
    addButton.trigger("click")

    expect(useAPI).toHaveBeenCalledWith("/ksbs/skill", expect.objectContaining({
      method: "POST",
      body: {
        code: 4,
        description: "Test description",
        theme: "meeting user needs"
      },
    }))
  })
})