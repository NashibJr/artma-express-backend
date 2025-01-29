import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user.services";

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

      resp.status(200).json(data);
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
};

export default UserController;
