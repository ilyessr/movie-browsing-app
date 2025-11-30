import { Language } from "../types";
import { tmdbApi } from "./axios";

export const fetchLanguages = async (): Promise<Language[]> => {
  const { data } = await tmdbApi.get("/configuration/languages");
  return data;
};
