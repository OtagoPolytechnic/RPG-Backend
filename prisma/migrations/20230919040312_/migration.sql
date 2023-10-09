/*
  Warnings:

  - Added the required column `XP` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "XP" INTEGER NOT NULL,
ADD COLUMN     "currency" INTEGER NOT NULL;
