import { RedisClientType } from "redis";
import axios, { AxiosInstance } from "axios";

export interface MovieFilter {
  s: string;
  type?: any;
  plot?: any;
  y?: number;
  page?: number;
}

export default class OMDBApi {
  public httpApiClient: AxiosInstance;
  public redisClient: RedisClientType;

  getHttpApiClient() {
    if (!this.httpApiClient) {
      this.httpApiClient = axios.create({
        baseURL: process.env.OMDB_API || "http://www.omdbapi.com",
      });

      // add the apikey as query
      this.httpApiClient.interceptors.request.use(function (config) {
        config.params = config.params || {};
        config.params.apikey = process.env.OMDB_API_KEY;
        return config;
      });
    }

    return this.httpApiClient;
  }

  setRedisClient(redisClient: RedisClientType) {
    this.redisClient = redisClient;
    return this;
  }

  getRedisClient(): RedisClientType {
    return this.redisClient;
  }

  async search(query: MovieFilter) {
    const cleanedQuery = this.cleanQuery(query);
    const cacheKey = this.generateKey(cleanedQuery);
    const cacheData = await this.getRedisClient().get(cacheKey);
    if (cacheData) {
      return JSON.parse(cacheData);
    }

    try {
      const request = await this.getHttpApiClient().get(`/`, {
        params: cleanedQuery,
      });

      //cache data
      await this.getRedisClient().set(cacheKey, JSON.stringify(request.data), {
        EX: parseInt(process.env.CACHE_EXPIRED) || 3600,
      });

      console.log(request.data.data);

      return request.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  cleanQuery(query: MovieFilter) {
    Object.keys(query).forEach((key) => {
      if (!query[key]) {
        delete query[key];
      }
    });

    return query;
  }

  generateKey(query: MovieFilter) {
    return Buffer.from(JSON.stringify(query), "utf8").toString("base64");
  }
}
