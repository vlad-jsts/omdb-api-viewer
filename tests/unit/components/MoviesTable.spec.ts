import { mount } from "@vue/test-utils";
import MoviesTable from "../../../src/components/MoviesTable.vue";

describe("MoviesTable component", () => {
  it("check if render table", () => {
    const data = [
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
  ];
    const wrapper = mount (MoviesTable, { props: {
      data: data,
    }});

    const table = wrapper.element.getElementsByTagName("v-data-table");
    expect(table).toHaveLength(1);
  })

  it("check if render pagination", () => {const data = [
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
  ];
    const wrapper = mount (MoviesTable, { props: {
        data: [],
      }});

    const table = wrapper.element.getElementsByTagName("v-data-table");
    expect(table).toHaveLength(0);
    const helperText = wrapper.element.getElementsByTagName("p");
    expect(helperText).toHaveLength(1);
    expect(helperText[0].textContent).toBe("Please search movies.");
  })
})
