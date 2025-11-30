import { NavLink } from "react-router-dom";
import { MdWhatshot } from "react-icons/md";
import { useFilter } from "../context/FilterContext";

const DiscoverSection = () => {
  const { setSelectedGenreId } = useFilter();

  const isActivePopular = location.pathname.includes(`/popular`);

  return (
    <div
      className="min-h-0"
      onClick={() => {
        setSelectedGenreId(0);
      }}
    >
      <h3 className="text-white text-sm font-semibold mb-2">Discover</h3>

      <NavLink
        to="/popular"
        className={`
          flex items-center px-4 py-2 rounded cursor-pointer transition-all gap-2
              ${
                isActivePopular
                  ? "bg-yellow-500 !text-black"
                  : "hover:bg-gray-800 !text-white"
              }
        `}
      >
        <MdWhatshot className="text-xl" />
        <span className="text-sm">Popular</span>
      </NavLink>
    </div>
  );
};

export default DiscoverSection;
