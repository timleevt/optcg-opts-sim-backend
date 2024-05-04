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
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://optcg-opts-sim.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.set("trust proxy", 1);

const PORT = 5000 || process.env.BACKEND_PORT;

// routes
app.use("/", require("./routes/main"));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/deck", require("./routes/deck"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
