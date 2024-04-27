const express = require("express");
const router = express.Router();

const deckController = require("../controllers/deckController");

/*** General ***/
// Deck
// app.post("/deck", handleGetDeckByCardList);

router.get("/list", deckController.get_list_of_decks);
router.get("/deck-info", deckController.get_deck_info_by_id);
router.get("/leaders", deckController.get_leaders);
router.get("/:id", deckController.get_deck_list_by_id);
router.post("/submit-decklist", deckController.submit_decklist);
router.post("/combo", deckController.submit_combo);
router.get("/combolist/:deckid", deckController.get_combos_by_deck_id);
router.post("/data", deckController.get_deck_data);

module.exports = router;
