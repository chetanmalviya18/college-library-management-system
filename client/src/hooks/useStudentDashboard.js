import React, { useEffect, useState } from "react";
import logger from "../utils/logger";
import api from "../api/api";

const useStudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res1 = await api.get("/api/borrow/student", {
          headers: {
            Authorization: `${localStorage.getItem("studentToken")}`,
          },
        });

        const res2 = await api.get("/api/librarian/auth/me", {
          headers: {
            Authorization: `${localStorage.getItem("studentToken")}`,
          },
        });
        // console.log(res.data);
        setUser(res2.data.user);
        // console.log(res.data);
        setRecords(res1.data.borrowRecords);
      } catch (error) {
        logger.error("Librarian Login Error:", error);
        // console.log("Librarian Login Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const res = await api.get("/api/librarian/auth/me", {
  //           headers: {
  //             Authorization: `${localStorage.getItem("token")}`,
  //           },
  //         });
  //         // console.log(res.data);
  //         setUser(res.data);
  //       } catch (error) {
  //         logger.error("Librarian Login Error:", error);
  //         // console.log("Librarian Login Error:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     })();
  //   }, []);

  return { loading, records, user };
};

export default useStudentDashboard;
