import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import UserRouter from "./routers/user.router";
import CategoryRouter from "./routers/category.router";
import ProductRouter from "./routers/product.router";
import OrderRouter from "./routers/order.router";
import OrderItemRouter from "./routers/orderItem.router";
import NotificationRouter from "./routers/notification.router";
import Cors, { CorsOptions } from "cors";
import cron from "node-cron";
import Notification from "./models/notification.model";
import moment from "moment";

config();

const app = express();
app.use("/profile-images", express.static("profile-images"));

const corsConfig = {
  credentials: true,
  origin: [process.env.FRONTEND_URL],
} as CorsOptions;

(() => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const notifications = await Notification.find({});
      const outDatedNotifications = notifications.filter(
        (notification) => moment().diff(notification.createdAt, "days") > 7
      );
      for (let outDatedNotification of outDatedNotifications) {
        await outDatedNotification.deleteOne();
      }
    } catch (error) {
      console.log(error, "::::");
    }
  });
})();

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    app.use(Cors(corsConfig));

    app.use(express.json(), express.urlencoded({ extended: true }));
    app.use("/api/v1/users", UserRouter);
    app.use("/api/v1/categories", CategoryRouter);
    app.use("/api/v1/products", ProductRouter);
    app.use("/api/v1/orders", OrderRouter);
    app.use("/api/v1/order-items", OrderItemRouter);
    app.use("/api/v1/notifications", NotificationRouter);

    app.listen(1010, () => console.log("Connected to the server"));
  } catch (error) {
    console.log(error, ">>>");
  }
};

main();
