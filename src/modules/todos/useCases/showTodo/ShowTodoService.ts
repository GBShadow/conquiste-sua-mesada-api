import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

@injectable()
class ShowKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute(id: number): Promise<Kid | undefined> {
    const kid = await this.kidsRepository.findById(id);

    if (!kid) {
      throw new AppError('Kid not Found.');
    }

    return kid;
  }
}

export default ShowKidService;
