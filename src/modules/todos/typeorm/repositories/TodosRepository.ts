import { getRepository, Repository } from 'typeorm';

import ICreateTodoDTO from 'modules/todos/dtos/ICreateTodoDTO';
import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';

import Todo from '../entities/Todo';

class TodosRepository implements ITodosRepository {
  private ormRepository: Repository<Todo>;

  constructor() {
    this.ormRepository = getRepository(Todo);
  }

  public async create({ todos, kid_id }: ICreateTodoDTO): Promise<Todo[]> {
    const newTodos = todos.map(todo =>
      this.ormRepository.create({
        kid_id,
        name: todo.name,
        value: todo.value,
      }),
    );

    await this.ormRepository.save(newTodos);

    return newTodos;
  }

  public async save(todos: Todo[]): Promise<Todo[]> {
    return this.ormRepository.save(todos);
  }

  public async findByName(name: string): Promise<Todo | undefined> {
    const todo = await this.ormRepository.findOne({
      where: { name },
    });

    return todo;
  }

  public async findById(id: number): Promise<Todo | undefined> {
    const todo = await this.ormRepository.findOne({
      where: { id },
    });

    return todo;
  }

  public async findAll(kid_id: number): Promise<Todo[] | []> {
    const todos = await this.ormRepository.find({ where: { kid_id } });

    return todos;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TodosRepository;
