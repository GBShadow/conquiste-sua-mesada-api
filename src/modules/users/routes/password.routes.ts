import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../useCases/forgotPassword/SendForgotPasswordEmailController';
import ResetPasswordController from '../useCases/resetPassword/ResetPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.index,
);

passwordRouter.post(
  '/reset',
  celebrate(
    {
      [Segments.BODY]: {
        token: Joi.string().min(4).max(4).required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    },
    {
      abortEarly: false,
    },
  ),
  resetPasswordController.create,
);

export default passwordRouter;
