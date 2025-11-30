import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Movie } from "../types";
import RatingStars from "./RatingStars";
import Fallback from "./Fallback";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  let movieUrl = `/movie/${movie.id}`;

  if (pathname.startsWith("/popular")) {
    movieUrl = `/popular/movie/${movie.id}`;
  } else if (pathname.startsWith("/genre")) {
    const genreId = pathname.split("/")[2];
    movieUrl = `/genre/${genreId}/movie/${movie.id}`;
  }

  return (
    <Link
      to={movieUrl}
      className="block bg-gray-950 text-white rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
    >
      <div className="overflow-hidden aspect-[2/3]">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = "/fallback.jpg")
            }
          />
        ) : (
          <Fallback />
        )}
      </div>

      <div className="p-3">
        <h3 className="text-white text-base font-semibold line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400">
          {movie.release_date?.slice(0, 4) ?? "Unknown year"}
        </p>
        <RatingStars rating={movie.vote_average} />
      </div>
    </Link>
  );
};

export default memo(MovieCard);
