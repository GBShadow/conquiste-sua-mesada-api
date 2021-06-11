import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';

@injectable()
class DeleteTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const todo = await this.todosRepository.findById(id);

    if (!todo) {
      throw new AppError('Todo not Found.');
    }

    await this.todosRepository.delete(id);
  }
}

export default DeleteTodoService;
