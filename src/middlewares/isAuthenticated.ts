import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

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

    const decoded = jwtDecode(token);
    if (decoded?.exp! < Math.floor(Date.now() / 1000)) {
      return resp.status(401).json({
        error: "Expired token",
      });
    }

    next();
  } catch (error) {
    return resp.status(401).json({
      error: (error as Error).message,
    });
  }
};

export default isAuthenticated;
