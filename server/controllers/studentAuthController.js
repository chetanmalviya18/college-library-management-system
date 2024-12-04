import prisma from "../DB/db.config.js";
import { studentLoginSchema } from "../validations/authValidatons.js";
import vine, { errors } from "@vinejs/vine";
import logger from "../config/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class StudentAuthController {
  static async login(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(studentLoginSchema);
      const payload = await validator.validate(body);

      //find Student
      const findStudent = await prisma.student.findUnique({
        where: {
          roll_no: payload.roll_no,
        },
      });

      if (findStudent) {
        if (!bcrypt.compareSync(payload.password, findStudent.password)) {
          return res.status(401).json({ errors: "Invalid Password" });
        }

        //Issue token to user
        const payloadData = {
          id: findStudent.id,
          name: findStudent.name,
          email: findStudent.email,
          role: findStudent.role,
        };

        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.json({
          message: "Logged in successfully",
          access_token: `Bearer ${token}`,
        });
      }
      return res.status(401).json({
        errors: "No student found with this roll number.",
      });
    } catch (error) {
      logger.error(error);

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  static async getProfile(req, res) {
    try {
      const studentId = req.user.id;

      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json(student);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default StudentAuthController;
