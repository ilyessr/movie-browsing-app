import { Actor } from "../../types";
import CastAvatar from "./CastAvatar";

interface Props {
  cast: Actor[];
}

const MovieCastList = ({ cast }: Props) => {
  return (
    <div className="mt-8 bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl px-4 sm:px-6 lg:px-10 py-8 lg:py-10 border border-white/5">
      <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-6">
        Main Cast
      </h2>

      <div className="relative">
        <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scrollbar-custom">
          <ul className="flex gap-3">
            {cast.map((actor) => (
              <li
                key={actor.id}
                className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex-shrink-0 flex flex-col items-center text-center group"
              >
                <CastAvatar profilePath={actor.profile_path} alt={actor.name} />

                <div className="mt-3 min-h-[60px] flex flex-col justify-start text-center w-full max-w-32">
                  <p
                    title={actor.name}
                    className="font-semibold text-white text-sm sm:text-base truncate"
                  >
                    {actor.name}
                  </p>
                  <p
                    title={actor.character}
                    className="text-gray-400 text-xs sm:text-sm line-clamp-2"
                  >
                    {actor.character}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCastList;
