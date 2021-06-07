import { container } from 'tsyringe';
import mailConfig from 'config/mail';

import IMailProvider from 'shared/container/providers/MailProvider/interfaces/IMailProvider';
import EtherealMailProvider from 'shared/container/providers/MailProvider/providerCases/EtherealMailProvider';
import GenericMailProvider from 'shared/container/providers/MailProvider/providerCases/GenericMailProvider';

import IMailTemplateProvider from 'shared/container/providers/MailTemplateProvider/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from 'shared/container/providers/MailTemplateProvider/providerCases/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailProvider: container.resolve(GenericMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
