import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  // console.log(authUser);

  const handleLogout = () => {
    localStorage.removeItem("token") || localStorage.removeItem("studentToken");
    toast.success("Logout Successfully");
    if (authUser.role === "student") {
      navigate("/");
    } else {
      navigate("/librarian--7239");
    }
  };
  return (
    <Tooltip title="Logout">
      <IconButton size="medium" onClick={handleLogout}>
        <FiLogOut />
      </IconButton>
    </Tooltip>
  );
};

export default LogOut;
