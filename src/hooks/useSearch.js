import { useState } from "react";

export const useSearch = (initialState) => {
  const [{ search }, setSearch] = useState({ searc: "" });

  const editSearchTerm = ({ target }) => {
    setSearch({ search: target.value });
  };

  const dynamicSearch = () =>
    !search
      ? initialState
      : initialState.filter((data) => {
          return data.nombre.toLowerCase().includes(search.toLowerCase());
        });

  return [search, dynamicSearch, editSearchTerm];
};
