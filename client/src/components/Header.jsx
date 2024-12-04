import { IconButton, TextField } from "@mui/material";
import { BiSearch } from "react-icons/bi";

const Header = ({ onSearch, searchFields }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        {searchFields.map((field, index) => (
          <TextField
            key={index}
            placeholder={field.placeholder}
            onChange={(e) => field.onChange(e.target.value)}
          />
        ))}
        <IconButton color="primary" onClick={onSearch}>
          <BiSearch />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
