import { useEffect, useState } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Movie } from "../types";

const usePopularMovies = (): Movie[] => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=20`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return popularMovies;
};

export default usePopularMovies;
