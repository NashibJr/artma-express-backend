import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user.services";
import JWT, { JwtPayload } from "jsonwebtoken";
interface UploadFields {
  profileImage?: Express.Multer.File[];
  frontNID?: Express.Multer.File[];
  backNID?: Express.Multer.File[];
}

const UserController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = req.files as UploadFields;

      const data = await UserServices.createUser(
        req.body,
        file?.profileImage! && file.profileImage[0].filename,
        file?.backNID! && file.backNID[0].filename,
        file?.frontNID! && file.frontNID[0].filename
      );

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  download: async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const {
        params: { image },
      } = req;
      resp.download(`${process.cwd()}/src/profile-images/${image}`);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  login: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await UserServices.login(req.body);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  deleteUser: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await UserServices.deleteUser(id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  updateUser: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
      const data = await UserServices.updateUser(body, id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  changePassword: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
      const data = await UserServices.changePassword(body, id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getUsers: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { query } = req;
      const data = await UserServices.getUsers(query?.role as string);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getUser: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await UserServices.getUser(req.params.id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getLoggedinUser: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    interface Iprops extends JwtPayload {
      id: string;
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const payload = JWT.verify(token!, process.env.JWT_SECRET!) as Iprops;
      const user = await UserServices.getUser(payload.id);

      resp.status(200).json(user);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  uploadProfilePic: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await UserServices.uploadProfilePic(
        req.file?.filename!,
        req.params.id
      );

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  queryUsers: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { query } = req;
      const data = await UserServices.queryUsers(query?.role as string);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
};

export default UserController;
