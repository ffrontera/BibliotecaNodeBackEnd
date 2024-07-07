import { index,
    showByTitle,
    showByAuthor,
    showByISBN,
    showById,
    showByGender,
    store,
    update,
    destroy } from '../controllers/books.controller.js';
import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import middleware from '../middelewares/auth.middleware.js';

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
booksRouter.get('/:titulo', showByTitle);
booksRouter.get('/id/:idSearch', showById);
booksRouter.get('/gender/:gender', showByGender);
booksRouter.get('/ISBN/:ISBN', showByISBN);
booksRouter.get('/author/:author', showByAuthor);
booksRouter.post('/', middleware, upload.single('tapa'), store);
booksRouter.put('/:id', middleware, upload.single('tapa'), update);
booksRouter.delete('/:id', middleware, destroy);

export default booksRouter;