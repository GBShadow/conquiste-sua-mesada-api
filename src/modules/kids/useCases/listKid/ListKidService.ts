import { inject, injectable } from 'tsyringe';

import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

type IRequest = {
  user_id: number;
};

@injectable()
class ListKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Kid[] | undefined> {
    const kids = await this.kidsRepository.findAll(user_id);

    return kids;
  }
}

export default ListKidService;
