import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISenMailDTO from 'shared/container/providers/MailProvider/dtos/ISenMailDTO';
import IMailTemplateProvider from 'shared/container/providers/MailTemplateProvider/interfaces/IMailTemplateProvider';
import AppError from 'shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import mailConfig from 'config/mail';

const { host, name, port, secure, auth } = mailConfig.transporter;

@injectable()
class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      name,
      host,
      port,
      secure,
      auth,
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISenMailDTO): Promise<string | boolean> {
    try {
      const email = await this.client.sendMail({
        from: {
          name: from?.name || 'Equipe Maktuber',
          address: from?.email || 'equipe@maktub.tech.com',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });

      return email;
    } catch (error) {
      throw new AppError(error, 400);
    }
  }
}

export default MailProvider;
