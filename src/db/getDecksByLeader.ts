import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecksByLeader = async (code: string) => {
  return await prisma.deck.findMany({
    select: {
      id: true,
      name: true,
      decklist: true,
    },
    where: {
      leader: code,
    },
  });
};

export default getDecksByLeader;
