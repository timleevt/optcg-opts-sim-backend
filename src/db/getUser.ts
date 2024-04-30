import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (user: string) => {
  return await prisma.account.findUnique({
    where: {
      user,
    },
  });
};

export default getUser;
