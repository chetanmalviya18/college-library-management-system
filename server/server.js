import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import librarianRoutes from "./routes/librarianRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import studentCurdRoutes from "./routes/studentCurdRoutes.js";

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://college-library-management-system-client.onrender.com","http://localhost:5173"],
    methods: ["POST", "PUT", "Get", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(helmet());
app.use("/api/librarian", librarianRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/student-curd", studentCurdRoutes);

//First Routes
app.get("/", (req, res) => {
  return res.json({
    message: "Hello it's College Library Management System API",
  });
});

//Listener
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
