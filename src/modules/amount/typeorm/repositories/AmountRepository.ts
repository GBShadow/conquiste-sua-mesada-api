import { getRepository, Repository } from 'typeorm';

import ICreateAmountDTO from 'modules/amount/dtos/ICreateAmountDTO';
import IAmountRepository from 'modules/amount/repositories/interfaces/IAmountRepository';

import Amount from '../entities/Amount';

class AmountRepository implements IAmountRepository {
  private ormRepository: Repository<Amount>;

  constructor() {
    this.ormRepository = getRepository(Amount);
  }

  public async create({ kid_id, total }: ICreateAmountDTO): Promise<Amount> {
    const amount = this.ormRepository.create({
      kid_id,
      total,
    });

    await this.ormRepository.save(amount);

    return amount;
  }

  public async save(amount: Amount): Promise<Amount> {
    return this.ormRepository.save(amount);
  }

  public async findById(id: number): Promise<Amount | undefined> {
    const amount = await this.ormRepository.findOne({
      where: { id },
    });

    return amount;
  }

  public async findAll(kid_id: number): Promise<Amount[] | []> {
    const amounts = await this.ormRepository.find({ where: { kid_id } });

    return amounts;
  }
}

export default AmountRepository;
