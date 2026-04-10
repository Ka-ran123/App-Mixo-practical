import dotenv from "dotenv";
dotenv.config();

type Config = {
  MONGODB_URL: string;
  PORT: string;
};

export const config: Config = {
  MONGODB_URL: process.env.MONGODB_URL as "",
  PORT: process.env.PORT as "",
};
