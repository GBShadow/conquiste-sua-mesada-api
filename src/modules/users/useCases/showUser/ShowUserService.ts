import { inject, injectable } from 'tsyringe';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import User from 'modules/users/typeorm/entities/User';
import AppError from 'shared/errors/AppError';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not Found.');
    }

    return user;
  }
}

export default ShowUserService;
