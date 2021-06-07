import { container } from 'tsyringe';

import IHashProvider from './HashProvider/interfaces/IHashProvider';
import BCryptHashProvider from './HashProvider/providerCases/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
