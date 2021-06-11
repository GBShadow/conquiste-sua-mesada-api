import { container } from 'tsyringe';

import 'modules/users/providers';
import './providers';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import UsersRepository from 'modules/users/typeorm/repositories/UsersRepository';

import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import KidsRepository from 'modules/kids/typeorm/repositories/KidsRepository';

import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';
import TodosRepository from 'modules/todos/typeorm/repositories/TodosRepository';

import IUserTokenRepository from 'modules/users/repositories/interfaces/IUserTokenRepository';
import UserTokenRepository from 'modules/users/typeorm/repositories/UserTokenRepository';

import IUserConfirmationTokenRepository from 'modules/users/repositories/interfaces/IUserConfirmationTokenRepository';
import UserConfirmationTokenRepository from 'modules/users/typeorm/repositories/UserConfirmationTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IUserConfirmationTokenRepository>(
  'UserConfirmationTokenRepository',
  UserConfirmationTokenRepository,
);

container.registerSingleton<IKidsRepository>('KidsRepository', KidsRepository);

container.registerSingleton<ITodosRepository>(
  'TodosRepository',
  TodosRepository,
);
