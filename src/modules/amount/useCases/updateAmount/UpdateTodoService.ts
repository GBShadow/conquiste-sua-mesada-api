import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import Todo from 'modules/todos/typeorm/entities/Todo';
import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';

interface IRequest {
  id: number;
  name: string;
  value: number;
  active: boolean;
}

@injectable()
class UpdateTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  public async execute({ id, name, value, active }: IRequest): Promise<Todo> {
    const todo = await this.todosRepository.findById(id);

    if (!todo) {
      throw new AppError('Todo not Found');
    }

    todo.name = name;
    todo.value = value;
    todo.active = active;

    return this.todosRepository.save(todo);
  }
}

export default UpdateTodoService;
