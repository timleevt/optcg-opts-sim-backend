import { Request, Response } from "express";
import { postCardSchema } from "../schemas/adminSchema";
import postCard from "../db/postCard";

const post_card = async (req: Request, res: Response) => {
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
}

module.exports = {
    post_card
}