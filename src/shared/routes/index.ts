import { Router } from 'express';
import usersRouter from 'modules/users/routes/users.routes';
import sessionsRouter from 'modules/users/routes/sessions.routes';
import profileRouter from 'modules/users/routes/profile.routes';
import passwordRouter from 'modules/users/routes/password.routes';
import kidsRouter from 'modules/kids/routes/kids.routes';
import todosRouter from 'modules/todos/routes/todos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/kids', kidsRouter);
routes.use('/todos', todosRouter);

export default routes;
