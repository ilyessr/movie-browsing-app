import { tmdbApi } from "./axios";
import { ApiResponse, Movie, MovieDetailWithCredits } from "../types";

export const fetchMovieSearch = async (
  query: string
): Promise<ApiResponse<Movie>> => {
  const { data } = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return data;
};

export const fetchMovieDetailWithCredits = async (
  movieID: number
): Promise<MovieDetailWithCredits> => {
  const { data } = await tmdbApi.get(`/movie/${movieID}`, {
    params: { append_to_response: "credits" },
  });
  return data;
};

export const fetchPopularMovies = async (
  page = 1
): Promise<ApiResponse<Movie>> => {
  const { data } = await tmdbApi.get("/movie/popular", {
    params: { language: "en-US", page, include_adult: false },
  });
  return data;
};

export const fetchMoviesByGenre = async (
  genreId: number,
  page = 1
): Promise<ApiResponse<Movie>> => {
  const { data } = await tmdbApi.get("/discover/movie", {
    params: {
      with_genres: genreId,
      language: "en-US",
      sort_by: "popularity.desc",
      page,
    },
  });
  return data;
};
