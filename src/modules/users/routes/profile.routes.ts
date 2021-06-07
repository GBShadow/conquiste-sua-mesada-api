import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from 'shared/middlewares/ensureAuthenticate';

import ShowProfileController from '../useCases/showProfile/ShowProfileController';
import UpdateProfileController from '../useCases/updateProfile/UpdateProfileController';

const profileRouter = Router();

const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.get('/', showProfileController.index);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6),
      phone: Joi.string(),
    },
  }),
  updateProfileController.index,
);

export default profileRouter;
