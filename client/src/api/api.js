import axios from "axios";

const api = axios.create({
  baseURL: "https://college-library-management-system-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
