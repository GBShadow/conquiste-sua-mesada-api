import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import IAmountRepository from 'modules/amount/repositories/interfaces/IAmountRepository';
import Amount from 'modules/amount/typeorm/entities/Amount';

@injectable()
class ShowAmountService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,

    @inject('AmountRepository')
    private amountRepository: IAmountRepository,
  ) {}

  public async execute(id: number): Promise<Amount | undefined> {
    const kid = await this.kidsRepository.findById(id);

    if (!kid) {
      throw new AppError('Kid not Found.');
    }

    const amount = await this.amountRepository.findByKidId(kid.id);

    if (!amount) {
      throw new AppError('Amount not Found.');
    }

    return amount;
  }
}

export default ShowAmountService;
