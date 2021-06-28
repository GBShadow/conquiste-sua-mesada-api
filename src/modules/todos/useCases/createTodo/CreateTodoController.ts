import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTodoService from './CreateTodoService';

export default class CreateTodoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { todos, kid_id } = request.body;

    const createTodo = container.resolve(CreateTodoService);

    const todo = await createTodo.execute({
      todos,
      kid_id,
    });

    return response.status(201).json(todo);
  }
}
