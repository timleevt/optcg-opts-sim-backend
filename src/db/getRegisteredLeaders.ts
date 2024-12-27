import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Move these to a interface file later
interface Leader {
  leader: string;
}

interface Card {
  code: string;
  cardType: string;
  cost: number | null;
  type: string[];
  power: number | null;
  attribute: string[];
  counterPower: number | null;
  colors: string[];
  effect: string;
  trigger: string | null;
  keywords: string[];
}

const getRegisteredLeaders = async (): Promise<Card[]> => {
  try {
    const leaders: Leader[] = await prisma.deck.findMany({
      select: { leader: true },
      distinct: ["leader"],
    });

    const cards = await prisma.card.findMany({
      where: {
        code: { in: leaders.map((i) => i.leader) },
      },
    });

    return cards;
  } catch (error) {
    console.error("Error fetching registered leaders and cards:", error);
    throw new Error("Unable to fetch cards for registered leaders.");
  }
};

export default getRegisteredLeaders;
