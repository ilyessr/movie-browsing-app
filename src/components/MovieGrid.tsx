import CircularLoader from "./CircularLoader";
import MovieCard from "./MovieCard";
import { Movie } from "../types";
import Pagination from "./Pagination";

interface MovieGridProps {
  movies: Movie[];
  title: string;
  subtitle: string;
  isLoading: boolean;
  error: unknown;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const MovieGrid = ({
  movies,
  title,
  subtitle,
  isLoading,
  error,
  page = 1,
  totalPages = 1,
  onPageChange,
}: MovieGridProps) => {
  if (isLoading || !movies) {
    return (
      <div className="h-full flex justify-center items-center">
        <CircularLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Failed to load movies. Please try again later.
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No movies found for this category.
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 pt-8 ">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {title} Movies
      </h2>
      {subtitle && (
        <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      <div className="mx-auto max-w-screen-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {onPageChange && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default MovieGrid;
