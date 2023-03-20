import OMDBApi, { MovieFilter } from "./omdb";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import RedisMock from "ioredis-mock";

const responseData = {
  Search: [
    {
      Title: "Crazy, Stupid, Love.",
      Year: "2011",
      imdbID: "tt1570728",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg",
    },
    {
      Title: "Love Actually",
      Year: "2003",
      imdbID: "tt0314331",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNThkNjgxNGQtOTIxMy00ZTFmLWIwMDItYzE5YzM3ZDMzNDE3XkEyXkFqcGdeQXVyMTUyNjc3NDQ4._V1_SX300.jpg",
    },
  ],
  totalResults: "21023",
  Response: "True",
};

const cachedResponseData = {
  Search: [
    {
      Title: "Crazy, Stupid, Love.",
      Year: "2011",
      imdbID: "tt1570728",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg",
    },
  ],
  totalResults: "21023",
  Response: "True",
};

const responseDataError = {
  Error: "Invalid",
  Response: "False",
};

describe("OMDBApi", () => {
  let omdbApi: OMDBApi;
  let mockAxios: MockAdapter;
  let redisMock: any; //mock redis cache

  beforeEach(() => {
    omdbApi = new OMDBApi();
    redisMock = new RedisMock();
    omdbApi.setRedisClient(redisMock);
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
    redisMock.flushall();
  });

  describe("search", () => {
    it("should return data from API and store it in Redis", async () => {
      const query: MovieFilter = { s: "avengers", type: "movie", page: 1 };
      const cacheKey = omdbApi.generateKey(omdbApi.cleanQuery(query));
      mockAxios.onGet("/").reply(200, responseData);

      const result = await omdbApi.search(query);
      expect(result).toMatchObject(responseData);

      const cacheData = await omdbApi.getRedisClient().get(cacheKey);
      expect(JSON.parse(cacheData)).toEqual(responseData);
    });

    it("should return error message when API returns error", async () => {
      const query: MovieFilter = { s: "invalidquery" };
      mockAxios.onGet("/").reply(404, responseDataError);
      const result = await omdbApi.search(query);
      expect(result).toMatchObject(responseDataError);
    });

    it("should return cached data", async () => {
      const query: MovieFilter = { s: "avengers", type: "movie", page: 1 };
      const cacheKey = omdbApi.generateKey(omdbApi.cleanQuery(query));
      await omdbApi
        .getRedisClient()
        .set(cacheKey, JSON.stringify(cachedResponseData));

      //mock request (will not trigger and not update redis data)
      mockAxios.onGet("/").reply(200, responseData);

      const result = await omdbApi.search(query);
      expect(result).toEqual(cachedResponseData);
    });
  });

  describe("cleanQuery", () => {
    it("should remove empty keys from the query object", () => {
      const query: MovieFilter = { s: "avengers", type: null, page: undefined };
      const expectedQuery: MovieFilter = { s: "avengers" };
      expect(omdbApi.cleanQuery(query)).toEqual(expectedQuery);
    });
  });

  describe("generateKey", () => {
    it("should generate a base64-encoded key from the query object", () => {
      const query: MovieFilter = { s: "The Godfather", type: "movie", y: 1972 };
      const expectedKey =
        "eyJzIjoiVGhlIEdvZGZhdGhlciIsInR5cGUiOiJtb3ZpZSIsInkiOjE5NzJ9";

      const result = omdbApi.generateKey(query);
      expect(result).toEqual(expectedKey);
    });
  });
});
