/*
  Warnings:

  - You are about to drop the column `characterName` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_characterName_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "characterName";
