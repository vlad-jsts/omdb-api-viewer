import { MovieFilter } from "@/resources/types";
import api from "./api";

export const search = async (query: MovieFilter) => {
  return await api.get(`/`, {
    params: query,
  });
};
