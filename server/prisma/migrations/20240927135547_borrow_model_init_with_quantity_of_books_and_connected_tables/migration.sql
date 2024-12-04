-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "delayFees" DOUBLE PRECISION NOT NULL,
    "studentId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
