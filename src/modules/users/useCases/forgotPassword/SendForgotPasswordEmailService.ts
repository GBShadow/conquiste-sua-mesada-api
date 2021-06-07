import AppError from 'shared/errors/AppError';
import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';
import IUserTokenRepository from 'modules/users/repositories/interfaces/IUserTokenRepository';
import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';
import templateEmailConfig from 'config/templateEmail';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<string | boolean> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário inexistente', 404);
    }

    const { token } = await this.userTokenRepository.generate({
      user_id: user.id,
      email,
    });

    const emailURL = await this.mailProvider.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: '[Conquiste sua Mesada] - Recuperação de senha ',
      templateData: {
        file: templateEmailConfig.forgotPassword,
        variables: {
          name: user.name,
          token,
        },
      },
    });

    return emailURL;
  }
}

export default SendForgotPasswordEmailService;
