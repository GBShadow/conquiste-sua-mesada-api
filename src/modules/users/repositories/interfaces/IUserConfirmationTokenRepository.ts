import UserConfirmationToken from 'modules/users/typeorm/entities/UserConfirmationToken';

type IUserConfirmationTokenRepository = {
  generate(user_id: number): Promise<UserConfirmationToken>;
  findByToken(userToken: string): Promise<UserConfirmationToken | undefined>;
  delete(id: number): Promise<void>;
};

export default IUserConfirmationTokenRepository;
