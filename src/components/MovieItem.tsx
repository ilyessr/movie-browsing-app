import { FunctionComponent } from "react";
import { Movie } from "../types";
import RatingStars from "./RatingStars";
import Poster from "./Poster";
import useMobile from "../hooks/useMobile";

type MovieItemProps = {
  setSelectedMovie: (args: Movie) => void;
  movie: Movie;
  setIsSideMenuOpen: (args: boolean) => void;
};

const MovieItem: FunctionComponent<MovieItemProps> = ({
  movie,
  setSelectedMovie,
  setIsSideMenuOpen,
}) => {
  const isMobile = useMobile();

  return (
    <div
      className="flex items-center cursor-pointer border-t text-white border-gray-700 py-3 hover:bg-gray-900"
      onClick={() => {
        setSelectedMovie(movie);
        isMobile && setIsSideMenuOpen(false);
        window.scrollTo(0, 0);
      }}
    >
      <Poster posterPath={movie.poster_path} alt={movie.title} />
      <div className="ml-4 text-sm">
        <span className="font-bold mb-2 line-clamp-2">{movie.title}</span>
        <RatingStars rating={movie.vote_average} />
        {movie.release_date && (
          <p className="text-gray-500">
            Sortie: {new Date(movie.release_date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
