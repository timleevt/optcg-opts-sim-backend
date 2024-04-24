import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

const deckController = require("../controllers/deckController");

/*** General ***/
// Deck
// app.post("/deck", handleGetDeckByCardList);

router.get("/list", deckController.get_list_of_decks);
router.get("/deck-info", deckController.get_deck_info_by_id);
router.get("/:id", deckController.get_deck_list_by_id);
router.post("/submit-decklist", deckController.submit_decklist);

module.exports = router;
