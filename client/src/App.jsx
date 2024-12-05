// eslint-disable-next-line no-unused-vars
import React from "react";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LibrarianLogin from "./pages/LibrarianLogin";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import AddStudents from "./pages/AddStudents";
import LibraryLoan from "./pages/LibraryLoan";
import Books from "./pages/Books";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import StudentDashboard from "./pages/StudentDashboard";
import LibrarianProtectedRoutes from "./utils/LibrarianProtectedRoutes";
import StudentProtectedRoutes from "./utils/StudentProtectedRoutes";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/librarian7239" element={<LibrarianLogin />} />
          <Route
            path="/librarian--7239/librarian-register"
            element={<Register />}
          />
          <Route element={<LibrarianProtectedRoutes />}>
            <Route
              path="/librarian--7239/dashboard"
              element={<LibrarianDashboard />}
            />
            <Route
              path="/librarian--7239/dashboard/students"
              element={<AddStudents />}
            />
            <Route
              path="/librarian--7239/dashboard/library-loan"
              element={<LibraryLoan />}
            />
            <Route
              path="/librarian--7239/dashboard/books"
              element={<Books />}
            />
            <Route path="/librarian--7239/dashboard/help" element={<Help />} />
            <Route
              path="/librarian--7239/dashboard/setting"
              element={<Settings />}
            />
          </Route>

          {/* Student Routes */}
          <Route path="/" element={<Login />} />
          <Route element={<StudentProtectedRoutes />}>
            <Route path="/students/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
