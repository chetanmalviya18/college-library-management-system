import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorRepoter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const addBookSchema = vine.object({
  title: vine.string().minLength(3),
  author: vine.string().minLength(3),
  publisher: vine.string().minLength(3),
  yearOfPublication: vine.number().min(2),
  ISBN: vine.string().minLength(3),
  courseType: vine.string().minLength(3),
  quantity: vine.number().min(1),
});
