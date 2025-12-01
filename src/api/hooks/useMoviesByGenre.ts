import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../movies";

export const useMoviesByGenre = (genreId?: number, page = 1) => {
  return useQuery({
    queryKey: ["moviesByGenre", genreId, page],
    queryFn: () => fetchMoviesByGenre(genreId!, page),
    enabled: !!genreId,
  });
};
