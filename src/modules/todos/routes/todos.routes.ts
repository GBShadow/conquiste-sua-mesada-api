import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from 'shared/middlewares/ensureAuthenticate';

import CreateTodoController from '../useCases/createTodo/CreateTodoController';
import ListTodoController from '../useCases/listTodo/ListTodoController';
import ShowTodoController from '../useCases/showTodo/ShowTodoController';
import DeleteTodoController from '../useCases/deleteTodo/DeleteTodoController';
import UpdateTodoController from '../useCases/updateTodo/UpdateTodoController';

const todosRouter = Router();

const createTodoWebController = new CreateTodoController();
const listTodoController = new ListTodoController();
const showTodoController = new ShowTodoController();
const deleteTodoController = new DeleteTodoController();
const updateTodoController = new UpdateTodoController();

todosRouter.use(ensureAuthenticate);

todosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      kid_id: Joi.number().required(),
      name: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  createTodoWebController.index,
);

todosRouter.get('/', listTodoController.index);

todosRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  showTodoController.index,
);

todosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      value: Joi.number(),
      active: Joi.boolean(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  updateTodoController.index,
);

todosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deleteTodoController.index,
);

export default todosRouter;
