import { useQuery } from "@tanstack/react-query";
import { Genre } from "../../types";
import { fetchGenres } from "../genres";

export const useGenres = () => {
  return useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
};
