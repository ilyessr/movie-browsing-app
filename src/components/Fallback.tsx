import { FiImage } from "react-icons/fi";

interface FallbackProps {
  width?: string;
  height?: string;
  rounded?: string;
  iconSize?: number;
  className?: string;
}

const Fallback = ({
  width = "w-full",
  height = "h-full",
  rounded = "rounded-lg",
  iconSize = 40,
  className = "",
}: FallbackProps) => {
  return (
    <div
      className={`
        ${width} ${height} ${rounded}
        bg-gray-800/60 border border-gray-700 
        flex items-center justify-center 
        text-gray-500 
        ${className}
      `}
    >
      <FiImage size={iconSize} />
    </div>
  );
};

export default Fallback;
