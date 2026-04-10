import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../helpers/base-class.js";
import { HttpStatus } from "../enums/enums.js";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];

    throw new AppError(HttpStatus.BAD_REQUEST, firstError.msg);
  }

  next();
};
