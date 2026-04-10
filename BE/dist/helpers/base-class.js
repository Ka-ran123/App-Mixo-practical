import { HttpStatus } from "../enums/enums.js";
import { messages } from "../constant/messages.js";
export class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export class AppSuccess {
    static success(res, data = null, message = messages.SUCCESS, statusCode = HttpStatus.OK) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
}
