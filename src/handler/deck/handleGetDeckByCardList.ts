import { Request, Response } from "express";
import { z } from "zod";
import getDeckByCardList from "../../db/getDeckByCardList";
import parseDeckList from "../../util/parseDeckList";

const deckListSchema = z.object({
  deck: z.string().array(),
});

const handleGetDeck = async (req: Request, res: Response) => {
  const { deck } = deckListSchema.parse(req.body);

  return res.send(parseDeckList(deck));
  // return res.send(await getDeckByCardList())
};

export default handleGetDeck;
