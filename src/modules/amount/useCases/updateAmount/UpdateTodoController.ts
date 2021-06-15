import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateTodoService from './UpdateTodoService';

export default class UpdateTodoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, value, active } = request.body;
    const { id } = request.params;

    const updateTodo = container.resolve(UpdateTodoService);

    const todo = await updateTodo.execute({
      id: Number(id),
      name,
      value,
      active,
    });

    return response.status(201).json(todo);
  }
}
