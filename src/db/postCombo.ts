import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// // TODO fix typing
const postCombo = async (comboData: any) => {
  return await prisma.combo.create({
    data: {
      ...comboData,
    },
  });
};

export default postCombo;
