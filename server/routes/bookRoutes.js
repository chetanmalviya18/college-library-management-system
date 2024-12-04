import { Router } from "express";
import BookController from "../controllers/bookController.js";
import authMiddleware, {
  authorizeLibrarian,
} from "../middlewares/authMiddleware.js";

const router = Router();

// Add a book (Librarian only)
router.post(
  "/add-book",
  authMiddleware,
  authorizeLibrarian,
  BookController.addBook
);
// Update a book (Librarian only)
router.patch(
  "/update-book/:id",
  authMiddleware,
  authorizeLibrarian,
  BookController.updateBook
);
// Delete a book (Librarian only)
router.delete(
  "/:id",
  authMiddleware,
  authorizeLibrarian,
  BookController.deleteBook
);

// View all books (Open to Librarians and Students)
router.get("/", authMiddleware, BookController.getAllBooks);

// View a book by ID (Open to Librarians and Students)
router.get("/:id", authMiddleware, BookController.getBookById);

// Search books by title, author, or ISBN
router.get("/search", authMiddleware, BookController.searchBooks);

export default router;
