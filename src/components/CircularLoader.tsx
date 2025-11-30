const CircularLoader = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="h-10 w-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default CircularLoader;
