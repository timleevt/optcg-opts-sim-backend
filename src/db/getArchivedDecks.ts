import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getArchivedDecks = async () => {
  return await prisma.deck.findMany({
    select: {
        id: true,
        name: true,
        format: true
    }
  });
};

export default getArchivedDecks;
