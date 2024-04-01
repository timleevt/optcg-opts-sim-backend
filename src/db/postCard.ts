import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type params = {
  code: string;
  name: string;
  cardType: string;
  cost: number | null;
  type: string[];
  power?: number | null;
  attribute: string[];
  counterPower: number | null;
  colors: string[];
  effect: string;
  trigger: string | null;
};

const postCard = async ({
  code,
  name,
  cardType,
  cost,
  type,
  power,
  attribute,
  counterPower,
  colors,
  effect,
  trigger
}: params) => {
  await prisma.card.create({
    data: {
      code,
      name,
      cardType,
      cost,
      type,
      power,
      attribute,
      counterPower,
      colors,
      effect,
      trigger
    },
  });
};

export default postCard;
