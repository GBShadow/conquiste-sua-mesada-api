import { inject, injectable } from 'tsyringe';

import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';
import Todo from 'modules/todos/typeorm/entities/Todo';

type IRequest = {
  kid_id: number;
};

@injectable()
class ListTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  public async execute({ kid_id }: IRequest): Promise<Todo[] | undefined> {
    const todos = await this.todosRepository.findAll(kid_id);

    return todos;
  }
}

export default ListTodoService;
