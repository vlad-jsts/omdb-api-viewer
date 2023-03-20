import { search } from '@/services/movie.service';
import api from '@/services/api';

jest.mock('@/services/api');

describe('movices service', () => {
  const response = {
    data: {
      Search: [
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
      ]
    },
    totalCount: 500,
  };
  beforeEach(() => {
    api.get = jest.fn().mockResolvedValue(response);
  })

  it('search ', async () => {
    const filter = {
      s: 'test',
    };
    const result = await search(filter);
    expect(api.get).toHaveBeenCalledWith("/", { params: filter });
    expect(result).toBe(response);
  })
})
