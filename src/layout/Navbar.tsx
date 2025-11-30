import { TbMovie } from "react-icons/tb";
import { FiSidebar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useFilter } from "../context/FilterContext";

const Navbar = ({ handleSideMenuOpen }: { handleSideMenuOpen: () => void }) => {
  const { setSelectedGenreId } = useFilter();

  return (
    <nav className="z-50 fixed w-full flex flex-row items-center p-4 bg-black/80">
      <FiSidebar
        onClick={handleSideMenuOpen}
        className="text-2xl size-8 text-white cursor-pointer hover:bg-yellow-500 hover:text-black transition-all duration-300 p-2 rounded-md mx-4"
      />
      <Link
        to="/"
        className="flex flex-row items-center gap-2"
        onClick={() => setSelectedGenreId(0)}
      >
        <TbMovie className="text-2xl text-yellow-500" />
        <span className="text-2xl font-bold text-white">CineMatch</span>
      </Link>
    </nav>
  );
};

export default Navbar;
