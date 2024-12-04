import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast"; // Optional for notifications
import logger from "../utils/logger"; // Optional for logging

const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const token =
          localStorage.getItem("token") || localStorage.getItem("studentToken");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        const res = await api.get("/api/librarian/auth/me", {
          headers: {
            Authorization: token,
          },
        });

        if (res.status === 200) {
          setAuthUser(res.data); // Ensure user data is stored, not the entire response
        } else {
          throw new Error(res.data?.message || "Failed to fetch user data.");
        }
      } catch (error) {
        logger.error("Error fetching auth user:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to authenticate. Please log in again."
        );
        localStorage.clear(); // Clear tokens to avoid infinite retry
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {!isLoading ? children : <div>Loading...</div>}{" "}
      {/* Handle loading state */}
    </AuthContext.Provider>
  );
};
