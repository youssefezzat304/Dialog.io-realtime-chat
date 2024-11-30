import multer from "multer";
import path from "path";

export const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
