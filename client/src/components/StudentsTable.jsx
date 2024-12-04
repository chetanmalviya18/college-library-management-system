/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const StudentsTable = ({ students }) => {
  return (
    <div className="min-w-full bg-white border rounded-md shadow flex-grow overflow-y-auto">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-100 text-left">
            <TableCell>Roll No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.length > 0 ? (
            students.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.rollNo}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>{s.semester}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell>{s.year}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={"2"}
                className="p-4 text-center text-gray-500"
              >
                No members found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
