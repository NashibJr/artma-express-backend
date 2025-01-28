import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const app = express();

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    app.use(express.json(), express.urlencoded({ extended: true }));

    app.listen(9090, () => console.log("Connected to the server"));
  } catch (error) {
    console.log(error, ">>>");
  }
};

main();
