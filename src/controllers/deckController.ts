import { Request, Response } from "express";
import parseDeckList from "../util/parseDeckList";
import getDeckByCardList from "../db/getDeckByCardList";
import getDeckInfoById from "../db/getDeckInfoById";
import getDecklistById from "../db/getDecklistById";
import getDecks from "../db/getDecks";
import {
  comboSchema,
  deckDataSchema,
  deckListSchema,
  matchSchema,
} from "../schemas/deckSchema";
import postCombo from "../db/postCombo";
import getComboById from "../db/getComboById";
import getLeaders from "../db/getLeaders";
import getMatchesById from "../db/getMatchesById";
import postMatchResult from "../db/postMatchResult";

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

const get_deck_data = async (req: Request, res: Response) => {
  const { deck } = deckDataSchema.parse(req.body);
  const counter = {
    c1k: 0,
    c2k: 0,
    event: 0, // figure out best way to do this
  };

  // Need to add to db
  const keyword = {
    trigger: 0,
    banish: 0,
    rush: 0,
    blocker: 0,
    double_attack: 0,
  };
  const cardType = {
    character: 0,
    event: 0,
    stage: 0,
  };

  const cost = new Map();
  const power = new Map();
  const attribute = new Map();
  const type = new Map();

  deck.forEach((i) => {
    // Counter Calculation
    switch (i.counterPower) {
      case 1000:
        counter["c1k"] += i.copies;
        break;
      case 2000:
        counter["c2k"] += i.copies;
        break;
    }

    // Card Type
    switch (i.cardType) {
      case "Character":
        cardType["character"] += i.copies;
        break;
      case "Event":
        cardType["event"] += i.copies;
        break;
      case "Stage":
        cardType["stage"] += i.copies;
        break;
    }

    cost.set(i.cost, (cost.get(i.cost) || 0) + i.copies);
    power.set(i.power, (power.get(i.power) || 0) + i.copies);
    i.attribute.forEach((a) =>
      attribute.set(a, (attribute.get(a) || 0) + i.copies)
    );
    i.type.forEach((a) => type.set(a, (type.get(a) || 0) + i.copies));
  });

  const z = {
    counter,
    cardType,
    cost: Object.fromEntries(cost),
    power: Object.fromEntries(power),
    attribute: Object.fromEntries(attribute),
    type: Object.fromEntries(type),
  };

  return res.send(z);
};

const get_leaders = async (_: Request, res: Response) => {
  return res.send(await getLeaders());
};

const get_matches_by_id = async (req: Request, res: Response) => {
  console.log(`Calling GET /decks/matches/${req.params.id}`)
  if (typeof req.params.id === "string") {
    const deckId = parseInt(req.params.id);
    return res.send(await getMatchesById(deckId));
  }
  return res.send(400);
};

const submit_match = async (req: Request, res: Response) => {
  console.log("Calling POST /decks/match");
  const { match } = matchSchema.parse(req.body);
  return res.send(await postMatchResult(match));
};

module.exports = {
  get_list_of_decks,
  submit_decklist,
  submit_combo,
  get_deck_info_by_id,
  get_deck_list_by_id,
  get_combos_by_deck_id,
  get_deck_data,
  get_leaders,
  get_matches_by_id,
  submit_match,
};
