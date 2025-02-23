/*
  Warnings:

  - You are about to drop the column `leader` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `leaderCode` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "leader",
ADD COLUMN     "leaderCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_leaderCode_fkey" FOREIGN KEY ("leaderCode") REFERENCES "Card"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
