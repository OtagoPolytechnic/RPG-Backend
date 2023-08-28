/*
  Warnings:

  - You are about to drop the column `agility` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `attack` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `health` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `mana` on the `Character` table. All the data in the column will be lost.
  - Added the required column `stats` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "agility",
DROP COLUMN "attack",
DROP COLUMN "defense",
DROP COLUMN "health",
DROP COLUMN "mana",
ADD COLUMN     "stats" JSONB NOT NULL;
