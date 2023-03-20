import { setActivePinia, createPinia } from "pinia"
import { mount, VueWrapper, flushPromises } from "@vue/test-utils";
import HomeView from "../../../src/views/HomeView.vue";
import { useMoviesStore } from "@/store/movies";

describe("Home page", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(HomeView);

  })

  it("check if render title", () => {
    const title = wrapper.element.getElementsByTagName("h1");
    expect(title).toHaveLength(1);
    expect(title[0].textContent).toBe('Search Movies');
  })

  it("check if render filter", () => {
    const filterForm = wrapper.element.getElementsByTagName("v-form");
    expect(filterForm).toHaveLength(1);
  })

  it("check if call api", async () => {
    const moviesStore = useMoviesStore();
    moviesStore.setFilter({
      s: "test"
    });
    moviesStore.setMovies = jest.fn();
    let table = wrapper.element.getElementsByTagName("v-data-table");
    expect(table).toHaveLength(0);
    await wrapper.find("v-form").trigger('submit');
    await flushPromises();
    expect(moviesStore.setMovies).toHaveBeenCalledTimes(0);
    table = wrapper.element.getElementsByTagName("v-data-table");
    expect(table).toHaveLength(0);
  })
})
