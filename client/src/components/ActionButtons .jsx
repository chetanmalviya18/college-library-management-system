import { IconButton } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";

const ActionButtons = ({ onAdd, onDelete }) => {
  return (
    <div className="flex items-center space-x-4">
      <IconButton color="primary" onClick={onAdd}>
        <CgAdd />
      </IconButton>
      {/* <IconButton color="secondary" onClick={onDelete}>
        <FiDelete />
      </IconButton> */}
    </div>
  );
};

export default ActionButtons;
