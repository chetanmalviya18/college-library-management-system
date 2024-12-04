import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useCheckInBook from "../hooks/useCheckInBook";

const CheckInForm = () => {
  const [roll_no, setRoll_no] = useState("");
  const [selectedBorrowId, setSelectedBorrowId] = useState(null);

  const { handleSearchRecords, data1, handleCheckIn, setData1 } =
    useCheckInBook();

  const handleSubmit = async () => {
    handleCheckIn({ borrowId: selectedBorrowId }).then(() => {
      const updatedRecords = data1.filter(
        (record) => record.id !== selectedBorrowId
      );
      setData1(updatedRecords);
      setSelectedBorrowId(null);
    });
  };

  const handleSearch = async () => {
    await handleSearchRecords({ roll_no });
    setRoll_no("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <Typography variant="h5" component="h2" className="mb-4">
        Check In Book
      </Typography>

      {/* Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextField
          label="Student Roll No"
          placeholder="Enter student's roll no"
          variant="outlined"
          fullWidth
          value={roll_no}
          onChange={(e) => setRoll_no(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSearch}
        >
          Search Records
        </Button>
      </div>

      {/* Borrow Records Table */}
      {data1?.length > 0 && (
        <div className="flex-grow overflow-y-auto">
          <Typography variant="h6" className="mb-2">
            Borrow Records
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Book Title</TableCell>
                <TableCell>Student Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Issue Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data1?.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <Button
                      variant={
                        selectedBorrowId === record.id
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => setSelectedBorrowId(record.id)}
                    >
                      {selectedBorrowId === record.id ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                  <TableCell>{record.book.title}</TableCell>
                  <TableCell>{record.student.roll_no}</TableCell>
                  <TableCell>
                    {record.student.f_name} {record.student.l_name}
                  </TableCell>
                  <TableCell>
                    {new Date(record.issueDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-4">
        {selectedBorrowId ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            size="large"
          >
            Submit Check-In
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CheckInForm;
