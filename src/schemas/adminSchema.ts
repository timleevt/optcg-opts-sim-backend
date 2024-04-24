import { z } from "zod";

export const postCardSchema = z.object({
  code: z.string(),
  name: z.string(),
  cardType: z.string(),
  cost: z.number().int().nullable(),
  type: z.array(z.string()),
  power: z.number().int().nullable(),
  attribute: z.array(z.string()),
  counterPower: z.number().int().nullable(),
  colors: z.array(z.string()),
  effect: z.string(),
  trigger: z.string().nullable(),
});
