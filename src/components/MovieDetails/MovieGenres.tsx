import { Genre } from "../../types";

interface MovieGenresProps {
  movieGenreIds: { id: number }[];
  allGenres: Genre[];
}

const MovieGenres = ({ movieGenreIds, allGenres }: MovieGenresProps) => {
  return (
    <div className="flex flex-wrap items-center md:mb-4">
      {movieGenreIds.map((genre) => {
        const name = allGenres.find((g) => g.id === genre.id)?.name;
        if (!name) return null;

        return (
          <p
            key={genre.id}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 m-1 mr-2"
          >
            {name.replace(/\s/g, "\u00A0")}
          </p>
        );
      })}
    </div>
  );
};

export default MovieGenres;
