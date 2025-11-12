// src/pages/MovieDetailsPage.tsx
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Poster from "../components/Poster";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieDetailsNotFound from "../components/MovieDetailsNotFound";
import { useTMDBService } from "../hooks/TMDBServices";
import MovieGenres from "../components/MovieDetails/MovieGenres";
import MovieInfosSection from "../components/MovieDetails/MovieInfosSection";
import MovieCastList from "../components/MovieDetails/MovieCastList";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieID = parseInt(id || "");

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

  if (isNaN(movieID)) return <Navigate to="/" />;

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
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "16px", right: "16px", zIndex: 10 }}
      >
        <ArrowBackIcon style={{ color: "white", fontSize: "30px" }} />
      </IconButton>

      <div className="relative flex flex-grow w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-4 md:py-8">
        <div className="overflow-hidden flex flex-col lg:flex-row h-fit w-full">
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
            {genres && (
              <MovieGenres movieGenreIds={movie.genres} allGenres={genres} />
            )}

            <MovieInfosSection
              languageCode={movie.original_language}
              runtime={movie.runtime ?? null}
              releaseDate={movie.release_date}
              languages={languages ?? []}
            />

            <p className="text-white mb-4 mt-4">{movie.overview}</p>

            {cast && <MovieCastList cast={cast} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
