import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { FunctionComponent } from "react";
import { MovieDetail } from "../types";
import RatingStars from "./RatingStars";

interface Props {
  movie: MovieDetail;
}

const MovieBackdrop: FunctionComponent<Props> = ({ movie }) => {
  const backdrop = movie.backdrop_path;

  const renderContent = () => (
    <div className="absolute bottom-0 left-0  mb-4 px-4 md:px-6 lg:px-8 xl:px-10">
      <h2 className="text-white text-2xl font-semibold pb-2">{movie.title}</h2>
      <RatingStars rating={movie.vote_average} />
    </div>
  );

  if (backdrop) {
    return (
      <div className="relative overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop}`}
          alt="banner"
          className="object-cover object-center w-full h-[350px] min-h-[24px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 " />
        {renderContent()}
      </div>
    );
  } else {
    return (
      <div
        data-testid="placeholder-icon"
        className="relative w-full h-[350px] min-h-[200px] overflow-hidden bg-gray-800 flex justify-center items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <MovieCreationIcon style={{ fontSize: 100 }} />

        {renderContent()}
      </div>
    );
  }
};

export default MovieBackdrop;
