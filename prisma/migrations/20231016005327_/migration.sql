/*
  Warnings:

  - You are about to drop the `ItemChraracter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemChraracter" DROP CONSTRAINT "ItemChraracter_characterId_fkey";

-- DropForeignKey
ALTER TABLE "ItemChraracter" DROP CONSTRAINT "ItemChraracter_itemId_fkey";

-- DropTable
DROP TABLE "ItemChraracter";

-- CreateTable
CREATE TABLE "ItemCharacter" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "ItemCharacter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemCharacter" ADD CONSTRAINT "ItemCharacter_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCharacter" ADD CONSTRAINT "ItemCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
