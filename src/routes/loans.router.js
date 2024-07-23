import { Router } from "express";
import { 
    createLoan, 
    destroyLoan, 
    returnLoan, 
    showLoan, 
    updateLoan
} from "../controllers/loans.controller.js";
import middleware from "../middelewares/auth.middleware.js";

const loansRouter = Router();

loansRouter.get('/:idPartner', showLoan);
loansRouter.post('/', middleware, createLoan);
loansRouter.put('/:id', middleware, updateLoan);
loansRouter.patch('/:idCopy', middleware, returnLoan);
loansRouter.delete('/:id', middleware, destroyLoan);

export default loansRouter;