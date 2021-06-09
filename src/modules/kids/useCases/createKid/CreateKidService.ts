import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';

import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';
import Kid from 'modules/kids/typeorm/entities/Kid';

type IRequest = {
  name: string;
  user_id: number;
};

@injectable()
class CreateKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<Kid> {
    const userAlreadyExist = await this.kidsRepository.findByName(name);

    if (userAlreadyExist) {
      throw new AppError('Kid already exist');
    }

    const kid = await this.kidsRepository.create({
      name,
      user_id,
    });

    return kid;
  }
}

export default CreateKidService;
