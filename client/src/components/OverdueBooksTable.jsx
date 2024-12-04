/* eslint-disable react/display-name */
import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import useDashboardCards from "../hooks/useDashboardCards";

const columns = [
  { width: 150, label: "Student Roll No.", dataKey: "studentroll_no" },
  { width: 150, label: "Student Name", dataKey: "studentName" },
  { width: 150, label: "Book Title", dataKey: "booktitle" },
  { width: 150, label: "Book Author", dataKey: "bookauthor" },
  { width: 150, label: "ISBN", dataKey: "bookISBN" },
  { width: 150, label: "Course Type", dataKey: "bookcourseType" },
  { width: 150, label: "Issue Date", dataKey: "issueDate" },
  { width: 150, label: "Due Date", dataKey: "dueDate" },

  { width: 100, label: "Delay Fees", dataKey: "delayFees" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <tbody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {/* {row[column.dataKey]} */}
          {column.dataKey.split(".").reduce((o, key) => o?.[key], row) || "-"}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const OverdueBooksTableVirtualized = () => {
  const { borrowInfo } = useDashboardCards();

  const overdueBooks = borrowInfo?.overdueBooks || [];

  const mappedOverdueBooks = overdueBooks.map((borrow) => ({
    studentroll_no: borrow.student.roll_no,
    studentName: `${borrow.student.f_name} ${borrow.student.l_name}`,
    booktitle: borrow.book.title,
    bookauthor: borrow.book.author,
    bookISBN: borrow.book.ISBN,
    bookcourseType: borrow.book.courseType,
    issueDate: new Date(borrow.issueDate).toLocaleDateString(),
    dueDate: new Date(borrow.dueDate).toLocaleDateString(),

    delayFees: `${borrow.delayFees} Rs`,
  }));
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <Typography variant="h6">Overdue Books</Typography>
      </div>
      {mappedOverdueBooks.length > 0 ? (
        <Paper style={{ height: 250, width: "100%" }}>
          <TableVirtuoso
            data={mappedOverdueBooks}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      ) : (
        <Typography variant="body1" className="text-center mt-4">
          No Overdue Books
        </Typography>
      )}
    </div>
  );
};

export default OverdueBooksTableVirtualized;
