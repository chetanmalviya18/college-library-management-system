import { Router } from "express";
import authMiddleware, {
  authorizeLibrarian,
} from "../middlewares/authMiddleware.js";
import StudentController from "../controllers/studentController.js";

const router = Router();

// Librarian adds a student (must be authenticated and a librarian)
router.post(
  "/add-student",
  authMiddleware,
  authorizeLibrarian,
  StudentController.addStudent
);
//Get all student
router.get(
  "/get-students",
  authMiddleware,
  authorizeLibrarian,
  StudentController.getAllStudent
);

export default router;
