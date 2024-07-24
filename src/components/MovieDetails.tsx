import React, { FunctionComponent } from "react";
import Poster from "./Poster";
import MovieDetailsNotFound from "./MovieDetailsNotFound";
import MovieBackdrop from "./MovieBackdrop";
import { useTMDBService } from "../hooks/TMDBServices";
import { CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface MovieDetailsProps {
  movieID: number;
  setSelectedMovieId: (id: number | null) => void;
}

const MovieDetails: FunctionComponent<MovieDetailsProps> = ({
  movieID,
  setSelectedMovieId,
}) => {
  const { useGenres, useLanguages, useMovieDetail, useMainActors } =
    useTMDBService();

  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useGenres();
  const {
    data: languages,
    error: languagesError,
    isLoading: languagesLoading,
  } = useLanguages();
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useMovieDetail(movieID);
  const {
    data: cast,
    error: castError,
    isLoading: castLoading,
  } = useMainActors(movieID);

  if (movieLoading || genresLoading || languagesLoading || castLoading) {
    return (
      <div className="flex flex-grow items-center justify-center h-full w-full">
        <CircularProgress />
      </div>
    );
  }

  if (movieError || genresError || languagesError || castError || !movie) {
    const errorMessage = movieError
      ? "Movie details could not be fetched."
      : genresError
      ? "Genres could not be fetched."
      : languagesError
      ? "Languages could not be fetched."
      : castError
      ? "Cast details could not be fetched."
      : "Movie details not found.";
    return <MovieDetailsNotFound message={errorMessage} />;
  }

  return (
    <div className="relative">
      <MovieBackdrop movie={movie} />
      <IconButton
        className="absolute top-4 right-4 z-10"
        onClick={() => setSelectedMovieId(null)}
        style={{ position: "absolute", top: "16px", right: "16px", zIndex: 10 }}
      >
        <ArrowBackIcon style={{ color: "white", fontSize: "30px" }} />
      </IconButton>
      <div className="relative flex flex-grow w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-4 md:py-8">
        <div className="overflow-hidden flex flex-col lg:flex-row h-fit w-full ">
          <div
            data-testid="movie-poster"
            className="mx-auto mb-4 lg:m-0 flex-shrink-0"
          >
            <Poster
              posterPath={movie.poster_path}
              alt={movie.title}
              size="big"
            />
          </div>
          <div className="w-full flex flex-col md:ml-10">
            <div className="flex flex-wrap items-center md:mb-4">
              {movie.genres?.map((movieGenre) => {
                const matchingGenre = genres
                  ?.find((apiGenre) => apiGenre.id === movieGenre.id)
                  ?.name.replace(/\s/g, "\u00A0");
                return (
                  matchingGenre && (
                    <p
                      key={movieGenre.id}
                      className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 m-1 mr-2"
                    >
                      {matchingGenre}
                    </p>
                  )
                );
              })}
            </div>
            <div className="border-t border-b border-gray-300 py-4 my-4 flex text-white justify-between flex-col">
              {movie.original_language && (
                <p className="mr-2">
                  <span className="font-semibold">Original Language: </span>{" "}
                  {
                    languages?.find(
                      (lang) => lang.iso_639_1 === movie.original_language
                    )?.english_name
                  }
                </p>
              )}
              {typeof movie.runtime === "number" && (
                <p className="mr-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  {movie.runtime} min
                </p>
              )}
              {movie.release_date && (
                <p className="mr-2">
                  <span className="font-semibold">Release Date:</span>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <p className="text-white mb-4 mt-4">{movie.overview}</p>
            <div className="mb-4 text-white">
              <p className="text-lg font-semibold my-2">Cast:</p>
              <ul className="flex flex-wrap">
                {cast?.map((actor) => (
                  <li key={actor.id} className="mr-5 mb-4">
                    <div className="flex items-center">
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="object-cover w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{actor.name}</p>
                        <p className="text-gray-500">{actor.character}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieDetails);
