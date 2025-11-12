import { Language } from "../../types";

interface Props {
  languageCode: string;
  runtime: number | null;
  releaseDate: string;
  languages: Language[];
}

const MovieInfosSection = ({
  languageCode,
  runtime,
  releaseDate,
  languages,
}: Props) => {
  const language = languages.find(
    (l) => l.iso_639_1 === languageCode
  )?.english_name;

  return (
    <div className="border-t border-b border-gray-300 py-4 my-4 flex text-white justify-between flex-col">
      {language && (
        <p>
          <span className="font-semibold">Original Language: </span>
          {language}
        </p>
      )}
      {typeof runtime === "number" && (
        <p>
          <span className="font-semibold">Duration:</span> {runtime} min
        </p>
      )}
      {releaseDate && (
        <p>
          <span className="font-semibold">Release Date:</span>{" "}
          {new Date(releaseDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default MovieInfosSection;
