import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import UserRouter from "./src/routers/user.router";
import CategoryRouter from "./src/routers/category.router";

config();

const app = express();

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    app.use(express.json(), express.urlencoded({ extended: true }));
    app.use("/api/v1/users", UserRouter);
    app.use("/api/v1/categories", CategoryRouter);

    app.listen(9090, () => console.log("Connected to the server"));
  } catch (error) {
    console.log(error, ">>>");
  }
};

main();
