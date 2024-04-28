import { Match, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type MatchData = {
  deckId: number;
  leader: string;
  event: string;
  turn: number;
  dice: string;
  result: string;
};

const postMatchResult = async (match: MatchData) => {
  await prisma.match.create({
    data: {
      deckId: match.deckId,
      leader: match.leader,
      eventName: match.event,
      turnOrder: match.turn,
      diceResult: match.dice,
      result: match.result,
    },
  });
};

export default postMatchResult;
