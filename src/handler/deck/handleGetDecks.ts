import { Request, Response } from "express";
import getDecks from "../../db/getDecks";


const handleGetDecks = async (req: Request, res: Response) => {
  return res.send(await getDecks())
};

export default handleGetDecks;
