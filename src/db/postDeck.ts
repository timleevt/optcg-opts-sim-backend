import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type params = {
  name: string;
  leader: string;
  author: string;
  decklist: string[];
  format: string;
};

const postDeck = async ({ name, leader, author, decklist, format }: params) => {
  return await prisma.deck.create({
    data: {
      name,
      leader,
      author,
      decklist,
      pin: "1234",
      format // fix later
    },
  });
};

export default postDeck;
