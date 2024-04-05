import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { FunctionComponent } from "react";

interface PosterProps {
  posterPath: string | null;
  alt: string;
  size?: "small" | "big";
}

const Poster: FunctionComponent<PosterProps> = ({
  posterPath,
  alt,
  size = "small",
}) => {
  let width = "w-[56px]";
  let height = "h-[84px]";

  if (size === "big") {
    width = "w-[288px]";
    height = "h-[432px]";
  }

  return (
    <>
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={alt}
          className={`object-cover ${width} min-${width} h-fit flex`}
        />
      ) : (
        <div
          className={`bg-gray-800 ${width} min-[${width}] ${height} flex flex-shrink-0 items-center justify-center mr-4`}
        >
          <MovieCreationIcon style={{ fontSize: size === "big" ? 100 : "" }} />
        </div>
      )}
    </>
  );
};

export default Poster;
