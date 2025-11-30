import { Genre } from "../types";
import { tmdbApi } from "./axios";

export const fetchGenres = async (): Promise<Genre[]> => {
  const { data } = await tmdbApi.get("/genre/movie/list");
  return data.genres;
};
