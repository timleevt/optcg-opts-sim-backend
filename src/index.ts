import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://optcg-opts-sim.com"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.set("trust proxy", 1);

const PORT = process.env.BACKEND_PORT || 5000;

// routes
app.use("/api", require("./routes/main"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/v1/admin", require("./routes/admin"));
app.use("/api/v1/deck", require("./routes/deck"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
