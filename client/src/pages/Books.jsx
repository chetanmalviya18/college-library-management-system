import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import useBooks from "../hooks/useBooks";
import toast from "react-hot-toast";

const Books = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create", "update"
  const [selectedBook, setSelectedBook] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [yearOfPublication, setYearOfPublication] = useState("");
  const [ISBN, setISBN] = useState("");
  const [courseType, setCourseType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");

  const { handleAddBook, books, handleUpdateBook, handleDeleteBook } =
    useBooks();
  const dat = books;

  const handleOpenModal = (type, book = null) => {
    setModalType(type);
    setSelectedBook(book);

    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublisher(book.publisher || "");
      setYearOfPublication(book.yearOfPublication || "");
      setISBN(book.ISBN || "");
      setCourseType(book.courseType || "");
      setQuantity(book.quantity || "");
    } else {
      setTitle("");
      setAuthor("");
      setPublisher("");
      setYearOfPublication("");
      setISBN("");
      setCourseType("");
      setQuantity("");
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };

  // const deleteBook = (id) => {
  //   // handleDeleteBook({ id });
  //   console.log(id);
  // };

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !ISBN) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // setLoading(true);

    try {
      if (modalType === "create") {
        await handleAddBook({
          title,
          author,
          publisher,
          yearOfPublication,
          ISBN,
          courseType,
          quantity,
        });
        // toast.success("Book added successfully!");
      } else {
        await handleUpdateBook({
          id: selectedBook.id,
          title,
          author,
          publisher,
          yearOfPublication,
          ISBN,
          courseType,
          quantity,
        });
        // toast.success("Book updated successfully!");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save book. Please try again.");
    } // finally {
    //   setLoading(false);
    // }
  };

  // Filter books based on search term
  const filteredBooks = dat.books?.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6 bg-gray-100 flex flex-col space-y-6">
        <Typography variant="h4" component={"h1"}>
          Books
        </Typography>

        {/* Search and Total Count */}
        <div className="flex justify-between items-center mb-4">
          <TextField
            label="Search Books"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            style={{ maxWidth: "300px" }}
          />
          <Typography variant="h6">
            Total Books: {filteredBooks?.length || 0}
          </Typography>
        </div>

        {/* Create Button */}
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("create")}
          >
            Add New Book
          </Button>
        </div>

        {/* Books Table */}
        <div className="bg-white shadow rounded-md p-4 flex-grow overflow-y-auto">
          <Typography variant="h6" className="mb-4">
            Book List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell>Course Type</TableCell>
                <TableCell>Year Of Publication</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks?.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.ISBN}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.courseType}</TableCell>
                  <TableCell>{book.yearOfPublication}</TableCell>
                  <TableCell>{book.quantity}</TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenModal("update", book)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Modal for Create/Update */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            className="absolute top-1/2 left-1/2 bg-white p-6 rounded-md shadow "
            style={{
              transform: "translate(-50%, -50%)",
              minWidth: "400px",
              outline: "none",
            }}
          >
            <Typography
              variant="h5"
              component={"h2"}
              className="mb-4 flex justify-center"
            >
              {modalType === "create" ? "Add New Book" : "Edit Book"}
            </Typography>
            <form className="flex flex-col space-y-4 w-full">
              <TextField
                label="Book Title"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextField
                label="Publisher"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
              <TextField
                label="Year Of Publication"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={yearOfPublication}
                onChange={(e) => setYearOfPublication(e.target.value)}
              />
              <TextField
                label="ISBN"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
              />
              <TextField
                label="Course Type"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
              />
              <TextField
                label="Quantity"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <div className="flex justify-end space-x-4">
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitBook}
                >
                  {modalType === "create" ? "Add Book" : "Save Changes"}
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Books;

// import { useState } from "react";
// import useBooks from "../hooks/useBooks";
// import Sidebar from "../components/Sidebar";
// import { Button, Typography } from "@mui/material";
// import SearchBar from "../components/SearchBar";
// import BooksTable from "../components/BooksTable";
// import BooksModal from "../components/BooksModal";

// const Books = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); // "create", "update"
//   const [selectedBook, setSelectedBook] = useState(null);

//   const [formData, setFormData] = useState({});
//   const [filters, setFilters] = useState({});

//   const { handleAddBook, books } = useBooks();
//   const dat = books;
//   console.log(books);

//   const handleOpenModal = (type, book = null) => {
//     setModalType(type);
//     setSelectedBook(book);
//     setFormData(book || {});
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedBook(null);
//     setFormData({});
//   };

//   const handleSubmitBook = () => {
//     if (modalType === "create") handleAddBook(formData);
//     //  if (modalType === "update") handleUpdateBook(formData);
//     handleCloseModal();
//   };

//   const filteredBooks = dat.books?.filter((book) => {
//     return Object.keys(filters).every((key) =>
//       book[key]?.toLowerCase().include(filters[key]?.toLowerCase())
//     );
//   });

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="w-full lg:w-4/5 p-6 bg-gray-100 flex flex-col space-y-6">
//         <Typography variant="h4">Books</Typography>

//         {/* Search Bar */}
//         <SearchBar filters={filters} setFilters={setFilters} />

//         {/* Create Button */}
//         <div className="flex justify-end">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleOpenModal("create")}
//           >
//             Add New Book
//           </Button>
//         </div>

//         {/* Books Table */}
//         <BooksTable
//           books={filteredBooks}
//           onEdit={(book) => handleOpenModal("update", book)}
//           // onDelete={handleDeleteBook}
//         />

//         {/* Modal for Create/Update */}
//         <BooksModal
//           open={openModal}
//           onClose={handleCloseModal}
//           modalType={modalType}
//           selectedBook={selectedBook}
//           handleSubmit={handleSubmitBook}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default Books;
