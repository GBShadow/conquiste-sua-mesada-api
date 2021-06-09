import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';

@injectable()
class DeleteKidService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const kid = await this.kidsRepository.findById(id);

    if (!kid) {
      throw new AppError('Kid not Found.');
    }

    await this.kidsRepository.delete(id);
  }
}

export default DeleteKidService;
