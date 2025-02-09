import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCombosByLeader = async (leader: string) => {
  return await prisma.combo.findMany({
    where: {
      leader,
    },
  });
};

export default getCombosByLeader;
