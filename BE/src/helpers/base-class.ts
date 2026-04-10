import { Response } from "express";
import { HttpStatus } from "../enums/enums.js";
import { messages } from "../constant/messages.js";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class AppSuccess {
  static success(
    res: Response,
    data = null,
    message: string = messages.SUCCESS,
    statusCode: number = HttpStatus.OK,
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}
