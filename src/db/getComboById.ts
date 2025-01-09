import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getComboById = async (id: number) => {
  // return await prisma.combo.findMany({
  //   where: {
  //     deckId: id,
  //   },
  // });
  return;
};

export default getComboById;
