import { Router } from "express";
import StudentAuthController from "../controllers/studentAuthController.js";

const router = Router();

router.post("/auth/student-login", StudentAuthController.login);

export default router;
