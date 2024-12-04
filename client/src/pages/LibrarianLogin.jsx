import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLibrarianLogin from "../hooks/useLibrarianLogin";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, librarianLogin } = useLibrarianLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    librarianLogin({ email, password });
    setEmail(""), setPassword("");
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/*Left Section */}
        <div className="lg:w-1/2 w-full bg-[#0D1C3D] flex justify-center items-center p-5">
          <div className="w-full max-w-md lg:w-3/4">
            {/* User Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                <FaRegUser size={"35"} />
              </div>
            </div>
            <form>
              {/* Email Input */}
              <div className="mb-6 ">
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
              </div>
              {/* Password Input */}
              <div className="mb-6 ">
                <TextField
                  fullWidth
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
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
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
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
                <Link
                  to={"/librarian--7239/librarian-register"}
                  className="flex flex-col lg:flex-row justify-end items-center space-y-4 lg:space-y-0 lg:space-x-4 text-base hover:underline text-white hover:text-blue-500"
                >
                  Register new Librarian
                </Link>

                <Button
                  variant="contained"
                  style={{ color: "white", textTransform: "none" }}
                  onClick={handleSubmit}
                >
                  {loading ? <Loader /> : "Login"}
                </Button>
              </div>
            </form>
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
