import { useState } from "react";
import logger from "../utils/logger";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useStudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const studentLogin = async ({ roll_no, password }) => {
    setLoading(true);

    try {
      const res = await api.post("/api/student/auth/student-login", {
        roll_no,
        password,
      });

      localStorage.setItem("studentToken", res.data.access_token);
      toast.success(res.data.message);
      navigate("/students/dashboard");
    } catch (error) {
      // logger.error("Student Login Error:", error);

      if (error.response) {
        // Errors returned by the server
        const { status, data } = error.response;

        if (status === 401) {
          toast.error(data.errors);
        } else if (status === 400) {
          toast.error(data.errors || "Invalid request. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try later.");
        }
      } else if (error.request) {
        // Network error (request was made but no response received)
        toast.error("Unable to connect to the server. Check your network.");
      } else {
        // Other unknown errors
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { studentLogin, loading };
};

export default useStudentLogin;
