/*
  Warnings:

  - You are about to drop the column `cost` on the `Item` table. All the data in the column will be lost.
  - Added the required column `buyCost` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "cost",
ADD COLUMN     "buyCost" INTEGER NOT NULL,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "sellPrice" INTEGER NOT NULL;
