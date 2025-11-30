import RatingStars from "./RatingStars";
import { MovieDetailWithCredits } from "../types";
import Fallback from "./Fallback";

interface Props {
  movie: MovieDetailWithCredits;
}

const MovieBackdrop = ({ movie }: Props) => {
  const backdrop = movie.backdrop_path;

  const imageUrl = `https://image.tmdb.org/t/p/w1280${backdrop}`;

  return (
    <div className="relative w-full h-[42vh] sm:h-[48vh] lg:h-[52vh] min-h-[240px] max-h-[520px] bg-gray-900 overflow-hidden">
      {movie.backdrop_path ? (
        <img
          src={imageUrl}
          alt="banner"
          className="w-full h-full object-cover object-[center_20%]"
        />
      ) : (
        <Fallback height="h-full" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-gray-900/40 to-gray-900" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-900/90 to-transparent" />

      <div className="absolute bottom-6 left-0 right-0 z-30">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-xl">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-base md:text-lg italic text-gray-200 mt-1 drop-shadow-lg">
              {movie.tagline}
            </p>
          )}

          <div className="mt-2">
            <RatingStars rating={movie.vote_average} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBackdrop;
