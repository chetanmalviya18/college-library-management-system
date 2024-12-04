import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import ActionButtons from "../components/ActionButtons ";
import StudentsTable from "../components/StudentsTable";
import AddStudentsModal from "../components/AddStudentsModal";
import useStudents from "../hooks/useStudents";

const AddStudents = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const { data, addStudent } = useStudents();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteMembers = () => {
    // console.log("Delete members logic here");
  };

  const filteredStudents = data.student?.filter((stu) =>
    stu.rollNo.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(filteredStudents);

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="p-6 flex-1 bg-gray-50 space-y-6">
        <Typography variant="h4" component={"h1"}>
          Students
        </Typography>
        {/* Header */}
        <div className="flex justify-between">
          <SearchBar searchValue={search} setsearchValue={setSearch} />
          <ActionButtons
            onAdd={handleOpenModal}
            onDelete={handleDeleteMembers}
          />
        </div>

        {/* Table */}
        <StudentsTable students={filteredStudents} />

        {/* Add Student Modal */}
        <AddStudentsModal
          open={openModal}
          handleClose={handleCloseModal}
          onSubmit={addStudent}
        />
      </div>
    </div>
  );
};

export default AddStudents;
