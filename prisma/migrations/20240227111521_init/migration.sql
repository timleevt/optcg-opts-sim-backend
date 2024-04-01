-- CreateTable
CREATE TABLE "Card" (
    "code" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "cost" INTEGER,
    "type" TEXT[],
    "power" INTEGER,
    "attribute" TEXT,
    "counterPower" INTEGER,
    "color" TEXT[],
    "effect" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("code")
);
