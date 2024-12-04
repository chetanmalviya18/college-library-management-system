import { useEffect, useState } from "react";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useStudents = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  //get all students
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/student-curd/get-students", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!res) throw new Error(res.error);
        setData(res.data);
        // console.log(res.data);
      } catch (error) {
        logger.error("Dashboard cards Error:", error);
        // console.error("Dashboard cards Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //add student
  const addStudent = async ({
    f_name,
    l_name,
    email,
    password,
    password_confirmation,
    roll_no,
    department,
    course,
    semester,
    year,
  }) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/api/student-curd/add-student",
        {
          f_name,
          l_name,
          email,
          password,
          password_confirmation,
          roll_no,
          department,
          course,
          semester,
          year,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        try {
          setLoading(true);

          const fetchRes = await api.get("/api/student-curd/get-students", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          if (fetchRes && fetchRes.data) {
            setData(fetchRes.data);
          } else {
            throw new Error("Failed to fetch updated student data.");
          }
        } catch (fetchError) {
          // logger.error("Dashboard cards Error:", fetchError);
          toast.error(
            fetchError.response?.data?.message ||
              "Failed to fetch updated student list. Please try again."
          );
        }
      } else {
        throw new Error(res.data.message || "Failed to add student.");
      }
    } catch (error) {
      // logger.error("Dashboard cards Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.errors);
        } else if (status === 401) {
          toast.error(data.message);
        } else if (status === 409) {
          toast.error(data.message);
        } else {
          toast.error(data.message);
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

  return {
    data,
    addStudent,
    loading,
  };
};

export default useStudents;
