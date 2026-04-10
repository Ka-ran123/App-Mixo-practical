import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/error-handler-middleware.js";
import indexRoute from "./routes/index-route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", indexRoute);

app.use(globalErrorHandler);

export default app;
