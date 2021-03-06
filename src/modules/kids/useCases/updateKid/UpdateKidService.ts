import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

interface Request {
  id: number;
  name: string;
}

@injectable()
class UpdateKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute({ id, name }: Request): Promise<Kid> {
    const kid = await this.kidsRepository.findById(id);

    if (!kid) {
      throw new AppError('Kid not Found');
    }

    kid.name = name;

    return this.kidsRepository.save(kid);
  }
}

export default UpdateKidService;
