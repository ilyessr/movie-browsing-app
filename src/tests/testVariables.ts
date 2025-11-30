import { MovieDetailWithCredits } from "../types";

export const mockMovieDetail: MovieDetailWithCredits = {
  id: 10625,
  title: "Mean Girls",
  poster_path: "/alKvY5LuVcXraRBfi5UtVV8Ii6Y.jpg",
  backdrop_path: "/6DqzZaTAzFrT53JtRt3MLKs0Y9i.jpg",
  overview:
    "Cady Heron is a hit with The Plastics, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  runtime: 97,
  release_date: "2004-04-30",
  tagline: "Watch your back.",
  genres: [
    {
      id: 35,
      name: "Comedy",
    },
  ],
  vote_average: 7.208,
  vote_count: 8380,
  credits: {
    cast: [
      {
        adult: false,
        cast_id: 1,
        character: "Cady Heron",
        credit_id: "abc123",
        gender: 1,
        id: 100,
        known_for_department: "Acting",
        name: "Lindsay Lohan",
        order: 0,
        original_name: "Lindsay Lohan",
        popularity: 50,
        profile_path: "/profile.jpg",
      },
    ],
    crew: [
      {
        id: 200,
        name: "Mark Waters",
        job: "Director",
        department: "Directing",
        profile_path: "/director.jpg",
      },
    ],
  },
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
};
