import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorRepoter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const studentRegisterSchema = vine.object({
  f_name: vine.string().minLength(2).maxLength(50),
  l_name: vine.string().minLength(2).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(4).maxLength(50).confirmed(),
  roll_no: vine.string().minLength(5).maxLength(50),
  department: vine.string().minLength(2).maxLength(50),
  course: vine.string().minLength(1).maxLength(100),
  semester: vine.number(),
  year: vine.number(),
});

export const studentLoginSchema = vine.object({
  roll_no: vine.string().minLength(5).maxLength(50),
  password: vine.string().minLength(4).maxLength(50),
});

export const librarianRegisterSchema = vine.object({
  name: vine.string().minLength(5).maxLength(200),
  email: vine.string().email(),
  password: vine.string().minLength(4).maxLength(50).confirmed(),
});

export const librarianLoginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(4).maxLength(50),
});
