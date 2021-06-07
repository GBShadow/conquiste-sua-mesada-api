import { inject, injectable } from 'tsyringe';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import AppError from 'shared/errors/AppError';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not Found.');
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
