/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddStudentsModal = ({ open, handleClose, onSubmit }) => {
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [roll_no, setRoll_no] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState();
  const [year, setYear] = useState();

  const addStudent = () => {
    // console.log({
    //   f_name,
    //   l_name,
    //   email,
    //   password,
    //   password_confirmation,
    //   roll_no,
    //   department,
    //   course,
    //   semester,
    //   year,
    // });

    onSubmit({
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
    });
    setF_name("");
    setL_name("");
    setEmail("");
    setPassword("");
    setPassword_confirmation("");
    setRoll_no("");
    setDepartment("");
    setCourse("");
    setSemester();
    setYear();

    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 bg-white p-6 rounded-md shadow "
        style={{ transform: "translate(-50%, -50%)", minWidth: "400px" }}
      >
        <Typography variant="h5" className="mb-4 text-center">
          Add New Student
        </Typography>
        <form className="grid space-x-2 gap-2 grid-cols-2">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={f_name}
            onChange={(e) => setF_name(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={l_name}
            onChange={(e) => setL_name(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
          <TextField
            label="Roll No"
            variant="outlined"
            fullWidth
            value={roll_no}
            onChange={(e) => setRoll_no(e.target.value)}
          />
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextField
            label="Course"
            variant="outlined"
            fullWidth
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <TextField
            label="Semester"
            variant="outlined"
            fullWidth
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <div className="flex justify-end space-x-4">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={addStudent}>
              Add Member
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddStudentsModal;
