-- AlterTable
ALTER TABLE "Librarian" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'librarian';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'student';