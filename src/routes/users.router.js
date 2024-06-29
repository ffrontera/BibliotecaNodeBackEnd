import { Router } from 'express';
import { show, store, update, destroy } from '../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', show);

usersRouter.post('/', store);

usersRouter.put('/', update);

usersRouter.delete('/', destroy);

export default usersRouter;