interface MovieMetaProps {
  releaseDate: string;
  runtime: number;
  spokenLanguages: string;
  countries: string[];
}

const MovieMeta = ({
  releaseDate,
  runtime,
  spokenLanguages,
  countries,
}: MovieMetaProps) => {
  return (
    <section className="space-y-2 text-gray-300 text-sm border-t border-gray-700 pt-4">
      <p>
        <span className="font-semibold">Release:</span>{" "}
        {new Date(releaseDate).toLocaleDateString()}
      </p>

      <p>
        <span className="font-semibold">Runtime:</span> {runtime} min
      </p>

      <p>
        <span className="font-semibold">Languages:</span> {spokenLanguages}
      </p>

      {countries.length > 0 && (
        <p>
          <span className="font-semibold">Countries:</span>{" "}
          {countries.join(", ")}
        </p>
      )}
    </section>
  );
};

export default MovieMeta;
