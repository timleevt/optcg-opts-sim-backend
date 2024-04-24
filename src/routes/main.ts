import { Request, Response } from "express";
import getColors from "../db/getColors";

const express = require("express");
const router = express.Router();

router.get("", (_: Request, res: Response) => {
  res.send("Hello world");
});

router.get("/test", async (_: Request, res: Response) => {
  res.send(await getColors());
});

module.exports = router;
