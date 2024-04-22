import handleGetDeck from "../controllers/deck/handleGetDeckByCardList";

const express = require("express");
const router = express.Router();

const deckController = require("../controllers/deckController");

/*** General ***/
// Deck
// app.post("/deck", handleGetDeckByCardList);
// app.get("/decks", handleGetDecks);
// app.get("/deck/:deckID", handleGetDeckById);
// app.post("/deck", handlePostDeck);

router.post("/submit-decklist", deckController.submit_decklist);
router.get("/deck-info", deckController.get_deck_info_by_id);
router.get("/:id", deckController.get_deck_list_by_id);

module.exports = router;
