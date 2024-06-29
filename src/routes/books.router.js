import { index,
    show,
    store,
    update,
    destroy } from '../controllers/books.controller.js';
import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const booksRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /webp|jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("No es un archivo permitido");
    },
    limits: { fileSize: 1024 * 1024 * 1 },
});

booksRouter.get('/', index);
booksRouter.get('/:titulo', show);
booksRouter.post('/', upload.single('tapa'),store);
booksRouter.put('/:id', upload.single('tapa'), update);
booksRouter.delete('/:id', destroy);

export default booksRouter;