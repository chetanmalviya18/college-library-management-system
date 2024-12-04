import vine, { errors } from "@vinejs/vine";
import { borrowBookSchema } from "../validations/borrowValidation.js";
import prisma from "../DB/db.config.js";
import logger from "../config/logger.js";

class BorrowController {
  // Borrow a book (Student)
  static async borrowBook(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(borrowBookSchema);
      const payload = await validator.validate(body);

      // Find the book by ID to check its quantity
      const book = await prisma.book.findUnique({
        where: { id: parseInt(payload.bookId) },
      });

      const studentId = await prisma.student.findUnique({
        where: {
          roll_no: payload.roll_no,
        },
      });

      if (book) {
        if (book.quantity <= 0) {
          return res.status(409).json({ message: "Book out of stock" });
        }

        // Decrease the quantity of the book by 1
        await prisma.book.update({
          where: {
            id: parseInt(payload.bookId),
          },
          data: { quantity: book.quantity - 1 },
        });

        const borrowingPeriodDays = 14;
        const issueDate = new Date();
        const dueDate = new Date(issueDate);
        dueDate.setDate(dueDate.getDate() + borrowingPeriodDays);

        // Create a new borrow record
        const borrow = await prisma.borrow.create({
          data: {
            issueDate: issueDate,
            studentId: studentId.id,
            bookId: parseInt(payload.bookId),
            dueDate: dueDate,
            delayFees: 0.0, // Initial delay fee is 0
          },
          include: {
            book: {
              select: {
                quantity: true,
              },
            },
          },
        });

        return res
          .status(201)
          .json({ message: "Book issued successfully", borrow: borrow });
      }

      return res.status(404).json({ message: "Book not found" });
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

  // Return a book (Librarian only)
  static async returnBook(req, res) {
    try {
      const { borrowId } = req.body;

      const returnDate = new Date();

      // Find the borrow record by ID
      const borrow = await prisma.borrow.findUnique({
        where: { id: parseInt(borrowId) },
        include: {
          book: true,
        },
      });

      if (!borrow) {
        return res.status(404).json({ message: "Borrow record not found" });
      }

      // Calculate delay fees if the return is late
      const issueAt = new Date(borrow.issueDate);
      const returnedAt = new Date(returnDate);
      const diffTime = Math.abs(returnedAt - issueAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days between issue and return

      let delayFees = 0.0;
      const maxBorrowDays = 14; // Assume maximum borrow period is 14 days

      if (diffDays > maxBorrowDays) {
        delayFees = (diffDays - maxBorrowDays) * 10; // Assume 10 Rs per extra day
      }

      // Update the borrow record with return date and delay fees
      const updatedBorrow = await prisma.borrow.update({
        where: { id: parseInt(borrowId) },
        data: {
          returnDate: new Date(returnDate),
          delayFees,
          return: true,
        },
      });

      // Increase the book quantity back by 1
      await prisma.book.update({
        where: { id: borrow.bookId },
        data: { quantity: borrow.book.quantity + 1 },
      });

      return res.status(201).json(updatedBorrow);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  // Get all borrow records for a student (Student)
  static async getBorrowRecordsByStudent(req, res) {
    try {
      const id = req.user.id;
      // console.log(id);

      const borrowRecords = await prisma.borrow.findMany({
        where: { studentId: id },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              publisher: true,
              yearOfPublication: true,
              courseType: true,
            },
          },
        },
      });

      let delayFeePerDay = 10;
      const today = new Date();

      const updatedBorrowedBooks = borrowRecords.map((borrow) => {
        const overdue = today > borrow.dueDate && !borrow.returnDate;
        let delayFees = 0;

        if (overdue) {
          const delayInMilliseconds = today - borrow.dueDate;
          const delayDays = Math.ceil(
            delayInMilliseconds / (1000 * 60 * 60 * 24)
          );

          delayFees = delayDays * delayFeePerDay;
        }

        return {
          ...borrow,
          overdue,
          delayFees,
        };
      });

      const overdueBooks = updatedBorrowedBooks.filter(
        (borrow) => borrow.overdue
      );
      return res.status(200).json({ borrowRecords: updatedBorrowedBooks });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  // Get all borrowed books (Librarian only)
  static async getAllBorrowedBooks(req, res) {
    try {
      let delayFeePerDay = 10;
      const borrowedBooks = await prisma.borrow.findMany({
        include: {
          student: true,
          book: true,
        },
      });
      const totalBorrowBooks = await prisma.borrow.count();
      // Get the current date
      const currentDate = new Date();

      // Initialize count for overdue books
      let totalOverdueBooks = 0;

      // Add overdue flag to each borrowed book
      const updatedBorrowedBooks = borrowedBooks.map((borrow) => {
        const isOverdue = currentDate > borrow.dueDate && !borrow.returnDate;
        let delayFees = 0;

        // If the book is overdue, increment the overdue count
        if (isOverdue) {
          totalOverdueBooks += 1;

          const delayInMilliseconds = currentDate - borrow.dueDate;
          const delayDays = Math.ceil(
            delayInMilliseconds / (1000 * 60 * 60 * 24)
          );

          delayFees = delayDays * delayFeePerDay;
        }

        // Return each borrow record with an additional overdue flag
        return {
          ...borrow,
          isOverdue,
          delayFees,
        };
      });

      const overdueBooks = updatedBorrowedBooks.filter(
        (borrow) => borrow.isOverdue
      );

      return res.status(200).json({
        borrowedBooks: updatedBorrowedBooks,
        overdueBooks,
        totalOverdueBooks,
        totalBorrowBooks,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  //Get one student borrow book record (librarian)
  static async getOneBorrowedBook(req, res) {
    const { roll_no, bookId } = req.query;

    try {
      const borrowRecords = await prisma.borrow.findMany({
        where: {
          return: false,
          ...(roll_no && { student: { roll_no: roll_no } }),
          ...(bookId && { bookId: parseInt(bookId) }),
        },
        include: {
          book: true,
          student: true,
        },
      });
      res.status(200).json(borrowRecords);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  //Get unreturned books records (for librarian)
  static async getUnReturnedBooksRecords(req, res) {
    try {
      let delayFeePerDay = 10;
      const borrowedBooks = await prisma.borrow.findMany({
        where: { return: false },
        include: {
          student: true,
          book: true,
        },
      });

      if (borrowedBooks.length < 0)
        return res.status(400).json({ message: "No Records Found" });

      const totalUnReturnedBooks = await prisma.borrow.count({
        where: { return: false },
      });

      // Get the current date
      const currentDate = new Date();

      // Initialize count for overdue books
      let totalOverdueBooks = 0;

      // Add overdue flag to each borrowed book
      const updatedBorrowedBooks = borrowedBooks.map((borrow) => {
        const isOverdue = currentDate > borrow.dueDate && !borrow.returnDate;
        let delayFees = 0;

        // If the book is overdue, increment the overdue count
        if (isOverdue) {
          totalOverdueBooks += 1;

          const delayInMilliseconds = currentDate - borrow.dueDate;
          const delayDays = Math.ceil(
            delayInMilliseconds / (1000 * 60 * 60 * 24)
          );

          delayFees = delayDays * delayFeePerDay;
        }

        // Return each borrow record with an additional overdue flag
        return {
          ...borrow,
          isOverdue,
          delayFees,
        };
      });

      const overdueBooks = updatedBorrowedBooks.filter(
        (borrow) => borrow.isOverdue
      );

      return res.status(200).json({
        borrowedBooks: updatedBorrowedBooks,
        overdueBooks,
        totalOverdueBooks,
        totalUnReturnedBooks,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default BorrowController;
