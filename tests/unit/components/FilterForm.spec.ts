import { mount, VueWrapper } from "@vue/test-utils";

import FilterForm from "../../../src/components/FilterForm.vue";

describe("FilterForm component", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    const filter = {
      s: "test"
    };
    wrapper = mount (FilterForm, {
      global: {
        plugins: [],
      },
      props: {
        modelValue: filter,
      },
    });
  })

  it("check if render form", () => {
    const selects = wrapper.element.getElementsByTagName("v-select");
    const inputs = wrapper.element.getElementsByTagName("v-text-field");
    const datepicker = wrapper.element.getElementsByClassName("v3dp__datepicker")
    expect(selects).toHaveLength(2);
    expect(datepicker).toHaveLength(1);
    expect(inputs).toHaveLength(2);
  })

  it("check if emit search", async () => {
    wrapper.find("v-form").trigger("submit");
    expect(wrapper.emitted()).toHaveProperty("search");
  })
})
