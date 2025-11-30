import { useLocation } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import Layout from "../layout/Layout";
import { useFilter } from "../context/FilterContext";
import { genresData } from "../data/genreMetadata";
import { useMoviesByGenre } from "../api/hooks";
import { usePopularMovies } from "../api/hooks/usePopularMovies";

const HomePage = () => {
  const { selectedGenreId } = useFilter();
  const location = useLocation();

  const isPopular = location.pathname === "/popular";
  const isGenreSelected = selectedGenreId !== 0;

  const {
    data: moviesOfGenre,
    isLoading: genreLoading,
    error: genreError,
  } = useMoviesByGenre(selectedGenreId);

  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError,
  } = usePopularMovies();

  let title = "Popular";
  let subtitle = "Discover trending films loved by many viewers.";

  // GENRE PRIORITY
  if (isGenreSelected) {
    const genre = genresData[selectedGenreId];
    title = genre?.name ?? "Genre";
    subtitle = genre?.description ?? "Explore movies of this genre.";
  }

  const movies = isGenreSelected ? moviesOfGenre : popularMovies;
  const loading = isGenreSelected ? genreLoading : popularLoading;
  const error = isGenreSelected ? genreError : popularError;

  return (
    <Layout>
      <MovieGrid
        movies={movies ?? []}
        title={title}
        subtitle={subtitle}
        isLoading={loading}
        error={error}
      />
    </Layout>
  );
};

export default HomePage;
