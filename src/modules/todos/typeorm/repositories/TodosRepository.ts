import { getRepository, Repository } from 'typeorm';

import ICreateTodoDTO from 'modules/todos/dtos/ICreateTodoDTO';
import ITodosRepository from 'modules/todos/repositories/interfaces/ITodosRepository';

import Todo from '../entities/Todo';

class TodosRepository implements ITodosRepository {
  private ormRepository: Repository<Todo>;

  constructor() {
    this.ormRepository = getRepository(Todo);
  }

  public async create({ name, kid_id, value }: ICreateTodoDTO): Promise<Todo> {
    const kid = this.ormRepository.create({
      kid_id,
      name,
      value,
    });

    await this.ormRepository.save(kid);

    return kid;
  }

  public async save(kid: Todo): Promise<Todo> {
    return this.ormRepository.save(kid);
  }

  public async findByName(name: string): Promise<Todo | undefined> {
    const kid = await this.ormRepository.findOne({
      where: { name },
    });

    return kid;
  }

  public async findById(id: number): Promise<Todo | undefined> {
    const kid = await this.ormRepository.findOne({
      where: { id },
    });

    return kid;
  }

  public async findAll(kid_id: number): Promise<Todo[] | []> {
    const kids = await this.ormRepository.find({ where: { kid_id } });

    return kids;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TodosRepository;
