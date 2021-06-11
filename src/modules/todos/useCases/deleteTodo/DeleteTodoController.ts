import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteTodoService from './DeleteTodoService';

export default class DeleteTodoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTodo = container.resolve(DeleteTodoService);

    await deleteTodo.execute(Number(id));

    return response.status(204).json();
  }
}
