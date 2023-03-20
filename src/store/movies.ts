import { ref } from "vue";
import { defineStore } from "pinia";
import { Movie, MovieFilter } from "@/resources/types";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<Movie[]>([]);
  const filter = ref<MovieFilter>({
    s: ""
  });
  const totalCount = ref(0);

  const setMovies = (value: Movie[]) => {
    movies.value = value;
  };
  const setFilter = (value: MovieFilter) => {
    filter.value = value;
  };
  const setTotalCount = (value: number) => {
    totalCount.value = value;
  };
  const changePage = (value: number) => {
    filter.value = {
      ...filter.value,
      page: value,
    }
  };
  
  return {
    movies,
    filter,
    totalCount,
    setMovies,
    setFilter,
    setTotalCount,
    changePage,
  };
})
