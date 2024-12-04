import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import logger from "../config/logger.js";
import {
  librarianLoginSchema,
  librarianRegisterSchema,
} from "../validations/authValidatons.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LibrarianAuthController {
  static async getMe(req, res) {
    try {
      const roles = req.user;
      // const roles = await prisma.librarian.findUnique({
      //   where: { id: req.user.id },
      // });
      console.log(roles);

      if (!roles) return res.status(404).json({ error: "Role not found" });

      let role, user;

      if (roles.role === "librarian") {
        role = "librarian";
        user = await prisma.librarian.findUnique({
          where: { email: roles.email },
        });
      } else {
        role = "student";
        user = await prisma.student.findUnique({
          where: {
            email: roles.email,
          },
        });
      }

      res.status(200).json({
        id: req.user.id,
        // name: roles.name,
        email: roles.email,
        role,
        user,
      });
    } catch (error) {
      // console.log(error);

      logger.error(error);
      console.log("Error in getMe controller", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  static async register(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(librarianRegisterSchema);
      const payload = await validator.validate(body);

      // Check if the librarian already exists
      const existingLibrarian = await prisma.librarian.findUnique({
        where: { email: payload.email },
      });

      if (existingLibrarian) {
        return res.status(409).json({ message: "Librarian already exists" });
      }

      //Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);
      const newLibrarian = await prisma.librarian.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "Librarian created successfully",
        newLibrarian,
      });
    } catch (error) {
      // console.log(error);

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

  static async login(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(librarianLoginSchema);
      const payload = await validator.validate(body);

      //find librarian
      const findLibrarian = await prisma.librarian.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findLibrarian) {
        if (!bcrypt.compareSync(payload.password, findLibrarian.password)) {
          return res.status(401).json({ errors: "Invalid Password" });
        }

        //Issue token to user
        const payloadData = {
          id: findLibrarian.id,
          name: findLibrarian.name,
          email: findLibrarian.email,
          role: findLibrarian.role,
        };

        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.json({
          message: "Logged in successfully",
          access_token: `Bearer ${token}`,
          payload,
        });
      }
      return res.status(401).json({
        errors: "No user found with this email.",
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
}

export default LibrarianAuthController;
