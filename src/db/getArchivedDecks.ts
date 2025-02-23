import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getArchivedDecks = async () => {
  return await prisma.deck.findMany({
    select: {
      id: true,
      author: true,
      leader: true,
      name: true,
      format: true,
      leaderCode: true,
    },
    where: {
      format: {
        not: process.env.CURRENT_SET,
      },
    },
  });
};

export default getArchivedDecks;
