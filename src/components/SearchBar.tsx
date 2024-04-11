import axios from "axios";
import { Movie } from "../types";
import { SearchRounded } from "@mui/icons-material";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../env";
import { FunctionComponent } from "react";

interface SearchBarProps {
  setMovies: (movies: Movie[]) => void;
  handleSearch: (args: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  setMovies,
  handleSearch,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    handleSearch(newQuery);
    setTimeout(async () => {
      if (newQuery.length >= 3) {
        try {
          const response = await axios.get(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${newQuery}`
          );
          const movies = response.data.results;
          setMovies(movies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setMovies([]);
      }
    }, 500);
  };

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchRounded />
      </div>
      <input
        type="search"
        id="default-search"
        onChange={handleInputChange}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search a movie..."
        required
      />
    </div>
  );
};

export default SearchBar;
