import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// TEST CODE
const getColors = async () => {
  return await prisma.card.findMany({
    where: {
        colors: {
            has: 'Red'
        }
    },
  });
};

export default getColors;
