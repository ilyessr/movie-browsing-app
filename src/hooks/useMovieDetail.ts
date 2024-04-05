import { useEffect, useState } from "react";
import { MovieDetail } from "../types";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";

export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async (movieId: number) => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          throw new Error("Failed to fetch movie detail");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail(movieId);
  }, [movieId]);

  return movie;
};
