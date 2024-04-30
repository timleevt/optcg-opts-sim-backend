import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerUser = async (user: string, password: string) => {
  return await prisma.account.create({
    data: {
      user,
      password,
    },
  });
};

export default registerUser;
