import { Router } from 'express';
import usersRouter from 'modules/users/routes/users.routes';
import sessionsRouter from 'modules/users/routes/sessions.routes';
import profileRouter from 'modules/users/routes/profile.routes';
import passwordRouter from 'modules/users/routes/password.routes';
import tokenRouter from 'modules/users/routes/token.routes';
import confirmationRouter from 'modules/users/routes/confirmation.routes';
import roleRouter from 'modules/roles/routes/roles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/validate-token', tokenRouter);
routes.use('/validate-email', confirmationRouter);
routes.use('/roles', roleRouter);

export default routes;
