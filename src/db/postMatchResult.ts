// import { Match, PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type MatchData = {
  userId: string;
  deckId: number;
  leader: string;
  event: string;
  turn: number;
  dice: string;
  result: string;
};

const postMatchResult = async (match: MatchData) => {
  // try {
  //   await prisma.match.create({
  //     data: {
  //       userId: match.userId,
  //       deckId: match.deckId,
  //       leader: match.leader,
  //       eventName: match.event,
  //       turnOrder: match.turn,
  //       diceResult: match.dice,
  //       result: match.result,
  //     },
  //   });
  // } catch (error) {
  //   throw Error("Error adding match result to database");
  // }
  return;
};

export default postMatchResult;
