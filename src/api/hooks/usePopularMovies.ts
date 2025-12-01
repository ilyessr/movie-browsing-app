import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../movies";

export const usePopularMovies = (page: number) => {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies(page),
  });
};
