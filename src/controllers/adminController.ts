import { Request, Response } from "express";
import { postCardSchema } from "../schemas/adminSchema";
import postCard from "../db/postCard";

// @ PUT /admin/card
// Input: JSON Body with card information
// Output: Status 200
const create_card = async (req: Request, res: Response) => {
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
        keywords
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
          keywords
        });
        res.sendStatus(200);
      } catch (e) {
        return res.status(500).json({ error: "internal server error" });
      }
}

module.exports = {
  create_card
}