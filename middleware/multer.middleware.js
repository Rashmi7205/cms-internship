import path from 'path';
import multer from 'multer';

// Get the directory name of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const upload = multer({
    dest: path.join(__dirname, '../uploads'), 
    limits: { fileSize: 5 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Create the 'uploads' directory if it doesn't exist
            const uploadsPath = path.join(__dirname, '../uploads');
            cb(null, uploadsPath);
        },
        destination: path.join(__dirname, '../uploads'),
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
