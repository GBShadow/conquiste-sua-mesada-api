import ISenMailDTO from 'shared/container/providers/MailProvider/dtos/ISenMailDTO';

export default interface IMailProvider {
  sendMail(data: ISenMailDTO): Promise<string | boolean>;
}
