/*
  Warnings:

  - You are about to drop the column `leaderCode` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `leader` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_leaderCode_fkey";

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "leaderCode",
ADD COLUMN     "leader" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_leader_fkey" FOREIGN KEY ("leader") REFERENCES "Card"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
