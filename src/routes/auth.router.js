import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import middleware from '../middelewares/auth.middleware.js'

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/protected', middleware, (req, res) => {
    res.json({ userID: req.userId });
});

export { authRouter };