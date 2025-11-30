import {
  MdLocalPolice,
  MdExplore,
  MdOutlineTheaters,
  MdTheaterComedy,
  MdGavel,
  MdOutlineMovie,
  MdEmojiEmotions,
  MdFamilyRestroom,
  MdAutoAwesome,
  MdHistoryEdu,
  MdMoodBad,
  MdMusicNote,
  MdHelp,
  MdFavorite,
  MdScience,
  MdTv,
  MdWhatshot,
  MdMilitaryTech,
  MdOutlineLandscape,
  MdMovie,
} from "react-icons/md";

import { NavLink } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import { Genre } from "../types";
import { IconType } from "react-icons";

export const genreIcons: Record<number, IconType> = {
  28: MdLocalPolice,
  12: MdExplore,
  16: MdOutlineTheaters,
  35: MdTheaterComedy,
  80: MdGavel,
  99: MdOutlineMovie,
  18: MdEmojiEmotions,
  10751: MdFamilyRestroom,
  14: MdAutoAwesome,
  36: MdHistoryEdu,
  27: MdMoodBad,
  10402: MdMusicNote,
  9648: MdHelp,
  10749: MdFavorite,
  878: MdScience,
  10770: MdTv,
  53: MdWhatshot,
  10752: MdMilitaryTech,
  37: MdOutlineLandscape,
};

interface GenreListProps {
  genres: Genre[];
}

const GenreList = ({ genres }: GenreListProps) => {
  const { setSelectedGenreId } = useFilter();

  return (
    <div className="flex-1 min-h-0">
      <h3 className="text-white text-sm font-semibold mb-2">Genres</h3>
      <ul className="flex flex-col gap-1 text-white text-sm">
        {genres.map(({ id, name }) => {
          const Icon = genreIcons[id] ?? MdMovie;

          return (
            <li key={id}>
              <NavLink
                to={`/genre/${id}`}
                onClick={() => setSelectedGenreId(id)}
                className={({ isActive }) =>
                  `
                  flex items-center px-4 py-2 rounded transition-all
                  ${
                    isActive
                      ? "bg-yellow-500 !text-black"
                      : "hover:bg-gray-800 !text-white"
                  }
                `
                }
              >
                <Icon className="text-xl mr-2" />
                <span>{name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenreList;
