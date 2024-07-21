import { Router } from "express";
import {
    createAuthor,
    destroyAuthor,
    searchAuthorByName,
    showAllAuthors,
    showAuthor,
    updateAuthor
} from '../controllers/authors.controller.js';
import middleware from '../middelewares/auth.middleware.js';

const authorsRouter = Router();

authorsRouter.get('/', middleware, showAllAuthors);
authorsRouter.get('/:id', middleware, showAuthor);
authorsRouter.get('/name/:name' ,middleware, searchAuthorByName);
authorsRouter.post('/:name', middleware, createAuthor);
authorsRouter.put('/', middleware, updateAuthor);
authorsRouter.delete('/:id', middleware, destroyAuthor);

export default authorsRouter;