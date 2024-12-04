import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import useStudentDashboard from "../hooks/useStudentDashboard";
import LogOut from "../components/LogOut";
// import Sidebar from "../components/Sidebar";

const StudentPanel = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { records, user } = useStudentDashboard();

  // console.log(records);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Optional Sidebar */}
      {/* <Sidebar /> */}

      <div className="flex-1 space-y-2 p-4 lg:p-6 bg-gray-50 overflow-auto">
        <Typography
          variant="h4"
          fontWeight="bold"
          className="mb-6 text-center lg:text-left"
        >
          Student Dashboard
        </Typography>
        <div className="flex justify-end ">
          <LogOut />
        </div>

        {/* Personal Information */}
        <Card className="mb-6 shadow-md">
          <CardContent>
            {/* <Typography variant="h6" className="mb-4 text-center lg:text-left">
              Personal Information
            </Typography> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Typography>
                <strong>Name:</strong>
                {`${user?.f_name} ${user?.l_name}`}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography>
                <strong>Student Roll No:</strong> {user?.roll_no}
              </Typography>
              <Typography>
                <strong>Department:</strong> {user?.department}
              </Typography>
              <Typography>
                <strong>Year:</strong> {`${user?.year} Year`}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Borrow Records */}
        <Card className="shadow-md">
          <CardContent>
            <Typography variant="h6" className="mb-4 text-center lg:text-left">
              Borrow Records
            </Typography>
            <div className="overflow-x-auto">
              {records.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Title</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Author</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Borrow Date (MM/DD/YYYY)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Due Date (MM/DD/YYYY)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Return Date (MM/DD/YYYY)</strong>
                      </TableCell>

                      <TableCell>
                        <strong>Delay Fees</strong>{" "}
                      </TableCell>
                      <TableCell>
                        <strong>Status</strong>{" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.book.title}</TableCell>
                          <TableCell>{record.book.author}</TableCell>
                          <TableCell>
                            {new Date(record.issueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(record.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {record.returnDate
                              ? new Date(record.returnDate).toLocaleDateString()
                              : "Not returned"}
                          </TableCell>

                          <TableCell>{record.delayFees} Rs</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                !record.return
                                  ? record.delayFees > 0
                                    ? "bg-red-200 text-red-800"
                                    : "bg-yellow-200 text-yellow-800"
                                  : "bg-green-200 text-green-800"
                                // === "Borrowed"
                                //   ? "bg-yellow-200 text-yellow-800"
                                //   : record.status === "Returned"
                                //   ? "bg-green-200 text-green-800"
                                //   : "bg-red-200 text-red-800"
                              }`}
                            >
                              {!record.return
                                ? record.delayFees > 0
                                  ? "Overdue"
                                  : "Borowed"
                                : "Returned"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography
                  variant="h4"
                  className="flex justify-center items-center"
                >
                  No Borrow Records Available
                </Typography>
              )}
            </div>
            <TablePagination
              component="div"
              count={records.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="mt-4"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPanel;
