import mongoose from "mongoose";
import { config } from "./env-config.js";
import { success, error } from "../helpers/logger.js";
import { messages } from "../constant/messages.js";

export const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(config.MONGODB_URL);
    success(`MongoDB connected: ${connectInstance.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      error(`Error connecting to MongoDB: ${err.message}`);
    } else {
      error(messages.UNKNOWN_ERROR);
    }
  }
};
