import { Router } from "express";
import { 
    createCopyBook, 
    destroyCopyBook, 
    getBookCopies, 
    updateCopyBook 
} from "../controllers/bookCopies.controller.js";
import middleware from '../middelewares/auth.middleware.js';

const bookCopiesRouter = Router();

bookCopiesRouter.get('/:id_libro', middleware, getBookCopies);
bookCopiesRouter.post('/', middleware, createCopyBook);
bookCopiesRouter.put('/:id', middleware, updateCopyBook)
bookCopiesRouter.delete('/:id', middleware, destroyCopyBook);


export default bookCopiesRouter;