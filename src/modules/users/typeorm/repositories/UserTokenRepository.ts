import UserToken from 'modules/users/typeorm/entities/UserToken';
import IUserTokenRepository from 'modules/users/repositories/interfaces/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import randomNumbers from 'shared/utils/randomNumbers';
import IGenerateTokenDTO from 'modules/users/dtos/IGenerateTokenDTO';
import UserResetPasswordLog from '../entities/UserResetPasswordLog';

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  private logRepository: Repository<UserResetPasswordLog>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
    this.logRepository = getRepository(UserResetPasswordLog);
  }

  public async generate({
    user_id,
    email,
  }: IGenerateTokenDTO): Promise<UserToken> {
    const validToken = await this.generateValidToken();

    const userToken = this.ormRepository.create({
      user_id,
      token: validToken,
    });

    await this.ormRepository.save(userToken);
    await this.createLog(email);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    await this.ormRepository.save(token);
    return token;
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

  private async createLog(email: string): Promise<void> {
    const log = this.logRepository.create({ email });
    await this.logRepository.save(log);
  }
}

export default UserTokensRepository;
