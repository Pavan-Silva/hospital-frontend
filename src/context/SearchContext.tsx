import { createContext, useState } from "react";

type SearchContextType = {
  query: string | null;
  search: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string | null>(null);
  
  const search = (query: string) => {
    setQuery(query);
  };

  return (
    <SearchContext.Provider value={{ query, search }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
