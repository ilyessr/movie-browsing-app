import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../movies";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
  });
};
