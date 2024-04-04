import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import handlePostCard from "./handler/admin/handlePostCard";
import handleGetDeckByCardList from "./handler/deck/handleGetDeckByCardList";
import handlePostDeck from "./handler/deck/handlePostDeck";
import handleGetDecks from "./handler/deck/handleGetDecks";

const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = 5000;

// ping(test)
app.get("/alive", (_, res) => {
  res.status(200).send("alive!");
});

/*** Admin ***/
// Card
app.post("/admin/card", handlePostCard);

/*** General ***/
// Deck
app.get("/deck", handleGetDeckByCardList);
app.get("/decks", handleGetDecks);
app.post("/deck", handlePostDeck);


app.listen(port, () => console.log(`Running on port ${port}`));
