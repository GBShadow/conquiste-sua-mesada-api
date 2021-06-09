import { inject, injectable } from 'tsyringe';

import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

@injectable()
class ListKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute(): Promise<Kid[] | undefined> {
    const kids = await this.kidsRepository.findAll();

    return kids;
  }
}

export default ListKidService;
