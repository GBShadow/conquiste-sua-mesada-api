import { inject, injectable } from 'tsyringe';

import IAmountRepository from 'modules/amount/repositories/interfaces/IAmountRepository';
import Amount from 'modules/amount/typeorm/entities/Amount';

type IRequest = {
  kid_id: number;
};

@injectable()
class ListAmountService {
  constructor(
    @inject('AmountRepository')
    private amountRepository: IAmountRepository,
  ) {}

  public async execute({ kid_id }: IRequest): Promise<Amount[] | undefined> {
    const amounts = await this.amountRepository.findAll(kid_id);

    return amounts;
  }
}

export default ListAmountService;
