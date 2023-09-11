/*
  Warnings:

  - Made the column `buildId` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_buildId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "buildId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
