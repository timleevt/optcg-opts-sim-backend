import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import handlePostCard from "./handler/handlePostCard";

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

// Admin API
app.post("/admin/card", handlePostCard);

// Card


app.listen(port, () => console.log(`Running on port ${port}`));
