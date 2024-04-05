import { FunctionComponent, useEffect, useState } from "react";
import { Movie } from "../types";
import SideMenu from "../components/SideMenu";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";
import MovieDetails from "../components/MovieDetails";
import usePopularMovies from "../hooks/usePopularMovies";

const Home: FunctionComponent = () => {
  const popularMovies = usePopularMovies();
  const randomIndex = Math.floor(Math.random() * popularMovies.length);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const classMarginLeft = isSideMenuOpen ? `ml-[352px]` : `ml-[24px]`;

  useEffect(() => {
    setSelectedMovie(popularMovies[randomIndex] || null);
  }, [popularMovies]);

  return (
    <div className="h-full bg-gray-900">
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
            favorite films, and much more !
          </p>
          <SearchBar setMovies={setMovies} />
          <div className="h-full overflow-auto">
            <div className="h-fit flex flex-col mb-20">
              {movies.length === 0 ? (
                <p className="text-white text-center mt-8">
                  No movies found. Try using the search bar to find movies.
                </p>
              ) : (
                movies.map((movie) => (
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    setSelectedMovie={setSelectedMovie}
                    setIsSideMenuOpen={setIsSideMenuOpen}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </SideMenu>

      <div
        className={`flex flex-col ${classMarginLeft} h-full w-auto mb-[80px]`}
      >
        {selectedMovie && <MovieDetails movieID={selectedMovie.id} />}
      </div>
    </div>
  );
};

export default Home;
