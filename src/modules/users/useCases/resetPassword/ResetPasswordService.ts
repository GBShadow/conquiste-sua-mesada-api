import { inject, injectable } from 'tsyringe';
import { isAfter, addMinutes } from 'date-fns';

import AppError from 'shared/errors/AppError';
import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IUserTokenRepository from 'modules/users/repositories/interfaces/IUserTokenRepository';
import IHashProvider from 'modules/users/providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    if (!userToken.active) {
      throw new AppError('Token inactive');
    }

    const user = await this.usersRepository.findById(Number(userToken.user_id));

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenUpdatedAt = userToken.updated_at;
    const compareDate = addMinutes(tokenUpdatedAt, 5);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userTokenRepository.delete(userToken.id);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
