import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import Layout from "../layout/Layout";
import { useFilter } from "../context/FilterContext";
import { genresData } from "../data/genreMetadata";
import { useMoviesByGenre } from "../api/hooks";
import { usePopularMovies } from "../api/hooks/usePopularMovies";

const HomePage = () => {
  const { selectedGenreId } = useFilter();
  const [page, setPage] = useState(1);
  const isGenreSelected = selectedGenreId !== 0;

  useEffect(() => {
    setPage(1);
  }, [selectedGenreId]);

  const {
    data: moviesOfGenreResponse,
    isLoading: genreLoading,
    isFetching: genreFetching,
    error: genreError,
  } = useMoviesByGenre(selectedGenreId, page);

  const {
    data: popularMoviesResponse,
    isLoading: popularLoading,
    isFetching: popularFetching,
    error: popularError,
  } = usePopularMovies(page);

  let title = "Popular";
  let subtitle = "Discover trending films loved by many viewers.";

  if (isGenreSelected) {
    const genre = genresData[selectedGenreId];
    title = genre?.name ?? "Genre";
    subtitle = genre?.description ?? "Explore movies of this genre.";
  }

  const moviesData = isGenreSelected
    ? moviesOfGenreResponse
    : popularMoviesResponse;
  const movies = moviesData?.results ?? [];
  const totalPages = moviesData?.total_pages ?? 1;
  const loading = isGenreSelected
    ? genreLoading || genreFetching
    : popularLoading || popularFetching;
  const error = isGenreSelected ? genreError : popularError;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <Layout>
      <MovieGrid
        movies={movies ?? []}
        title={title}
        subtitle={subtitle}
        isLoading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default HomePage;
