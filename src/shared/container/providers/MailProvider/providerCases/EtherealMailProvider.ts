import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISenMailDTO from 'shared/container/providers/MailProvider/dtos/ISenMailDTO';
import IMailTemplateProvider from 'shared/container/providers/MailTemplateProvider/interfaces/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISenMailDTO): Promise<string | boolean> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Conquiste sua Mesada',
        address: from?.email || 'mesada@mesada.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    const previewURL = nodemailer.getTestMessageUrl(message);

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', previewURL);

    return previewURL;
  }
}

export default EtherealMailProvider;
