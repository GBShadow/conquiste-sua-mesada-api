import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from 'shared/middlewares/ensureAuthenticate';

import CreateTodoController from '../useCases/createTodo/CreateTodoController';
import ListTodoController from '../useCases/listTodo/ListTodoController';
import DeleteTodoController from '../useCases/deleteTodo/DeleteTodoController';
import UpdateTodoController from '../useCases/updateTodo/UpdateTodoController';

const todosRouter = Router();

const createTodoController = new CreateTodoController();
const listTodoController = new ListTodoController();
const deleteTodoController = new DeleteTodoController();
const updateTodoController = new UpdateTodoController();

todosRouter.use(ensureAuthenticate);

todosRouter.post('/', createTodoController.index);

todosRouter.get('/', listTodoController.index);

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
