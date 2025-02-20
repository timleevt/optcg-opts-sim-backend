/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `tech` on the `Deck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "isPrivate",
DROP COLUMN "tech",
ADD COLUMN     "format" TEXT;
