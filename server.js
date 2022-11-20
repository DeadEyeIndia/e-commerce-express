import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import database from "./database/config.js";
import user from "./routes/user.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// Database connection
database();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/v1", user);

app.listen(PORT, () => {
  console.log("Listening ...");
});
