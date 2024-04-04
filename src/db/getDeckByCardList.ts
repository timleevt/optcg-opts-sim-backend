import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDeckByCardList = async () => {
    return await prisma.card.findFirst();
}

export default getDeckByCardList;