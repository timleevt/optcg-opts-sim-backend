import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDeckInfoById = async (deckID: number) => {
  return await prisma.deck.findUnique({
    where: {
      id: deckID,
    },
  });
};

export default getDeckInfoById;
