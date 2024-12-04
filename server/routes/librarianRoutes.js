import { Router } from "express";
import LibrarianController from "../controllers/librarianAuthController.js";
import authMiddleware, {
  authorizeLibrarian,
} from "../middlewares/authMiddleware.js";

const router = Router();

//Librarian Auth
router.post("/auth/librarian-register", LibrarianController.register);
router.post("/auth/librarian-login", LibrarianController.login);
router.get("/auth/me", authMiddleware, LibrarianController.getMe);

export default router;
