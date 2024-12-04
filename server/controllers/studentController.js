import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import logger from "../config/logger.js";
import {
  librarianLoginSchema,
  librarianRegisterSchema,
  studentRegisterSchema,
} from "../validations/authValidatons.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import StudentApiTransform from "../transform/studentTransform.js";

class StudentController {
  // Add a Student (Only if librarian is logged in)
  static async addStudent(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(studentRegisterSchema);
      const payload = await validator.validate(body);

      // Check if the student already exists
      const existingStudent = await prisma.student.findUnique({
        where: { roll_no: payload.roll_no },
      });

      if (existingStudent) {
        return res.status(409).json({ message: "Student already exists" });
      }

      //Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);
      const newLibrarian = await prisma.student.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "Student created successfully",
        newLibrarian,
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

  //Get all student
  static async getAllStudent(req, res) {
    try {
      const student = await prisma.student.findMany({});

      const studentTransform = student?.map((i) =>
        StudentApiTransform.transform(i)
      );

      const totalStudents = await prisma.student.count();

      return res.status(200).json({
        student: studentTransform,
        totalStudents,
      });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default StudentController;
