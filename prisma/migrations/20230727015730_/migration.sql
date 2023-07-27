-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'BASIC');

-- CreateEnum
CREATE TYPE "Classes" AS ENUM ('FIGHTER', 'RANGED', 'MAGE');

-- CreateEnum
CREATE TYPE "Stats" AS ENUM ('STRENGTH', 'DEXTERITY', 'INTELLIGENCE', 'ENDURANCE');

-- CreateTable
CREATE TABLE "Player" (
    "name" TEXT NOT NULL,
    "class" "Classes" NOT NULL,
    "health" INTEGER NOT NULL
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
