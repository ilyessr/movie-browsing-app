import { Genre } from "../../types";

interface MovieGenresProps {
  genres: Genre[];
}

const MovieGenres = ({ genres }: MovieGenresProps) => {
  if (genres && genres.length > 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center md:mb-4">
      {genres.map((genre) => {
        return (
          <p
            key={genre.id}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 m-1 mr-2"
          >
            {genre.name}
          </p>
        );
      })}
    </div>
  );
};

export default MovieGenres;
