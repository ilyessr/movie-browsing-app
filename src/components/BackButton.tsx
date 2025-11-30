import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleBack = () => {
    if (path.startsWith("/popular/movie")) {
      navigate("/popular");
      return;
    }

    if (path.startsWith("/trending/movie")) {
      navigate("/trending");
      return;
    }

    if (path.startsWith("/genre") && path.includes("/movie")) {
      const genreId = path.split("/")[2];
      navigate(`/genre/${genreId}`);
      return;
    }

    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      aria-label="Go back"
      className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-black/60 px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base text-white shadow-lg shadow-black/30 backdrop-blur-lg transition-all duration-200 hover:bg-black/70 hover:border-amber-400 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <FiArrowLeft className="text-base sm:text-lg" />
      <span className="font-semibold tracking-wide">Back</span>
    </button>
  );
};

export default BackButton;
