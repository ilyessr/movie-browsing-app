import { useGenres } from "../api/hooks/useGenres";
import GenreList from "./GenreList";
import SearchBar from "./SearchBar";
import DiscoverSection from "./DiscoverSection";

const SideMenu = ({ isSideMenuOpen }: { isSideMenuOpen: boolean }) => {
  const { data: genres } = useGenres();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen
        bg-gray-950 text-white
        overflow-hidden
        transition-all duration-300 ease-in-out z-50 pt-16 sm:pt-0
        ${isSideMenuOpen ? "w-80" : "w-0"}
      `}
    >
      <div className="p-4 w-80 h-full flex flex-col gap-4">
        <p className="text-center text-sm sm:mt-4">
          Discover the latest movies, find detailed information about your
          favorite films, and much more!
        </p>
        <SearchBar />

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-custom pr-1 space-y-4">
          <DiscoverSection />
          {genres && <GenreList genres={genres} />}
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
