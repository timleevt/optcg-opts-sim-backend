import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLeaders = async () => {
  return await prisma.card.findMany({
    where: {
      cardType: "Leader",
    },
    orderBy: {
      code: 'asc'
    }
  });
};

export default getLeaders;
