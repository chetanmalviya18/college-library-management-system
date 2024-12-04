/* eslint-disable react/prop-types */
import { IconButton, TextField } from "@mui/material";

import { BiSearch } from "react-icons/bi";

const SearchBar = ({ searchValue, setsearchValue }) => {
  return (
    <div className="flex items-center space-x-2">
      <TextField
        placeholder="Student Roll No"
        variant="outlined"
        style={{ maxWidth: "300px" }}
        value={searchValue}
        onChange={(e) => setsearchValue(e.target.value)}
        fullWidth
      />

      <IconButton color="primary">
        <BiSearch />
      </IconButton>
    </div>
  );
};

export default SearchBar;
