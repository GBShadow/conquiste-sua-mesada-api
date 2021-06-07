import { inject, injectable } from 'tsyringe';
import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IUserConfirmationTokenRepository from 'modules/users/repositories/interfaces/IUserConfirmationTokenRepository';
import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';
import AppError from 'shared/errors/AppError';

type IRequest = {
  token: string;
};

@injectable()
class ConfirmationUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserConfirmationTokenRepository')
    private userConfirmationTokenRepository: IUserConfirmationTokenRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userConfirmationTokenRepository.findByToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token does not exist');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.active = true;

    await this.userConfirmationTokenRepository.delete(userToken.id);
    await this.usersRepository.save(user);
  }
}

export default ConfirmationUserService;
