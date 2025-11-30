interface Props {
  rating: number;
  voteCount: number;
}

const MovieRatingSection = ({ rating, voteCount }: Props) => {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-300 mb-2 uppercase tracking-wide">
        Rating
      </h2>
      <div className="mt-1 text-gray-400 text-sm">
        {rating.toFixed(1)} / 10 · {voteCount.toLocaleString()} votes
      </div>
    </section>
  );
};

export default MovieRatingSection;
