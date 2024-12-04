import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorRepoter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const borrowBookSchema = vine.object({
  bookId: vine.number(),
  roll_no: vine.string(),
});
