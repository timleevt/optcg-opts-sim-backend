-- CreateTable
CREATE TABLE "Combo" (
    "id" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,
    "currBoard" TEXT,
    "comboBoard" TEXT NOT NULL,
    "startCurve" INTEGER NOT NULL,
    "endCurve" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
