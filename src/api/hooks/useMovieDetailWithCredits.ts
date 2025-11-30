import { useQuery } from "@tanstack/react-query";
import { MovieDetailWithCredits } from "../../types";
import { fetchMovieDetailWithCredits } from "../movies";

export const useMovieDetailWithCredits = (movieID: number) => {
  return useQuery<MovieDetailWithCredits>({
    queryKey: ["movieDetailWithCredits", movieID],
    queryFn: () => fetchMovieDetailWithCredits(movieID),
    enabled: !!movieID,
  });
};
