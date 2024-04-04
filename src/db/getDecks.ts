import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecks = async () => {
  return await prisma.deck.findMany({
    select: {
      name: true,
      leader: true,
      author: true,
      isPrivate: true,
    },
  });
};

export default getDecks;
