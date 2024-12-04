import vine, { errors } from "@vinejs/vine";
import { addBookSchema } from "../validations/bookValidation.js";
import prisma from "../DB/db.config.js";
import logger from "../config/logger.js";
import BookApiTransform from "../transform/transform.js";

class BookController {
  // Add a new book (Librarian only)
  static async addBook(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(addBookSchema);
      const payload = await validator.validate(body);

      const existBook = await prisma.book.findUnique({
        where: { ISBN: payload.ISBN },
      });

      if (!existBook) {
        const librariann = req.user;

        const newBook = await prisma.book.create({
          data: {
            title: payload.title,
            author: payload.author,
            publisher: payload.publisher,
            yearOfPublication: payload.yearOfPublication,
            ISBN: payload.ISBN,
            courseType: payload.courseType,
            quantity: payload.quantity,
            librarian: {
              connect: { id: librariann.id }, // Connect the book to the librarian by ID
            },
          },
        });

        return res.json({
          status: 200,
          message: "Book added successfully.",
          newBook,
        });
      }

      return res.status(409).json({ message: "Book Already exists." });
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

  // Update a book (Librarian only)
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const librarian = req.user;
      const body = req.body;

      const book = await prisma.book.findUnique({
        where: { id: Number(id) },
      });

      if (book) {
        if (librarian.role !== "librarian") {
          return res.status(401).json({ message: "UnAuthorized" });
        }

        await prisma.book.update({
          data: body,
          where: { id: Number(id) },
        });

        return res.status(200).json({ message: "Book updated successfully" });
      }

      return res.status(404).json({ message: "Book not found" });
    } catch (error) {
      logger.error(error?.message);
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

  // Delete a book (Librarian only)
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const librarian = req.user;

      const book = await prisma.book.findUnique({
        where: { id: parseInt(id) },
      });

      if (book) {
        if (librarian.role !== "librarian") {
          return res.status(401).json({ message: "UnAuthorized" });
        }

        await prisma.book.delete({
          where: { id: Number(id) },
        });

        return res.status(200).json({ message: "Book deleted successfully" });
      }

      return res.status(404).json({ message: "Book not found" });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  // View all books (Student and Librarian)
  static async getAllBooks(req, res) {
    try {
      // const page = Number(req.query.page) || 1;
      // const limit = 5;

      // if (page <= 0) page = 1;

      // const skip = (page - 1) * limit;

      const books = await prisma.book.findMany({
        // take: limit,
        // skip: skip,
      });

      const bookTransform = books?.map((i) => BookApiTransform.transform(i));

      const totalBooks = await prisma.book.count();
      // const totalPage = Math.ceil(totalBooks / limit);

      return res.status(200).json({
        books: bookTransform,
        totalBooks,
        // metadata: {
        //   totalPage,
        //   currentPage: page,
        //   currentLimit: limit,
        // },
      });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  // View book by ID (Student and Librarian)
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const books = await prisma.book.findUnique({
        where: {
          id: Number(id),
        },
      });

      const transformBook = books ? BookApiTransform.transform(books) : null;

      return res.status(200).json({ books: transformBook });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  // Search books by title, author, or ISBN
  static async searchBooks(req, res) {
    try {
      const { query } = req.query;
      console.log(query);

      const books = await prisma.book.findFirst({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { author: { contains: query, mode: "insensitive" } },
            { isbn: { contains: query, mode: "insensitive" } },
          ],
        },
      });

      if (books.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }

      return res.status(200).json(books);
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default BookController;
