import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../movies";

export const useMoviesByGenre = (genreId?: number) => {
  return useQuery({
    queryKey: ["moviesByGenre", genreId],
    queryFn: () => fetchMoviesByGenre(genreId!),
    enabled: !!genreId,
  });
};
