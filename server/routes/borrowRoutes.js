import { Router } from "express";
import authMiddleware, {
  authorizeLibrarian,
} from "../middlewares/authMiddleware.js";
import BorrowController from "../controllers/borrowController.js";

const router = Router();

// Librarian routes
router.post(
  "/",
  authMiddleware,
  authorizeLibrarian,
  BorrowController.borrowBook
); // Borrow book

router.put(
  "/return",
  authMiddleware,
  authorizeLibrarian,
  BorrowController.returnBook
); // Return book

router.get(
  "/",
  authMiddleware,
  authorizeLibrarian,
  BorrowController.getAllBorrowedBooks
); // Get all borrowed books

//Get one borrow record(librarian)
router.get(
  "/records",
  authMiddleware,
  authorizeLibrarian,
  BorrowController.getOneBorrowedBook
);

//Get unreturned books records (for librarian)
router.get(
  "/un-returned-books",
  authMiddleware,
  authorizeLibrarian,
  BorrowController.getUnReturnedBooksRecords
);

// Student route (View borrow records)
router.get(
  "/student",
  authMiddleware,
  BorrowController.getBorrowRecordsByStudent
);

export default router;
