import React, { useState } from "react";
import { SearchContext } from "./searchContext";

const SearchState = (props) => {
  const [isSearch, setIsSearch] = useState(false);
  const value = { isSearch, setIsSearch };
  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
