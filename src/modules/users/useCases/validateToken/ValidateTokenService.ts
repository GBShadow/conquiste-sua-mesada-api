import { addHours, isAfter } from 'date-fns';
import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IUserTokenRepository from 'modules/users/repositories/interfaces/IUserTokenRepository';
import AppError from 'shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IResponse = {
  token: string;
};

@injectable()
class ValidateTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute(token: string): Promise<IResponse | undefined> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(Number(userToken.user_id));

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    userToken.active = true;

    await this.userTokenRepository.save(userToken);

    return { token: userToken.token };
  }
}

export default ValidateTokenService;
