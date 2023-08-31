/*
  Warnings:

  - Added the required column `itemCharacterId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "itemCharacterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ItemChraracter" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "ItemChraracter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemChraracter" ADD CONSTRAINT "ItemChraracter_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemChraracter" ADD CONSTRAINT "ItemChraracter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
