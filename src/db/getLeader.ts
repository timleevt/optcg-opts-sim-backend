import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLeader = async (code: string) => {
  return await prisma.card.findUnique({
    where: {
      cardType: "Leader",
      code,
    },
  });
};

export default getLeader;
