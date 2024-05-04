import { z } from "zod";

export const deckListSchema = z.object({
  author: z.string(),
  deckname: z.string(),
  deckStr: z.string(),
});

export const comboSchema = z.object({
  deckId: z.number(),
  currBoard: z.string(),
  comboBoard: z.string(),
  startCurve: z.number().gt(0).lt(11),
  endCurve: z.number().gt(0).lt(11),
  notes: z.string(),
});

const cardObject = z.object({
  code: z.string(),
  name: z.string(),
  cardType: z.string(),
  cost: z.number().nullable(),
  type: z.array(z.string()),
  power: z.number().nullable(),
  attribute: z.array(z.string()),
  counterPower: z.number().nullable(),
  colors: z.array(z.string()),
  effect: z.string(),
  trigger: z.string().nullable(),
  keywords: z.array(z.string()),
  copies: z.number(),
});
export const deckDataSchema = z.object({
  deck: z.array(cardObject)
});

const matchObject = z.object({
  deckId: z.number(),
  leader: z.string(),
  event: z.string(),
  turn: z.number().gt(0).lt(3),
  dice: z.string(),
  result: z.string()
})

export const matchSchema = z.object({
  match: matchObject
})
