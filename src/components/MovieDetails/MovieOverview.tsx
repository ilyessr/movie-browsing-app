interface MovieOverviewProps {
  overview: string;
}

const MovieOverview = ({ overview }: MovieOverviewProps) => {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-300 mb-2 uppercase tracking-wide">
        Overview
      </h2>

      <p className="text-gray-200 leading-relaxed">{overview}</p>
    </section>
  );
};

export default MovieOverview;
