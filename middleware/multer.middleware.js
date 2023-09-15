import path from 'path';
import multer from 'multer';

// Get the directory name of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const upload = multer({
    dest: path.join(__dirname, '../uploads'), // Use a relative path
    limits: { fileSize: 5 * 1024 * 1024 }, // Max size 5 MB
    storage: multer.diskStorage({
        destination: path.join(__dirname, '../uploads'), // Use a relative path
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (
            ext !== '.jpg' &&
            ext !== '.png' &&
            ext !== '.webp' &&
            ext !== '.jpeg' &&
            ext !== '.mp4'
        ) {
            cb(new Error(`Unsupported File Format type ${ext}`), false);
            return;
        }
        cb(null, true);
    },
});

export default upload;

