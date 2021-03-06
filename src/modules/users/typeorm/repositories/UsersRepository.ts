import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from 'modules/users/dtos/ICreateUserDTO';
import IUsersRepository from 'modules/users/repositories/interfaces/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findAll(): Promise<User[] | []> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersRepository;
