import User from 'modules/users/typeorm/entities/User';
import ICreateUserDTO from 'modules/users/dtos/ICreateUserDTO';

type IUsersRepository = {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  findAll(): Promise<User[] | []>;
  delete(id: number): Promise<void>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: ICreateUserDTO): Promise<User>;
};

export default IUsersRepository;
