import { useEffect, useState } from "react";
import api from "../api/api";
import logger from "../utils/logger";
import toast from "react-hot-toast";

const useBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  //add books
  const handleAddBook = async ({
    title,
    author,
    publisher,
    yearOfPublication,
    ISBN,
    courseType,
    quantity,
  }) => {
    setLoading(true);

    try {
      const res = await api.post(
        "/api/books/add-book",
        {
          title,
          author,
          publisher,
          yearOfPublication: parseInt(yearOfPublication),
          ISBN,
          courseType,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res || !res.data) {
        throw new Error("Failed to add book. No response from server.");
      }
      toast.success(res.data.message);
      // If the book is added successfully, fetch the updated book list

      if (res.status === 200) {
        try {
          setLoading(true);

          const bookRes = await api.get("/api/books", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          if (!bookRes || !bookRes.data) {
            throw new Error("Failed to fetch updated book list.");
          }
          setBooks(bookRes.data);
          toast.success("Book list updated successfully!");
        } catch (fetchError) {
          // logger.error("Dashboard cards Error:", fetchError);

          if (fetchError.response) {
            const { status, data } = fetchError.response;

            if (status === 401) {
              toast.error(data.message);
            } else {
              toast.error("Failed to update book list.");
            }
          } else if (fetchError.request) {
            toast.error(
              "No response from server. Please check your connection."
            );
          } else {
            toast.error("An unexpected error occurred while fetching books.");
          }
        }
      }
    } catch (error) {
      logger.error("CheckOut Book Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error("Invalid book data. Please check the fields.");
        } else if (status === 401) {
          toast.error(data.message);
        } else if (status === 409) {
          toast.error(data.message);
        } else {
          toast.error(data.message || "Failed to add book. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred while adding the book.");
      }
    } finally {
      setLoading(false);
    }
  };

  //update books
  const handleUpdateBook = async ({
    id,
    title,
    author,
    publisher,
    yearOfPublication,
    ISBN,
    courseType,
    quantity,
  }) => {
    setLoading(true);

    try {
      const res = await api.patch(
        `/api/books/update-book/${id}`,
        {
          title: title,
          author: author,
          publisher: publisher,
          yearOfPublication: parseInt(yearOfPublication),
          ISBN: ISBN,
          courseType: courseType,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);
      if (res.status === 200) {
        try {
          setLoading(true);

          const fetchRes = await api.get("/api/books", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          if (fetchRes && fetchRes.data) {
            setBooks(fetchRes.data);
          } else {
            throw new Error("Failed to fetch updated books data.");
          }
          toast.success("Book list updated successfully!");
        } catch (fetchError) {
          // logger.error("Dashboard cards Error:", fetchError);

          if (fetchError.response) {
            const { status, data } = fetchError.response;

            if (status === 401) {
              toast.error(data.message);
            } else {
              toast.error("Failed to update book list.");
            }
          } else if (fetchError.request) {
            toast.error(
              "No response from server. Please check your connection."
            );
          } else {
            toast.error("An unexpected error occurred while fetching books.");
          }
        }
      }
    } catch (error) {
      logger.error("CheckOut Book Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.errors);
        } else if (status === 401) {
          toast.error(data.message);
        } else if (status === 404) {
          toast.error(data.message);
        } else {
          toast.error(
            data.message || "Failed to update the book. Please try again."
          );
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

  //get books
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/books", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!res) throw new Error(res.error);
        setBooks(res.data);
        // console.log(res.data);
      } catch (error) {
        logger.error("Dashboard cards Error:", error);
        // console.error("Dashboard cards Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //delete books
  const handleDeleteBook = async (id) => {
    setLoading(true);

    try {
      const res = await api.delete(`/api/books/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        try {
          setLoading(true);

          const fetchRes = await api.get("/api/books", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          if (fetchRes && fetchRes.data) {
            setBooks(fetchRes.data);
          } else {
            throw new Error("Failed to fetch updated books data.");
          }
        } catch (fetchError) {
          // logger.error("Dashboard cards Error:", fetchError);

          if (fetchError.response) {
            const { status, data } = fetchError.response;

            if (status === 401) {
              toast.error(data.message);
            } else {
              toast.error("Failed to update book list.");
            }
          } else if (fetchError.request) {
            toast.error(
              "No response from server. Please check your connection."
            );
          } else {
            toast.error("An unexpected error occurred while fetching books.");
          }
        }
      }
    } catch (error) {
      logger.error("CheckOut Book Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          toast.error(data.message);
        } else if (status === 404) {
          toast.error("Book not found. Please check the ID.");
        } else {
          toast.error("Failed to delete the book. Please try again.");
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

  return { loading, handleAddBook, books, handleUpdateBook, handleDeleteBook };
};

export default useBooks;
