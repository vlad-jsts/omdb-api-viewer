<template>
  <v-container>
    <h1 class="mt-6 mb-8">Search Movies</h1>
    <FilterForm v-model="moviesStore.filter" @search="searchMovies" />

    <MoviesTable
      :data="moviesStore.movies"
      :total-count="moviesStore.totalCount"
      :page="moviesStore.filter.page"
      :help-text="helperText"
      :loading="loading"
      @update-page="moviesStore.changePage($event)"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { search } from "@/services/movie.service";

import { useMoviesStore } from "@/store/movies";
import FilterForm from "@/components/FilterForm.vue";
import MoviesTable from "@/components/MoviesTable.vue";

const moviesStore = useMoviesStore();
const loading = ref(false);
const helperText = ref("Please search movies.");

const fetch = () => {
  if (moviesStore.filter.s) {
    loading.value = true;
    search({ ...moviesStore.filter }).then((res) => {
      if (res.data.Error) {
        helperText.value = res.data.Error;
        moviesStore.setMovies([]);
        moviesStore.setTotalCount(0);
      } else {
        moviesStore.setMovies(res.data.Search);
        moviesStore.setTotalCount(parseInt(res.data.totalResults));
      }
      loading.value = false;
    });
  }
};

const page = computed(() => moviesStore.filter.page);

const searchMovies = () => {
  moviesStore.changePage(1);
  fetch();
};

watch(page, () => {
  fetch();
});

</script>
