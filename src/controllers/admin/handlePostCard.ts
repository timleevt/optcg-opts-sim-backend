import { Request, Response } from "express";
import postCard from "../../db/postCard";
import { z } from "zod";

const postCardSchema = z.object({
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
  trigger: z.string().nullable()
});

const handlePostCard = async (req: Request, res: Response) => {
  const {
    code,
    name,
    cardType,
    cost,
    type,
    power,
    attribute,
    counterPower,
    colors,
    effect,
    trigger,
  } = postCardSchema.parse(req.body);
  try {
    await postCard({
      code,
      name,
      cardType,
      cost,
      type,
      power,
      attribute,
      counterPower,
      colors,
      effect,
      trigger,
    });
    res.sendStatus(200);
  } catch (e) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export default handlePostCard;
