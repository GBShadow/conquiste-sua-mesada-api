import { getRepository, Repository } from 'typeorm';

import ICreateKidDTO from 'modules/kids/dtos/ICreateKidDTO';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';

import Kid from '../entities/Kid';

class KidsRepository implements IKidsRepository {
  private ormRepository: Repository<Kid>;

  constructor() {
    this.ormRepository = getRepository(Kid);
  }

  public async create({ name, user_id }: ICreateKidDTO): Promise<Kid> {
    const kid = this.ormRepository.create({
      name,
      user_id,
    });

    await this.ormRepository.save(kid);

    return kid;
  }

  public async save(kid: Kid): Promise<Kid> {
    return this.ormRepository.save(kid);
  }

  public async findByName(name: string): Promise<Kid | undefined> {
    const kid = await this.ormRepository.findOne({
      where: { name },
    });

    return kid;
  }

  public async findById(id: number): Promise<Kid | undefined> {
    const kid = await this.ormRepository.findOne({
      where: { id },
    });

    return kid;
  }

  public async findAll(): Promise<Kid[] | []> {
    const kids = await this.ormRepository.find();

    return kids;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default KidsRepository;
