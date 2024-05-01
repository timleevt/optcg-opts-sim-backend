import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type params = {
  name: string;
  leader: string;
  author: string;
  decklist: string[];
  tech: string[];
  pin: string;
  isPrivate: boolean;
  accountId: string;
};

const postDeck = async ({
  name,
  leader,
  author,
  decklist,
  tech,
  pin,
  isPrivate,
  accountId
}: params) => {
  await prisma.deck.create({
    data: {
      name,
      leader,
      author,
      decklist,
      tech,
      pin,
      isPrivate,
      accountId
    },
  });
};

export default postDeck;
