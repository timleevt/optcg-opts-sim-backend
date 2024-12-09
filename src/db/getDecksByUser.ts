import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDecksByAccountId = async (accountId: string) => {
  return await prisma.deck.findMany({
    where: {
      accountId,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export default getDecksByAccountId;
