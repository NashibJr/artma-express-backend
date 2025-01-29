import Joi from "joi";
import { ChangePAsswordTypes } from "../types/auth.types";
import { NextFunction, Request, Response } from "express";

const passwordSchema = Joi.object<ChangePAsswordTypes>({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
      )
    ),
});

const validate =
  (req: Request, resp: Response, next: NextFunction) =>
  (data: ChangePAsswordTypes) => {
    try {
      const { error } = passwordSchema.validate(data);
      if (error) {
        resp.status(406).json({
          error: error.details[0].message.replace('"', ""),
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error, ":::");
    }
  };

export default validate;
