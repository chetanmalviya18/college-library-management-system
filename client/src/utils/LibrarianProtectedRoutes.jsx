import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LibrarianProtectedRoutes = () => {
  const { authUser } = useAuthContext();
  return authUser ? <Outlet /> : <Navigate to={"/librarian--7239"} />;
};

export default LibrarianProtectedRoutes;
