import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecksByLeader = async (code: string) => {
  return await prisma.deck.findMany({
    select: {
      id: true,
      author: true,
      name: true,
      decklist: true,
    },
    where: {
      leader: code,
      format: process.env.CURRENT_SET
    },
  });
};

export default getDecksByLeader;
