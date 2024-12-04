import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const { loading, handleRegisterSubmit } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegisterSubmit({ name, email, password, password_confirmation });

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/*Left Section */}
        <div className="lg:w-1/2 w-full flex justify-center items-center p-5">
          <div className="text-center">
            <img
              src="/clg logo.jpeg"
              alt="Logo"
              className="w:56 h:56 lg:w-80 lg:h-80 mx-auto"
            />
          </div>
        </div>

        {/*Right Section */}
        <div className="lg:w-1/2 w-full bg-[#0D1C3D] flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            {/* User Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                <FaRegUser size={"35"} />
              </div>
            </div>

            {/*Name Input */}
            <TextField
              fullWidth
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              type="text"
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
            <div className="mb-6"></div>

            {/*Email Input */}
            <TextField
              fullWidth
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              placeholder="xyz@gmail.com"
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
            <div className="mb-6"></div>

            {/*Password Input */}
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
            <div className="mb-6"></div>

            <TextField
              fullWidth
              variant="filled"
              label="Confirm Password"
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <div className="mb-6"></div>

            {/*Button */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <Button
                variant="contained"
                style={{
                  // backgroundColor: "#FF5722",
                  color: "white",
                  borderRadius: "999px",
                  padding: "10 40",
                }}
                onClick={handleSubmit}
              >
                {loading ? <Loader /> : "Register"}
              </Button>

              <Link
                to={"/librarian--7239"}
                className="flex flex-col lg:flex-row justify-end items-center space-y-4 lg:space-y-0 lg:space-x-4 text-base hover:underline text-white hover:text-blue-500 mt-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
