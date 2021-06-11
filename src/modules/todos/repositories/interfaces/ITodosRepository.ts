import Todo from 'modules/todos/typeorm/entities/Todo';
import ICreateTodoDTO from 'modules/todos/dtos/ICreateTodoDTO';

type ITodosRepository = {
  findById(id: number): Promise<Todo | undefined>;
  findAll(kid_id: number): Promise<Todo[] | []>;
  delete(id: number): Promise<void>;
  create(data: ICreateTodoDTO): Promise<Todo>;
  save(data: ICreateTodoDTO): Promise<Todo>;
};

export default ITodosRepository;
