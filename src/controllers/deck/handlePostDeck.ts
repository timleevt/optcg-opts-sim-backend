import { Request, Response } from "express";
import { z } from "zod";
import postDeck from "../../db/postDeck";

const postDeckSchema = z.object({
  name: z.string(),
  leader: z.string(),
  author: z.string(),
  decklist: z.string().array(),
  tech: z.string().array(),
  pin: z.string(),
  isPrivate: z.boolean(),
});

const handlePostDeck = async (req: Request, res: Response) => {
  const { name, leader, author, decklist, tech, pin, isPrivate } =
    postDeckSchema.parse(req.body);
  try {
    await postDeck({ name, leader, author, decklist, tech, pin, isPrivate });
    res.sendStatus(200);
  } catch (e) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export default handlePostDeck;
