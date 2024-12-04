import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useLibrarianLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const librarianLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await api.post(
        "/api/librarian/auth/librarian-login",
        {
          email,
          password,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuthUser(res.data);
      localStorage.setItem("token", res.data.access_token);

      toast.success(res.data.message);
      navigate("/librarian--7239/dashboard");
    } catch (error) {
      // logger.error("Librarian Login Error:", error);

      // Handle different error scenarios
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          toast.error(data.errors || "Incorrect email or password.");
        } else if (status === 400) {
          toast.error(data.errors || "Invalid login credentials.");
        } else {
          // Other server-side errors
          toast.error("Login failed. Please try again later.");
        }
      } else if (error.request) {
        // Network or connection errors
        toast.error("Unable to connect to the server. Check your network.");
      } else {
        // Other unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, librarianLogin };
};

export default useLibrarianLogin;
