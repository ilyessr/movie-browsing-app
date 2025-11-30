import { CrewMember } from "../../types";

interface MovieCrewProps {
  director?: CrewMember | null;
  writer?: CrewMember | null;
}

const MovieCrew = ({ director, writer }: MovieCrewProps) => {
  if (!director && !writer) return null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {director && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Director
          </h3>
          <p className="text-gray-200 text-base mt-1">{director.name}</p>
        </div>
      )}

      {writer && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Writer
          </h3>
          <p className="text-gray-200 text-base mt-1">{writer.name}</p>
        </div>
      )}
    </section>
  );
};

export default MovieCrew;
