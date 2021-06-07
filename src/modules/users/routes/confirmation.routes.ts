import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ConfirmationUserController from '../useCases/confirmationUser/ConfirmationUserController';

const confirmationRouter = Router();
const confirmationUserController = new ConfirmationUserController();

confirmationRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().min(4).max(4).required(),
    },
  }),
  confirmationUserController.index,
);

export default confirmationRouter;
