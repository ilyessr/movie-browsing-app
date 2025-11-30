import { useQuery } from "@tanstack/react-query";
import { fetchLanguages } from "../languages";

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    staleTime: Infinity, // languages change never
  });
};
