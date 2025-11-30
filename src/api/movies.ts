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

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const { data } = await tmdbApi.get("/movie/popular", {
    params: { language: "en-US", page: 1, include_adult: false },
  });
  return data.results;
};

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const { data } = await tmdbApi.get("/discover/movie", {
    params: {
      with_genres: genreId,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });
  return data.results;
};
