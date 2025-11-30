import { useQuery } from "@tanstack/react-query";
import { fetchMovieSearch } from "../movies";

export const useMovieSearch = (query: string) => {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ["movieSearch", trimmed],
    queryFn: () => fetchMovieSearch(trimmed),
    enabled: trimmed.length >= 3,
  });
};
