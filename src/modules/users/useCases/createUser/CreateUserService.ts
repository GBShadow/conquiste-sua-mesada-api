import { inject, injectable } from 'tsyringe';

import User from 'modules/users/typeorm/entities/User';
import AppError from 'shared/errors/AppError';

import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IHashProvider from 'modules/users/providers/HashProvider/interfaces/IHashProvider';
import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';

type IRequest = {
  name: string;
  email: string;
  password: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
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

    return user;
  }
}

export default CreateUserService;
