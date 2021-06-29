import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';

import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';
import Todo from 'modules/todos/typeorm/entities/Todo';
import IKidsRepository from 'modules/kids/repositories/interfaces/IKidsRepository';

type ITodo = {
  name: string;
  value: number;
};

type IRequest = {
  todos: ITodo[];
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

  public async execute({ todos, kid_id }: IRequest): Promise<Todo[]> {
    const kid = await this.kidsRepository.findById(kid_id);

    if (!kid) {
      throw new AppError('Kid does not exist');
    }

    const todo = await this.todosRepository.create({
      todos,
      kid_id,
    });

    return todo;
  }
}

export default CreateTodoService;
