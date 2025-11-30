import Fallback from "../Fallback";

interface Props {
  profilePath?: string | null;
  alt: string;
  width?: number; // px
}

const CastAvatar = ({ profilePath, alt, width = 128 }: Props) => {
  const w = `${width}px`;

  return (
    <div
      style={{ width: w }}
      className="aspect-[2/3] rounded-md overflow-hidden bg-gray-800 shadow-lg"
    >
      {profilePath ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={alt}
          className="w-full h-full object-cover object-top"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        <Fallback width="w-full" height="h-full" rounded="rounded-md" />
      )}
    </div>
  );
};

export default CastAvatar;
