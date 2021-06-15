import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowTodoService from './ShowTodoService';

export default class ShowTodoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTodo = container.resolve(ShowTodoService);

    const todo = await showTodo.execute(Number(id));

    return response.status(200).json(todo);
  }
}
