import { render } from "@testing-library/react";
import { mockMovieDetail } from "./testVariables";
import MovieBackdrop from "../components/MovieBackdrop";

test("renders movie backdrop with backdrop image", () => {
  const { getByAltText } = render(<MovieBackdrop movie={mockMovieDetail} />);
  const backdropImage = getByAltText("banner");
  expect(backdropImage).toBeTruthy();
});

test("renders movie title", () => {
  const { getByText } = render(<MovieBackdrop movie={mockMovieDetail} />);
  const movieTitle = getByText(mockMovieDetail.title);
  expect(movieTitle).toBeTruthy();
});

test("renders rating stars", () => {
  const { getByTestId } = render(<MovieBackdrop movie={mockMovieDetail} />);
  const ratingStars = getByTestId("rating-stars");
  expect(ratingStars).toBeTruthy();
});

test("renders placeholder icon if no backdrop image is available", () => {
  const movieWithoutBackdrop = { ...mockMovieDetail, backdrop_path: null };
  const { getByTestId } = render(
    <MovieBackdrop movie={movieWithoutBackdrop} />
  );
  const placeholderIcon = getByTestId("placeholder-icon");
  expect(placeholderIcon).toBeTruthy();
});
