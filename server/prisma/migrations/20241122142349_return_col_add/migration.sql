/*
  Warnings:

  - Added the required column `return` to the `Borrow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borrow" ADD COLUMN     "return" BOOLEAN NOT NULL;
