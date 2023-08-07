-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'BASIC');

-- CreateTable
CREATE TABLE "Build" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "buildId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;
