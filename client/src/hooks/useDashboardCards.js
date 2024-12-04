import { useEffect, useState } from "react";
import api from "../api/api";
import logger from "../utils/logger";

const useDashboardCards = () => {
  const [borrowInfo, setBorrowInfo] = useState([]);
  const [booksInfo, setBooksInfo] = useState([]);
  const [unReturnedBooksInfo, setUnReturnedBooksInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/borrow/", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!res) throw new Error(res.error);
        setBorrowInfo(res.data);
        // console.log(res.data);
      } catch (error) {
        logger.error("Dashboard cards Error:", error);
        // console.error("Dashboard cards Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/borrow/un-returned-books", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!res) throw new Error(res.error);
        setUnReturnedBooksInfo(res.data);
        // console.log(res.data);
      } catch (error) {
        logger.error("Dashboard cards Error:", error);
        // console.error("Dashboard cards Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get("/api/books/", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (!resp) throw new Error(resp.error);

        setBooksInfo(resp.data);
      } catch (error) {
        logger.error("Dashboard cards Error:", error);
        // console.error("Dashboard cards Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { loading, borrowInfo, booksInfo, unReturnedBooksInfo };
};

export default useDashboardCards;
