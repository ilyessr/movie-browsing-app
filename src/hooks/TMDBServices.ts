/*
useGenres: Fetches a list of movie genres.
useLanguages: Fetches a list of supported languages.
useMainActors: Fetches the main actors of a specific movie by its ID.
usePopularMovies: Fetches a list of popular movies, filtering out any adult content.
useMovieDetail: Fetches detailed information about a specific movie by its ID.
*/

import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Genre, Language, Actor, Movie, MovieDetail } from "../types";

import { useEffect, useState } from "react";

export const useTMDBService = () => {
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  };

  const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const data = await fetchData(
            `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
          );
          setGenres(data?.genres || null);
        } catch (error) {
          console.error("Failed to fetch genres:", error);
        }
      };

      fetchGenres();
    }, []);

    return genres;
  };

  const useLanguages = () => {
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
      const fetchLanguages = async () => {
        try {
          const data = await fetchData(
            `${TMDB_BASE_URL}/configuration/languages?api_key=${TMDB_API_KEY}`
          );
          setLanguages(data || null);
        } catch (error) {
          console.error("Failed to fetch languages:", error);
        }
      };

      fetchLanguages();
    }, []);

    return languages;
  };

  const useMainActors = (movieID: number) => {
    const [actors, setActors] = useState<Actor[]>([]);

    useEffect(() => {
      const fetchActors = async () => {
        try {
          const data = await fetchData(
            `${TMDB_BASE_URL}/movie/${movieID}/credits?api_key=${TMDB_API_KEY}`
          );
          setActors(data && data.cast ? data.cast.slice(0, 5) : null);
        } catch (error) {
          console.error("Failed to fetch main actors:", error);
        }
      };

      fetchActors();
    }, [movieID]);

    return actors;
  };

  const usePopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
      const fetchPopularMovies = async () => {
        try {
          const response = await fetch(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch popular movies");
          }
          const data = await response.json();
          setPopularMovies(data.results);
        } catch (error) {
          console.error("Failed to fetch popular movies:", error);
        }
      };

      fetchPopularMovies();
    }, []);

    return popularMovies;
  };

  const useMovieDetail = (movieId: number) => {
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

    useEffect(() => {
      const fetchMovieDetail = async () => {
        try {
          const data = await fetchData(
            `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
          );
          setMovieDetail(data || null);
        } catch (error) {
          console.error("Failed to fetch movie detail:", error);
        }
      };

      fetchMovieDetail();
    }, [movieId]);

    return movieDetail;
  };

  return {
    useGenres,
    useLanguages,
    useMainActors,
    usePopularMovies,
    useMovieDetail,
  };
};
