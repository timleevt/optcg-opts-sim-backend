import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("", (_: Request, res: Response) => {
  res.send("Hello world");
});

module.exports = router;
