import BackButton from "../BackButton";
import MovieBackdrop from "../MovieBackdrop";
import { MovieDetailWithCredits } from "../../types";

interface Props {
  movie: MovieDetailWithCredits;
}

const MovieDetailsHero = ({ movie }: Props) => {
  return (
    <div className="relative w-full">
      <MovieBackdrop movie={movie} />
      <div className="absolute top-4 left-0 right-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsHero;
