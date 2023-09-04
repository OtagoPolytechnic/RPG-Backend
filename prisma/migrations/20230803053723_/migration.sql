/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_buildId_fkey";

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Character" (
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "health" INTEGER NOT NULL,
    "buildId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;
