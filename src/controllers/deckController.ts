import { Request, Response } from "express";
import parseDeckList from "../util/parseDeckList";
import getDeckByCardList from "../db/getDeckByCardList";
import getDeckInfoById from "../db/getDeckInfoById";
import getDecklistById from "../db/getDecklistById";
import getDecks from "../db/getDecks";
import { comboSchema, deckListSchema } from "../schemas/deckSchema";
import postCombo from "../db/postCombo";
import getComboById from "../db/getComboById";

const get_list_of_decks = async (_: Request, res: Response) => {
  return res.send(await getDecks());
};

const submit_decklist = async (req: Request, res: Response) => {
  // // get deck from request body
  const { deckStr } = deckListSchema.parse(req.body);
  // // convert the deck into an object where key is code and value is # copies
  const parsedDeckListObj = parseDeckList(deckStr);

  // // retrieve card information from db using the code
  const deckList = await getDeckByCardList(parsedDeckListObj);

  // // TODO: fix typing
  let test: any[] = [];

  deckList.forEach((e) => {
    test.push({ ...e, copies: parsedDeckListObj[e.code] });
  });

  return res.send(test);
};

const submit_combo = async (req: Request, res: Response) => {
  const comboData = comboSchema.parse(req.body);
  console.log(comboData);
  return res.send(await postCombo(comboData));
};

const get_deck_info_by_id = async (req: Request, res: Response) => {
  if (typeof req.query.id === "string") {
    const deckID = parseInt(req.query.id);
    try {
      return res.send(await getDeckInfoById(deckID));
    } catch (e) {
      return res.send(e);
    }
  }
  return res.send(400);
};

const get_deck_list_by_id = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deckList = await getDecklistById(id);
    if (deckList) {
      const parsedDeckList = parseDeckList(deckList.decklist);
      const deckRes = await getDeckByCardList(parsedDeckList);
      let deck: any[] = []; // fix later

      deckRes.forEach((i) => {
        deck.push({ ...i, copies: parsedDeckList[i.code] });
      });
      return res.send(deck);
    }
  } catch (e) {
    return res.send(400);
  }
  return res.send(200);
};

const get_combos_by_deck_id = async (req: Request, res: Response) => {
  const deckId = parseInt(req.params.deckid);
  return res.send(await getComboById(deckId));
};

module.exports = {
  get_list_of_decks,
  submit_decklist,
  submit_combo,
  get_deck_info_by_id,
  get_deck_list_by_id,
  get_combos_by_deck_id,
};
