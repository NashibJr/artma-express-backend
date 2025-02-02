import { NextFunction, Request, Response } from "express";

const isAuthenticated = (
  req: Request,
  resp: Response,
  next: NextFunction
): any => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return resp.status(401).json({
        error: "You are unauthorized",
      });
    }

    next();
  } catch (error) {
    return resp.status(400).json({
      error: (error as Error).message,
    });
  }
};

export default isAuthenticated;
