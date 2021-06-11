import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';

import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';
import Todo from 'modules/todos/typeorm/entities/Todo';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';

type IRequest = {
  name: string;
  value: number;
  kid_id: number;
};

@injectable()
class CreateTodoService {
  constructor(
    @inject('KidsRepository')
    private kidsRepository: IKidsRepository,

    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  public async execute({ name, value, kid_id }: IRequest): Promise<Todo> {
    const kid = await this.kidsRepository.findByName(name);

    if (kid) {
      throw new AppError('Kid does not exist');
    }

    const todo = await this.todosRepository.create({
      name,
      value,
      kid_id,
    });

    return todo;
  }
}

export default CreateTodoService;
