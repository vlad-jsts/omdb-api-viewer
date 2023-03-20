import { setActivePinia, createPinia } from "pinia"
import { useMoviesStore } from "../../../src/store/movies";
import { Movie } from "../../../src/resources/types";

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('movies', () => {
    const moviesStore = useMoviesStore()
    expect(moviesStore.movies).toHaveLength(0)
    const data: Movie[] = [
      {
        Poster: "https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg",
        Title: "Set It Up",
        Type: "movie",
        Year: "2018",
        imdbID: "tt5304992"
      },
      {
        Poster: "https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg",
        Title: "Set It Up",
        Type: "movie",
        Year: "2018",
        imdbID: "tt5304992"
      },
      {
        Poster: "https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg",
        Title: "Set It Up",
        Type: "movie",
        Year: "2018",
        imdbID: "tt5304992"
      },
    ] as Movie[];
    moviesStore.setMovies(data);
    expect(moviesStore.movies).toHaveLength(data.length)
  })

  it('filter', () => {
    const moviesStore = useMoviesStore()
    expect(moviesStore.filter.s).toBe("")
    moviesStore.setFilter({
      s: "Test",
    });
    expect(moviesStore.filter.s).toBe("Test")
  })

  it('total count', () => {
    const moviesStore = useMoviesStore()
    expect(moviesStore.totalCount).toBe(0)
    moviesStore.setTotalCount(10);
    expect(moviesStore.totalCount).toBe(10)
  })


  it('change page', () => {
    const moviesStore = useMoviesStore()
    expect(moviesStore.filter.page).toBe(undefined)
    moviesStore.changePage(10);
    expect(moviesStore.filter.page).toBe(10)
  })
})
