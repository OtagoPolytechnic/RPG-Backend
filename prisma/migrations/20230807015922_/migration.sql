/*
  Warnings:

  - Added the required column `agility` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attack` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defence` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mana` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "agility" INTEGER NOT NULL,
ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "defence" INTEGER NOT NULL,
ADD COLUMN     "mana" INTEGER NOT NULL;
