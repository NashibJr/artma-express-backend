import Joi from "joi";
import { UserTypes } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

const createSchema = Joi.object<UserTypes>({
  fullName: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  profileImage: Joi.string().optional(),
  phone: Joi.string().required(),
  address: Joi.string().optional(),
  nin: Joi.string().optional().min(14),
  role: Joi.string().required().valid("admin", "deliverer", "supplier"),
  frontNID: Joi.string().optional(),
  backNID: Joi.string().optional(),
  shopNumber: Joi.string().optional(),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
      )
    )
    .min(8)
    .messages({
      "string.min": "Password must have atleast 8 characters",
      "string.pattern":
        "Password must contain a number, a special character, an uppercase and a lowercase character",
    }),
});

const validateUser =
  (req: Request, resp: Response, next: NextFunction) =>
  (userData: UserTypes) => {
    try {
      const { error } = createSchema.validate(userData);

      if (error) {
        console.log(error);

        return error;
      }

      next();
    } catch (error) {
      return resp.status(400).json({
        error: (error as Error).message,
      });
    }
  };

export default validateUser;
