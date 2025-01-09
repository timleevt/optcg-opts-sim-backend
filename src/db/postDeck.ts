import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type params = {
  name: string;
  leader: string;
  author: string;
  decklist: string[];
};

const postDeck = async ({ name, leader, author, decklist }: params) => {
  return await prisma.deck.create({
    data: {
      name,
      leader,
      author,
      decklist,
      tech: [],
      pin: "1234",
      isPrivate: false,
    },
  });
};

export default postDeck;
