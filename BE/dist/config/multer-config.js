import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "../constant/constant.js";
import { messages } from "../constant/messages.js";
import { getDirname } from "../helpers/dirname.js";
const __dirname = getDirname(import.meta.url);
// Create uploads folder if not exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = `${uuid()}-${file.originalname}`;
        cb(null, filename);
    },
});
// File filter (only images)
const fileFilter = (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(messages.INVALID_FILE_TYPE));
    }
};
// Multer instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE, // 2MB
    },
});
