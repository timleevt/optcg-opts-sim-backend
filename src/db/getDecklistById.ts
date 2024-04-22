import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecklistById = async (deckID: number) => {
  return await prisma.deck.findUnique({
    select: {
      decklist: true,
    },
    where: {
      id: deckID,
    },
  });
};

export default getDecklistById;
