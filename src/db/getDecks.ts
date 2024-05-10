import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecks = async () => {
  return await prisma.deck.findMany({
    select: {
      id: true,
      name: true,
      leader: true,
      author: true,
      isPrivate: false,
    },
    orderBy: {
      id: 'desc'
    }
  });
};

export default getDecks;
