import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserController from '../useCases/authenticateUser/AuthenticateUserController';

const sessionRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  authenticateUserController.index,
);

export default sessionRouter;
