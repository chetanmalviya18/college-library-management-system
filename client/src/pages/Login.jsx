import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import useStudentLogin from "../hooks/useStudentLogin";
import Loader from "../components/Loader";

const Login = () => {
  const [roll_no, setRoll_no] = useState("");
  const [password, setPassword] = useState("");

  const { studentLogin, loading } = useStudentLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    studentLogin({ roll_no, password });
    setRoll_no("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/*Left Section */}
        <div className="lg:w-1/2 w-full bg-[#0D1C3D] flex justify-center items-center p-5">
          <div className="w-full max-w-md lg:w-3/4">
            {/* User Icon */}
            <div className="flex flex-col items-center space-y-2 justify-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                <FaRegUser size={"35"} />
              </div>
              <h1 className="text-white font-bold ">Student Login</h1>
            </div>

            {/* Roll Number Input */}
            <div className="mb-6 ">
              <TextField
                fullWidth
                variant="filled"
                label="Roll Number"
                type="text"
                value={roll_no}
                onChange={(e) => setRoll_no(e.target.value)}
                placeholder="22ECLCS003"
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: "white",
                      borderRadius: "999px",
                      color: " #8A8A8A",
                      fontWeight: "bold",
                    },
                  },
                }}
              />
            </div>
            {/* Password Input */}
            <div className="mb-6 ">
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: "white",
                      borderRadius: "999px",
                      color: " #8A8A8A",
                      fontWeight: "bold",
                    },
                  },
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row justify-end items-center space-y-4 lg:space-y-0 lg:space-x-4">
              {/* <Button
                variant="contained"
                style={{
                  backgroundColor: "#FF5722",
                  color: "white",
                  borderRadius: "999px",
                  padding: "10 40",
                }}
              >
                Register
              </Button> */}
              <Button
                variant="contained"
                style={{ color: "white", textTransform: "none" }}
                onClick={handleSubmit}
              >
                {loading ? <Loader /> : "Login"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
          <div className="text-center">
            <img
              src="./public/clg logo.jpeg"
              alt="Logo"
              className="lg:w-80 lg:h-80 w-56 h-56"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
