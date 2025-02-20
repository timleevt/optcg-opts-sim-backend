/*
  Warnings:

  - Made the column `format` on table `Deck` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deck" ALTER COLUMN "format" SET NOT NULL;
