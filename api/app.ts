import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import OMDBApi, { MovieFilter } from "./omdb";
import { createClient, RedisClientType } from "redis";
import cors from "cors";

const app = express();
const port = process.env.API_PORT || 4000;

//connect to redis
const redisClient: RedisClientType = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

// show redis errors to the console
redisClient.on("error", (err) => {
  console.log("Error " + err);
});

app.use(cors());

app.get("/", async (request: Request, response: Response) => {
  const { query } = request;
  const api = new OMDBApi();
  api.setRedisClient(redisClient);

  const data = {
    s: query?.s?.toString(),
    type: query?.type?.toString(),
    plot: query?.plot?.toString(),
    y: parseInt(query?.y?.toString()),
    page: parseInt(query?.page?.toString()) || 1,
  } as MovieFilter;
  const result = await api.search(data);

  return response.status(200).json(result);
});

app.listen(port, async () => {
  console.log(`App is running on port ${port}.`);
  await redisClient.connect();
});
