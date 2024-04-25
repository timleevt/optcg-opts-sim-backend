import { z } from "zod";

export const deckListSchema = z.object({
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
