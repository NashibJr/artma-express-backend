import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/user.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";
import validate from "../helpers/password.validation";
import isAuthenticated from "../middlewares/isAuthenticated";

const UserRouter = Router();

const upload = multer({ storage, limits: { fileSize: 2000000 } }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "frontNID", maxCount: 1 },
  { name: "backNID", maxCount: 1 },
]);

UserRouter.post("/create", upload, isAuthenticated, UserController.create);
UserRouter.get("/download/:image", isAuthenticated, UserController.download);
UserRouter.post("/login", UserController.login);
UserRouter.delete("/delete/:id", isAuthenticated, UserController.deleteUser);
UserRouter.put("/update/:id", isAuthenticated, UserController.updateUser);
UserRouter.put(
  "/change-password/:id",
  isAuthenticated,
  (req: Request, resp: Response, next: NextFunction) =>
    validate(req, resp, next)(req.body),
  UserController.changePassword
);
UserRouter.get("/all", isAuthenticated, UserController.getUsers);
UserRouter.get("/:id", isAuthenticated, UserController.getUser);

export default UserRouter;
