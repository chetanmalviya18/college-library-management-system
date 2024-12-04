import { useState } from "react";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useCheckoutBook = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckOut = async ({ bookId, roll_no }) => {
    setLoading(true);

    try {
      const res = await api.post(
        "/api/borrow/",
        {
          bookId,
          roll_no,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      // logger.error("CheckOut Book Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.errors);
        } else if (status === 401) {
          toast.error(data.message);
        } else if (status === 404) {
          toast.error(data.message);
        } else if (status === 409) {
          toast.error(data.message);
        } else {
          toast.error("Failed to checkout book. Please try again later.");
        }
      } else if (error.request) {
        // No response received from the server
        toast.error(
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something went wrong in setting up the request
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleCheckOut };
};

export default useCheckoutBook;
