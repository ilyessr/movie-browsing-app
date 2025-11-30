import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
        <h1 className="text-7xl font-extrabold mb-4 tracking-tight">404</h1>

        <p className="text-xl text-gray-300 mb-6 text-center max-w-md">
          Oops... This page seems to have vanished into the darkness.
        </p>

        <Link
          to="/"
          className="
          px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold
          hover:bg-yellow-400 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
