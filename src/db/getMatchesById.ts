import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMatchesById = async (deckId:number) => {
  return await prisma.match.findMany({
    where: {
      deckId
    },
  });
};


export default getMatchesById;
