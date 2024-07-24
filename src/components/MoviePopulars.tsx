import { FunctionComponent } from "react";
import { Movie } from "../types";
import { useTMDBService } from "../hooks/TMDBServices";
import { CircularProgress } from "@mui/material";
import RatingStars from "./RatingStars";

interface MoviePopularsProps {
  setSelectedMovieId: (id: number | null) => void;
}

const MoviePopulars: FunctionComponent<MoviePopularsProps> = ({
  setSelectedMovieId,
}) => {
  const { usePopularMovies } = useTMDBService();
  const {
    data: popularMovies,
    error: popularMoviesError,
    isLoading: popularMoviesLoading,
  } = usePopularMovies();

  if (popularMoviesLoading) {
    return (
      <div className="bg-gray-900 text-white flex items-center justify-center h-full w-full">
        <CircularProgress />
      </div>
    );
  }

  if (popularMoviesError) {
    return (
      <div className="bg-gray-900 text-white flex items-center justify-center h-full w-full">
        Error loading popular movies
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Popular Movies
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Discover the most popular movies of the moment. Click on a movie for
        more details.
      </p>
      <div className="max-w-screen-lg mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
        {popularMovies?.map((movie: Movie) => (
          <div
            key={movie.id}
            className="w-full sm:w-full m-auto bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedMovieId(movie.id)}
            role="button"
            tabIndex={0}
            aria-label={`Select movie ${movie.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedMovieId(movie.id);
              }
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster of ${movie.title}`}
              className="w-full object-cover max-h-[300px]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/path/to/fallback-image.jpg";
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
              <RatingStars rating={movie.vote_average} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePopulars;
