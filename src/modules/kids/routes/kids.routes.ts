import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from 'shared/middlewares/ensureAuthenticate';

import CreateKidController from '../useCases/createKid/CreateKidController';
import ListKidController from '../useCases/listKid/ListKidController';
import ShowKidController from '../useCases/showKid/ShowKidController';
import DeleteKidController from '../useCases/deleteKid/DeleteKidController';
import UpdateKidController from '../useCases/updateKid/UpdateKidController';

const kidsRouter = Router();

const createKidWebController = new CreateKidController();
const listKidController = new ListKidController();
const showKidController = new ShowKidController();
const deleteKidController = new DeleteKidController();
const updateKidController = new UpdateKidController();

kidsRouter.use(ensureAuthenticate);

kidsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  createKidWebController.index,
);

kidsRouter.get('/', listKidController.index);

kidsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  showKidController.index,
);

kidsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  updateKidController.index,
);

kidsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deleteKidController.index,
);

export default kidsRouter;
