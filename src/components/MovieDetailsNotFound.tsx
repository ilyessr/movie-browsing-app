import { FunctionComponent } from "react";

interface NotFoundProps {}

const MovieDetailsNotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full bg-gray-900 mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-8">
      <div className="text-center">
        <p className="text-lg text-white mb-8">No movies have been found.</p>
      </div>
    </div>
  );
};

export default MovieDetailsNotFound;
