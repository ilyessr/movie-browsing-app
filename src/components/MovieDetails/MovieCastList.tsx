import { Actor } from "../../types";

interface Props {
  cast: Actor[];
}

const MovieCastList = ({ cast }: Props) => {
  return (
    <div className="mb-4 text-white">
      <p className="text-lg font-semibold my-2">Cast:</p>
      <ul className="flex flex-wrap">
        {cast.map((actor) => (
          <li key={actor.id} className="mr-5 mb-4">
            <div className="flex items-center">
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="object-cover w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-semibold">{actor.name}</p>
                <p className="text-gray-500">{actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCastList;
