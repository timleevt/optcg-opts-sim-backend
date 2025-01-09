/*
  Warnings:

  - You are about to drop the column `accountId` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the `Combo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Combo" DROP CONSTRAINT "Combo_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userId_fkey";

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "accountId";

-- DropTable
DROP TABLE "Combo";

-- DropTable
DROP TABLE "Match";
