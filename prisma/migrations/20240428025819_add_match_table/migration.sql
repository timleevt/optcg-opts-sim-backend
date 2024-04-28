-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "turnOrder" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
