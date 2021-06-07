import { inject, injectable } from 'tsyringe';

import User from 'modules/users/typeorm/entities/User';
import AppError from 'shared/errors/AppError';
import templateEmailConfig from 'config/templateEmail';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IUserConfirmationTokenRepository from 'modules/users/repositories/interfaces/IUserConfirmationTokenRepository';
import IHashProvider from 'modules/users/providers/HashProvider/interfaces/IHashProvider';
import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';

type IRequest = {
  name: string;
  email: string;
  password: string;
};

type IResponse = {
  user: User;
  emailUrl: string | boolean;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserConfirmationTokenRepository')
    private userConfirmationTokenRepository: IUserConfirmationTokenRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('User already exist');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { token } = await this.userConfirmationTokenRepository.generate(
      user.id,
    );

    const emailUrl = await this.mailProvider.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: '[Conquiste sua Mesada] - Confirmação de email ',
      templateData: {
        file: templateEmailConfig.emailConfirmation,
        variables: {
          name: user.name,
          token,
        },
      },
    });

    return { user, emailUrl };
  }
}

export default CreateUserService;
