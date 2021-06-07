import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from 'shared/middlewares/ensureAuthenticate';

import CreateUserWebController from '../useCases/createUser/CreateUserWebController';
import CreateUserMobileController from '../useCases/createUser/CreateUserMobileController';
import ListUserController from '../useCases/listUser/ListUserController';
import ShowUserController from '../useCases/showUser/ShowUserController';
import DeleteUserController from '../useCases/deleteUser/DeleteUserController';
import UpdateUserController from '../useCases/updateUser/UpdateUserController';
import ShowProfileController from '../useCases/showProfile/ShowProfileController';
import UpdateProfileController from '../useCases/updateProfile/UpdateProfileController';

const usersRouter = Router();

const createUserWebController = new CreateUserWebController();
const createUserMobileController = new CreateUserMobileController();
const listUserController = new ListUserController();
const showUserController = new ShowUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().required(),
      roles: Joi.array().required(),
    },
  }),
  createUserWebController.index,
);

usersRouter.post(
  '/mobile',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().required(),
    },
  }),
  createUserMobileController.index,
);

usersRouter.use(ensureAuthenticate);

usersRouter.get('/', listUserController.index);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  showUserController.index,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6),
      phone: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  updateUserController.index,
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deleteUserController.index,
);

usersRouter.get('/me', showProfileController.index);

usersRouter.put(
  '/me',
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

export default usersRouter;
