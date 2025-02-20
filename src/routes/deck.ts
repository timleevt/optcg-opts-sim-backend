const express = require("express");
const router = express.Router();

const deckController = require("../controllers/deckController");

/*** General ***/
// Deck
// app.post("/deck", handleGetDeckByCardList);

// TODO: all these routes are dead now due to changing the resource to v1. need to update
// router.get("/list", deckController.get_list_of_decks);
// router.get("/deck-info", deckController.get_deck_by_id);
// router.get("/leaders", deckController.get_leaders);
// router.get("/:id", deckController.get_deck_list_by_id);
// router.get("/matches/:accountId", deckController.get_matches_by_id);
// router.get("/list/:accountId", deckController.get_decks_by_accountid);
// router.get("/combolist/:deckid", deckController.get_combos_by_deck_id);
// router.post("/data", deckController.get_deck_data);
// router.post("/match", deckController.submit_match);

// Documented
router.get("/registered-leaders", deckController.get_registered_leaders);
router.get("/decks-leader", deckController.get_decks_by_leader);
router.get("/cards-deckid", deckController.get_cards_by_deckId);
router.post("/submit-decklist", deckController.submit_decklist);
router.post("/data", deckController.get_deck_data);
router.get("/archive", deckController.get_archived_decks);
router.get("/:id", deckController.get_deck_list_by_id);
router.get("/combos/:leader", deckController.get_combos_by_leader);
router.post("/combo", deckController.submit_combo);

module.exports = router;
