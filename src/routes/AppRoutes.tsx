import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<HomePage />} />
      <Route path="/genre/:id" element={<HomePage />} />
      <Route path="/popular/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/genre/:genreId/movie/:id" element={<MovieDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
