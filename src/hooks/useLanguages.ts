import { useState, useEffect } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { Language } from "../types";

export const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/configuration/languages?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch languages");
        }
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return languages;
};
