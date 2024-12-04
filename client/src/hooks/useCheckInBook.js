import { useState } from "react";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useCheckInBook = () => {
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);

  const handleSearchRecords = async ({ roll_no }) => {
    setLoading(true);
    try {
      const res = await api.get("/api/borrow/records", {
        params: { roll_no: roll_no },
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      //console.log(res.data);

      setData1(res.data);
    } catch (error) {
      logger.error("Error fetching borrow records:", error);
      // console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async ({ borrowId }) => {
    setLoading(true);

    try {
      const res = await api.put(
        "/api/borrow/return",
        { borrowId },
        {
          method: "PUT",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Book checked in successfully.");
    } catch (error) {
      logger.error("Error during book check-in:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          toast.error(data.message);
        } else if (status === 401) {
          toast.error(data.message);
        } else {
          toast.error("Failed to check in the book. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleSearchRecords, data1, handleCheckIn, setData1 };
};

export default useCheckInBook;
