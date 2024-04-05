import { FunctionComponent } from "react";
import { FullStarSVG, HalfStarSVG } from "../assets/StarSVG";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: FunctionComponent<RatingStarsProps> = ({ rating }) => {
  const ratingOutOf5 = rating / 2;
  const fullStars = Math.floor(ratingOutOf5);
  const decimal = ratingOutOf5 - fullStars;

  const stars: JSX.Element[] = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FullStarSVG key={i} />);
  }

  if (decimal >= 0.7) {
    stars.push(<FullStarSVG key={stars.length} />);
  } else if (decimal >= 0.4) {
    stars.push(<HalfStarSVG key={stars.length} />);
  }

  return (
    <div data-testid="rating-stars" className="flex">
      {stars}
    </div>
  );
};

export default RatingStars;
