import { TextField } from "@material-ui/core";
import React, { useState } from "react";

export const SearchBar = (data = []) => {
  const [search, setSearch] = useState("");
  return (
    <TextField
      id="outlined-basic"
      label="Entre la búsqueda"
      variant="outlined"
      value={search}
    ></TextField>
  );
};
