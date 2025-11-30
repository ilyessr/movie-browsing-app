import Poster from "../Poster";
import MovieCastList from "./MovieCastList";
import MovieGenres from "./MovieGenres";
import MovieRatingSection from "./MovieRating";
import MovieOverview from "./MovieOverview";
import MovieCrew from "./MovieCrew";
import MovieMeta from "./MovieMeta";
import { Actor, CrewMember, MovieDetailWithCredits } from "../../types";

interface Props {
  movie: MovieDetailWithCredits;
  director: CrewMember | null;
  writer: CrewMember | null;
  spokenLanguages: string;
  cast: Actor[];
}

const MovieDetailsContent = ({
  movie,
  director,
  writer,
  spokenLanguages,
  cast,
}: Props) => {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-0  sm:py-12">
      <div className="bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl px-4 sm:px-6 lg:px-10 py-8 lg:py-10 border border-white/5">
        <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-12 ">
          <Poster posterPath={movie.poster_path} alt={movie.title} size="big" />

          <div className="md:w-2/3 lg:w-2/3 flex flex-col space-y-8">
            <div className="hidden md:block">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg italic text-gray-300">{movie.tagline}</p>
              )}
            </div>

            <MovieGenres genres={movie.genres} />

            <MovieRatingSection
              rating={movie.vote_average}
              voteCount={movie.vote_count}
            />

            <MovieOverview overview={movie.overview} />

            <MovieCrew director={director} writer={writer} />

            <MovieMeta
              releaseDate={movie.release_date}
              runtime={movie.runtime}
              spokenLanguages={spokenLanguages}
              countries={movie.production_countries.map((c) => c.name)}
            />
          </div>
        </div>
      </div>

      <MovieCastList cast={cast} />
    </div>
  );
};

export default MovieDetailsContent;
