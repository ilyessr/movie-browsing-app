import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Genre, Language, Actor, Movie, MovieDetail } from "../types";
import { useQuery } from "react-query";
import axios from "axios";

// Fetch Functions
const fetchGenres = async (): Promise<Genre[]> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
  );
  return data.genres;
};

const fetchLanguages = async (): Promise<Language[]> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/configuration/languages?api_key=${TMDB_API_KEY}`
  );
  return data;
};

const fetchMainActors = async (movieID: number): Promise<Actor[]> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/movie/${movieID}/credits?api_key=${TMDB_API_KEY}`
  );
  return data.cast.slice(0, 5);
};

const fetchPopularMovies = async (): Promise<Movie[]> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`
  );
  return data.results;
};

const fetchMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
  );
  return data;
};

const fetchMovieSearch = async (
  query: string
): Promise<{ results: Movie[] }> => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}${query}`
  );
  return data;
};

// Hook Implementation
export const useTMDBService = () => {
  const useGenres = () => {
    return useQuery<Genre[], Error>("genres", fetchGenres);
  };

  const useLanguages = () => {
    return useQuery<Language[], Error>("languages", fetchLanguages);
  };

  const useMainActors = (movieID: number) => {
    return useQuery<Actor[], Error>(["mainActors", movieID], () =>
      fetchMainActors(movieID)
    );
  };

  const usePopularMovies = () => {
    return useQuery<Movie[], Error>("popularMovies", fetchPopularMovies);
  };

  const useMovieDetail = (movieId: number) => {
    return useQuery<MovieDetail, Error>(["movieDetail", movieId], () =>
      fetchMovieDetail(movieId)
    );
  };

  const useMovieSearch = (query: string) => {
    return useQuery<{ results: Movie[] }, Error>(
      ["movieSearch", query],
      () => fetchMovieSearch(query),
      {
        enabled: !!query, // Only fetch if the query is not empty
      }
    );
  };

  return {
    useGenres,
    useLanguages,
    useMainActors,
    usePopularMovies,
    useMovieDetail,
    useMovieSearch,
  };
};
