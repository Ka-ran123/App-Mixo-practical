import { NextFunction, Request, Response } from "express";
import { errorLog } from "../helpers/logger.js";
import { HttpStatus } from "../enums/enums.js";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = "";
  let stack: string | null = null;

  if (err instanceof Error) {
    message = err.message;
    stack = err.stack || null;

    if ("statusCode" in err && typeof err.statusCode === "number") {
      statusCode = err.statusCode;
    }
  }

  errorLog(`Error: ${message}, Stack: ${stack}`);

  res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
};

export default globalErrorHandler;
