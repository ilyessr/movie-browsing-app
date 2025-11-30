import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);

  return (
    <FilterContext.Provider value={{ selectedGenreId, setSelectedGenreId }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
