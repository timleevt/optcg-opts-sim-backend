import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMatchesByUserId = async (userId:string) => {
  // return await prisma.match.findMany({
  //   where: {
  //     userId
  //   },
  // });
};


export default getMatchesByUserId;
