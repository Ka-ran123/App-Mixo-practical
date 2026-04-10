import rateLimit from "express-rate-limit";
import { BLOCK_DURATION, MAX_ATTEMPTS } from "../constant/constant.js";
import { messages } from "../constant/messages.js";

const rateLimiter = rateLimit({
  windowMs: BLOCK_DURATION,
  max: MAX_ATTEMPTS,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: messages.TOO_MANY_ATTEMPTS,
  },
  skipSuccessfulRequests: true,
});

export default rateLimiter;
