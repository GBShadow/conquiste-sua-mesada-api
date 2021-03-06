import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IAmountRepository from 'modules/amount/repositories/interfaces/IAmountRepository';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Amount from 'modules/amount/typeorm/entities/Amount';

interface IRequest {
  id: number;
  kid_id: number;
  total: number;
}

@injectable()
class UpdateAmountService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,

    @inject('AmountRepository')
    private amountRepository: IAmountRepository,
  ) {}

  public async execute({ id, total, kid_id }: IRequest): Promise<Amount> {
    const kid = await this.kidsRepository.findById(kid_id);

    if (!kid) {
      throw new AppError('Kid not Found.');
    }

    const amount = await this.amountRepository.findById(id);

    if (!amount) {
      throw new AppError('Amount not Found.');
    }

    amount.total = total;

    await this.amountRepository.save(amount);

    return amount;
  }
}

export default UpdateAmountService;
