import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const handleRegisterSubmit = async ({
    name,
    email,
    password,
    password_confirmation,
  }) => {
    setLoading(true);

    try {
      const res = await api.post("/api/librarian/auth/librarian-register", {
        name,
        email,
        password,
        password_confirmation,
      });

      // setAuthUser(data);
      toast.success(res.data.message);

      navigate("/librarian--7239");
    } catch (error) {
      // logger.error("Registration Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.errors || "Validation error. Please check inputs.");
        } else if (status === 409) {
          // Conflict error (e.g., email already registered)
          toast.error(data.message);
        } else {
          // General server error
          toast.error("Registration failed. Please try again.");
        }
      } else if (error.request) {
        // Network error
        toast.error("Unable to connect to the server. Check your network.");
      } else {
        // Unknown error
        toast.error("An unexpected error occurred. Please try later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleRegisterSubmit };
};

export default useRegister;
