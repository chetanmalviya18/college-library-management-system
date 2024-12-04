/*
  Warnings:

  - Added the required column `roll_no` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "roll_no" TEXT NOT NULL;
