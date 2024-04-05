import { useEffect, useState } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Genre } from "../types";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setGenres(data.genres);
        } else {
          throw new Error("Failed to fetch genres");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  return genres;
};
