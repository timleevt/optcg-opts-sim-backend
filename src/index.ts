import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

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
app.use("/admin", require("./routes/admin"));
app.use("/deck", require("./routes/deck"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
