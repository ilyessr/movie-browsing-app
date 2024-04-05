import { useEffect, useState } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Actor } from "../types";

export const useMainActors = (movieID: number) => {
  const [mainActors, setMainActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchMainActors = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/${movieID}/credits?api_key=${TMDB_API_KEY}`
        );
        const data: { cast: Actor[] } = await response.json();
        const actors = data.cast.slice(0, 5);
        setMainActors(actors);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des acteurs principaux:",
          error
        );
      }
    };

    fetchMainActors();
  }, [movieID]);

  return mainActors;
};
