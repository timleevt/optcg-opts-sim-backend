-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "decklist" TEXT[],
    "tech" TEXT[],
    "pin" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);
