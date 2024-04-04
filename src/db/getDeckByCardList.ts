import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DeckList = { [key: string]: number };

const getDeckByCardList = async (deckObj: DeckList) => {
  return await prisma.card.findMany({
    where: {
      code: { in: Object.keys(deckObj) },
    },
  });
};

export default getDeckByCardList;
