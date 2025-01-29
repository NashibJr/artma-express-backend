import { Router } from "express";
import UserController from "../controllers/user.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";

const UserRouter = Router();

const upload = multer({ storage, limits: { fileSize: 2000000 } }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "frontNID", maxCount: 1 },
  { name: "backNID", maxCount: 1 },
]);

UserRouter.post("/create", upload, UserController.create);
UserRouter.get("/download/:image", UserController.download);
UserRouter.post("/non-customer/login", UserController.login);
UserRouter.delete("/delete/:id", UserController.deleteUser);

export default UserRouter;
