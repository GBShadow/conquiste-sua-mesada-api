import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';

import Amount from 'modules/amount/typeorm/entities/Amount';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import IAmountRepository from 'modules/amount/repositories/interfaces/IAmountRepository';

type IRequest = {
  total: number;
  kid_id: number;
};

@injectable()
class CreateAmountService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,

    @inject('AmountRepository')
    private amountRepository: IAmountRepository,
  ) {}

  public async execute({ total, kid_id }: IRequest): Promise<Amount> {
    const kid = await this.kidsRepository.findById(kid_id);

    if (!kid) {
      throw new AppError('Kid does not exist');
    }

    const amount = await this.amountRepository.create({
      total,
      kid_id,
    });

    return amount;
  }
}

export default CreateAmountService;
