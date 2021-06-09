import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

interface Request {
  user_id: number;
  name: string;
}

@injectable()
class UpdateKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute({ user_id, name }: Request): Promise<Kid> {
    const kid = await this.kidsRepository.findById(user_id);

    if (!kid) {
      throw new AppError('User not Found');
    }

    kid.name = name;

    return this.kidsRepository.save(kid);
  }
}

export default UpdateKidService;
