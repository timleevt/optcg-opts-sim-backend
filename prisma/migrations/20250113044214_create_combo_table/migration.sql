-- CreateTable
CREATE TABLE "Combo" (
    "id" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "currBoard" TEXT,
    "comboBoard" TEXT NOT NULL,
    "startCurve" INTEGER NOT NULL,
    "endCurve" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);
