import IGenerateTokenDTO from 'modules/users/dtos/IGenerateTokenDTO';
import UserToken from 'modules/users/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(date: IGenerateTokenDTO): Promise<UserToken>;
  findByToken(userToken: string): Promise<UserToken | undefined>;
  save(token: UserToken): Promise<UserToken | undefined>;
  delete(id: number): Promise<void>;
}
