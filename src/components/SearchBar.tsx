import { Genre, Movie } from "../types";
import { SearchRounded } from "@mui/icons-material";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import { useTMDBService } from "../hooks/TMDBServices";
import { CircularProgress } from "@mui/material";

interface SearchBarProps {
  setMovies: (movies: Movie[]) => void;
  handleSearch: (query: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  setMovies,
  handleSearch,
}) => {
  const { useGenres, useMovieSearch } = useTMDBService();
  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [query, setQuery] = useState<string>("");

  // Compute the search query based on the current query and selected genre
  const searchQuery =
    query.length >= 3
      ? `&query=${query}${selectedGenre ? `&with_genres=${selectedGenre}` : ""}`
      : "";

  // Use the hook to get movie search data
  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useMovieSearch(searchQuery);

  // Update movies whenever movieData changes
  useEffect(() => {
    if (movieData) {
      console.log(movieData.results);
      console.log({ selectedGenre });
      const filteredMovies = selectedGenre
        ? movieData.results.filter((movie) =>
            movie.genre_ids.includes(selectedGenre.id)
          )
        : movieData.results;
      console.log("filteredMovies", filteredMovies);
      setMovies(filteredMovies);
    } else {
      setMovies([]);
    }
  }, [movieData, setMovies, selectedGenre]);

  // Debounced search handler to avoid excessive API calls
  const debouncedSearch = useRef((newQuery: string) => {
    const handler = setTimeout(() => {
      handleSearch(newQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }).current;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="relative mb-6">
      {/* Display the progress spinner if genres are loading */}
      {(genresLoading || movieLoading) && (
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10  dark:bg-gray-700 opacity-75">
          <CircularProgress />
        </div>
      )}

      {/* Display the error messages if any */}
      {genresError && (
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2  flex items-center justify-center z-10 bg-gray-50 dark:bg-gray-700">
          <div>Error loading genres</div>
        </div>
      )}

      {movieError && (
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2  flex items-center justify-center z-10 text-white dark:bg-gray-700">
          <div>Error fetching movies</div>
        </div>
      )}

      <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus-within:ring-blue-500 focus-within:border-blue-500">
        <div className="flex items-center ps-3 pointer-events-none">
          <SearchRounded />
        </div>
        <input
          type="search"
          id="search-input"
          value={query}
          onChange={handleInputChange}
          className="w-3/4 p-4 text-sm text-gray-900 bg-gray-50 border-0 rounded dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white focus:ring-0 outline-none"
          placeholder="Search a movie..."
          required
        />
        <select
          value={selectedGenre?.id}
          onChange={(e) => {
            setSelectedGenre(
              genres?.find((genre) => genre.id === parseInt(e.target.value))
            );
          }}
          className="w-24 p-4 text-sm text-gray-900 bg-gray-50 border-0 rounded dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white focus:ring-0"
        >
          <option value="">All Genres</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
