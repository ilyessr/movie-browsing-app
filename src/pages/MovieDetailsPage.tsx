import { useParams } from "react-router-dom";

import Layout from "../layout/Layout";
import NotFoundPage from "./NotFoundPage";
import CircularLoader from "../components/CircularLoader";
import { useMovieDetailWithCredits } from "../api/hooks";
import MovieDetailsHero from "../components/MovieDetails/MovieDetailsHero";
import MovieDetailsContent from "../components/MovieDetails/MovieDetailsContent";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movieID = Number(id);

  const { data: movie, error, isLoading } = useMovieDetailWithCredits(movieID);

  if (!movieID) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full flex justify-center items-center">
          <CircularLoader />
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return <NotFoundPage />;
  }

  const cast = movie.credits?.cast.slice(0, 20) ?? [];

  const director = movie.credits.crew.find((p) => p.job === "Director") || null;

  const writer =
    movie.credits.crew.find(
      (p) => p.job === "Writer" || p.job === "Screenplay" || p.job === "Story"
    ) || null;

  const spokenLanguages =
    movie.spoken_languages?.map((l) => l.english_name).join(", ") || "Unknown";

  return (
    <Layout>
      <MovieDetailsHero movie={movie} />
      <MovieDetailsContent
        movie={movie}
        director={director}
        writer={writer}
        spokenLanguages={spokenLanguages}
        cast={cast}
      />
    </Layout>
  );
};

export default MovieDetailsPage;
