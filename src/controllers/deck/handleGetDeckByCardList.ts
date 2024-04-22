import { Request, Response } from "express";
import { z } from "zod";
import getDeckByCardList from "../../db/getDeckByCardList";
import parseDeckList from "../../util/parseDeckList";

const deckListSchema = z.object({
  deckStr: z.string().array(),
});

// TODO: fix naming.. 
const handleGetDeck = async (req: Request, res: Response) => {
  // get deck from request body
  const { deckStr } = deckListSchema.parse(req.body);
  // // convert the deck into an object where key is code and value is # copies
  // const deckListObj = parseDeckList(deckStr);
  // // retrieve card information from db using the code
  // const deckList = await getDeckByCardList(deckListObj);

  // // TODO: fix typing
  // let test:any[] = [];

  // deckList.forEach( e => {
  //   test.push({...e, copies: deckListObj[e.code]})
  // })
  // return res.send(test);
};

export default handleGetDeck;
