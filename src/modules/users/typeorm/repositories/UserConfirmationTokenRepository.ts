import { getRepository, Repository } from 'typeorm';

import UserConfirmationToken from 'modules/users/typeorm/entities/UserConfirmationToken';
import IUserConfirmationTokenRepository from 'modules/users/repositories/interfaces/IUserConfirmationTokenRepository';
import randomNumbers from 'shared/utils/randomNumbers';

class UserConfirmationTokensRepository
  implements IUserConfirmationTokenRepository
{
  private ormRepository: Repository<UserConfirmationToken>;

  constructor() {
    this.ormRepository = getRepository(UserConfirmationToken);
  }

  public async generate(user_id: number): Promise<UserConfirmationToken> {
    const token = await this.generateValidToken();

    const userToken = this.ormRepository.create({
      user_id,
      token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(
    token: string,
  ): Promise<UserConfirmationToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  private async generateValidToken(): Promise<string> {
    const token = randomNumbers();

    const existToken = await this.ormRepository.findOne({
      where: { token },
    });

    if (existToken) {
      this.generateValidToken();
    }

    return token;
  }
}

export default UserConfirmationTokensRepository;
