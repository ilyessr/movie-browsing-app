import { FunctionComponent, useState, Suspense, lazy } from "react";
import { Movie } from "../types";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";
import MoviePopulars from "../components/MoviePopulars";

const SideMenu = lazy(() => import("../components/SideMenu"));
const MovieDetails = lazy(() => import("../components/MovieDetails"));

const Home: FunctionComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const classMarginLeft = isSideMenuOpen ? `ml-[352px]` : `ml-[24px]`;

  return (
    <div className="h-full bg-gray-900">
      <Suspense fallback={<div>Loading Side Menu...</div>}>
        <SideMenu
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
        >
          <div className="w-full">
            <h1 className="text-center text-xl font-semibold text-yellow-500 my-4 uppercase">
              Welcome to our movie application
            </h1>
            <p className="text-center text-base text-white mb-4">
              Discover the latest movies, find detailed information about your
              favorite films, and much more!
            </p>
            <SearchBar
              setMovies={setMovies}
              handleSearch={(e: string) => setSearch(e)}
            />
            <div className="h-full overflow-auto">
              <div className="h-fit flex flex-col mb-20">
                {movies.length === 0 ? (
                  <p className="text-white text-center mt-8">
                    {search.length >= 3
                      ? "No movies found. Try using the search bar to find movies."
                      : ""}
                  </p>
                ) : (
                  movies.map((movie) => (
                    <MovieItem
                      key={movie.id}
                      movie={movie}
                      setSelectedMovie={() => setSelectedMovieId(movie.id)}
                      setIsSideMenuOpen={setIsSideMenuOpen}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </SideMenu>
      </Suspense>

      <div
        className={`flex flex-col ${classMarginLeft} h-full w-auto mb-[80px]`}
      >
        <Suspense fallback={<div>Loading Movie Details...</div>}>
          {selectedMovieId ? (
            <MovieDetails
              movieID={selectedMovieId}
              setSelectedMovieId={setSelectedMovieId}
            />
          ) : (
            <MoviePopulars setSelectedMovieId={setSelectedMovieId} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
