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
import postDeck from "../db/postDeck";
import getUser from "../db/getUser";

/* @GET /deck/list
 *  Return a list of all user submitted decks
 */
const get_list_of_decks = async (_: Request, res: Response) => {
  return res.send(await getDecks());
};

/* @POST /deck/submit-decklist
 * Input: User info and deck string (from sim/site)
 * Output: Adds deck into the Deck table
 * Currently returns all the cards with card information attached
 * need to redo this function
 */
const submit_decklist = async (req: Request, res: Response) => {
  console.log("Calling POST /deck/submit-decklist");
  // get deck from request body
  const { author, deckname, deckStr } = deckListSchema.parse(req.body);

  let deckListArr: string[] = [];
  // BRACKET TYPE
  if (deckStr.includes("[")) {
    // Remove all brackets and quotation marks
    const deckListStr = deckStr.replace(/[\[\]\"']/g, "");
    deckListArr = deckListStr.split(",").slice(1);
  } else {
    // TEXT TYPE: (For Sim/Egman Events Lists)
    let deckSplitRegex = deckStr.split(/(\d)x|\n/).filter(Boolean);
    for (let i = 0; i < deckSplitRegex.length; i += 2) {
      for (let j = 0; j < parseInt(deckSplitRegex[i]); j++) {
        deckListArr.push(deckSplitRegex[i + 1]);
      }
    }
  }

  if (deckListArr.length != 51) {
    return res.status(400).json({ error: "Deck must be 51 cards" });
  }

  try {
    // Find the leader card
    let deckLeader = [];
    const leaders = (await getLeaders()).map((i) => i.code);
    for (let i of deckListArr) {
      if (leaders.includes(i)) {
        deckLeader.push(i);
      }
    }

    if (deckLeader.length != 1) {
      return res
        .status(400)
        .json({ error: "Deck may only have 1 Leader card." });
    }
    const user = await getUser(author);
    if (!user) return res.status(400).json({ error: "User not found." });

    await postDeck({
      name: deckname,
      leader: deckLeader[0],
      author: author,
      decklist: deckListArr,
      tech: [""],
      pin: "1234",
      isPrivate: false,
      accountId: user.id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong with the server." });
  }

  return res.status(200).json({ message: "Deck successfully submitted" });
};

/* @POST /deck/combo
 * Input: Combo information and deck information in body.
 * Output: Combo added to Combo table
 */
const submit_combo = async (req: Request, res: Response) => {
  const comboData = comboSchema.parse(req.body);
  return res.send(await postCombo(comboData));
};

/* @GET /deck/deck-info
 * Input: Deck ID
 * Output: Get information from the Deck table.
 * This endpoint might not be needed
 */
const get_deck_by_id = async (req: Request, res: Response) => {
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

/* @GET /deck/:id
 * Input: Deck ID
 * Output: Get all card information for a given deck
 */
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

/* @GET /deck/combolist/:deckid
 * Input: Deck ID
 * Output: Get all combos associated with a deck
 */
const get_combos_by_deck_id = async (req: Request, res: Response) => {
  const deckId = parseInt(req.params.deckid);
  return res.send(await getComboById(deckId));
};

/* @POST /deck/data
 * Input: Array of cards with information attached
 * Output: Object with calculated deck stats
 */
const get_deck_data = async (req: Request, res: Response) => {
  const { deck } = deckDataSchema.parse(req.body);
  const counter = {
    c1k: 0,
    c2k: 0,
    event: 0, // figure out best way to do this
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
  const keyword = new Map();

  deck.forEach((i) => {
    // TODO: Event counter
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
    // Keywords
    i.keywords.forEach((a) => {
      if (a === "") {
        return;
      }
      else if (a === "EventCounter") {
        counter.event += i.copies;
      }
      else if (a === "Double Attack") {
        keyword.set("DoubleAttack", (type.get("DoubleAttack") || 0) + i.copies);
      } else {
        keyword.set(a, (keyword.get(a) || 0) + i.copies);
      }

    });
    // Trigger keyword is stored in a separate column
    if (i.trigger !== null && i.trigger !== "") {
      keyword.set("Trigger", (keyword.get("Trigger") || 0) + i.copies);
    }
  });

  const z = {
    counter,
    cardType,
    cost: Object.fromEntries(cost),
    power: Object.fromEntries(power),
    attribute: Object.fromEntries(attribute),
    type: Object.fromEntries(type),
    keywords: Object.fromEntries(keyword),
  };

  return res.send(z);
};

const get_leaders = async (_: Request, res: Response) => {
  return res.send(await getLeaders());
};

const get_matches_by_id = async (req: Request, res: Response) => {
  console.log(`Calling GET /decks/matches/${req.params.id}`);
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
  get_deck_by_id,
  get_deck_list_by_id,
  get_combos_by_deck_id,
  get_deck_data,
  get_leaders,
  get_matches_by_id,
  submit_match,
};
