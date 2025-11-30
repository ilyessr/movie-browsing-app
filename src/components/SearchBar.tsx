import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchRounded } from "@mui/icons-material";
import { useClickOutside } from "../hooks/useClickOutside";
import Fallback from "../components/Fallback";
import { motion, AnimatePresence } from "framer-motion";
import { useMovieSearch } from "../api/hooks";

const SearchBar = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  useClickOutside(wrapperRef, () => setFocused(false));
  const debounceRef = useRef<number | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data } = useMovieSearch(debouncedQuery);

  const results = data?.results;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const showDropdown =
    focused && debouncedQuery.length >= 3 && results && results.length > 0;

  return (
    <div ref={wrapperRef} className="relative mb-6">
      <div className="flex items-center bg-gray-900 border border-zinc-700 rounded-xl px-4">
        <SearchRounded className="pointer-events-none" />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search a movie..."
          className="w-full p-4 text-sm text-white bg-gray-900 outline-none"
        />
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="
              absolute mt-2 w-full max-h-[320px] overflow-y-auto
              bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-30
              scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
            "
          >
            {results.slice(0, 10).map((movie) => (
              <li
                key={movie.id}
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                  setFocused(false);
                }}
                className="
                  flex items-center gap-4 px-4 py-2 cursor-pointer
                  hover:bg-gray-800 transition-colors duration-100
                "
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded-md shadow-md"
                  />
                ) : (
                  <Fallback width="40px" height="56px" rounded="rounded-md" />
                )}

                <div className="flex flex-col">
                  <span className="font-semibold text-white text-sm line-clamp-1">
                    {movie.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "Unknown year"}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
