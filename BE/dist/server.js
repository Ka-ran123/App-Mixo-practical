import app from "./app.js";
import { connectDB } from "./config/db-config.js";
import { config } from "./config/env-config.js";
import { messages } from "./constant/messages.js";
import { error, success } from "./helpers/logger.js";
const startServer = async () => {
    try {
        await connectDB();
        app.listen(config.PORT, () => {
            success(`Server running on port ${config.PORT}`);
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : messages.UNKNOWN_ERROR;
        error(`Error while starting server: ${message}`);
        process.exit(1); // stop app if critical failure
    }
};
startServer();
