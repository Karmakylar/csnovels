import { createContext } from "react";

export const SearchContext = createContext({
  isSearch: false,
  setIsSearch: () => {},
});
