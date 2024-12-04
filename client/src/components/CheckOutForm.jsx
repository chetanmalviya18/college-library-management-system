import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";
import useDashboardCards from "../hooks/useDashboardCards";
import useCheckoutBook from "../hooks/useCheckoutBook";

const CheckOutForm = () => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  // const [issue, setStudentRollNo] = useState("");

  const { booksInfo } = useDashboardCards();
  const { handleCheckOut } = useCheckoutBook();

  const handleCheckOutBook = (e) => {
    e.preventDefault();
    // console.log(selectedBooks);
    // console.log(studentRollNo);
    const bookId = selectedBooks;
    const roll_no = studentRollNo;
    handleCheckOut({ bookId, roll_no });
    setSelectedBooks([]);
    setStudentRollNo("");
  };

  const handleSelectBook = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter books based on search term
  const filteredBooks = booksInfo.books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-2">
      {/* Header */}
      <Typography variant="h6" className="mb-4">
        Check Out Books
      </Typography>

      {/* Borrower Information Section */}
      <div className="flex flex-col justify-center md:flex-row space-y-2 md:space-y-0 md:space-x-4 bg-white p-3 shadow rounded-lg">
        <TextField
          label="Search Books"
          variant="outlined"
          placeholder="Search by title, author, or ISBN"
          // fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: { backgroundColor: "#f5f5f5" },
          }}
        />

        <TextField
          label="Student Roll No."
          variant="outlined"
          placeholder="Enter Student Roll No."
          value={studentRollNo}
          onChange={(e) => setStudentRollNo(e.target.value)}
          InputProps={{
            style: { backgroundColor: "#f5f5f5" },
          }}
        />
      </div>

      {/* Student Roll Number */}
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"></div> */}

      {/* Books Selection Table */}
      <div className="flex-grow h-[1000px] overflow-y-auto shadow rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Select</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Publisher</th>
              <th className="p-3 text-left">Course Type</th>
              <th className="p-3 text-left">ISBN</th>
              <th className="p-3 text-left">Year Of Publication</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks?.map((book, index) => (
              <tr key={index}>
                <td className="p-3 text-center">
                  <Checkbox
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => handleSelectBook(book.id)}
                  />
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.publisher}</td>
                <td className="p-3">{book.courseType}</td>
                <td className="p-3">{book.ISBN}</td>
                <td className="p-3">{book.yearOfPublication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center space-y-3">
        <Button
          color="success"
          variant="contained"
          onClick={handleCheckOutBook}
        >
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default CheckOutForm;
