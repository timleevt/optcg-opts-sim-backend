import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
// import handlePostCard from "./handler/admin/handlePostCard";
// import handleGetDeckByCardList from "./handler/deck/handleGetDeckByCardList";
// import handlePostDeck from "./handler/deck/handlePostDeck";
// import handleGetDecks from "./handler/deck/handleGetDecks";

const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = 5000 || process.env.PORT;

app.use("/", require("./routes/main"));

/*** Admin ***/
// Card
// app.post("/admin/card", handlePostCard);

app.use("/deck", require("./routes/deck"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
