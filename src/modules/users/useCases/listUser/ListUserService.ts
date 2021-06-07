import { inject, injectable } from 'tsyringe';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import User from 'modules/users/typeorm/entities/User';
import AppError from 'shared/errors/AppError';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
