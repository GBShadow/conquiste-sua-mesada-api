import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTodoService from './ListTodoService';

export default class ListTodoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { kid_id } = request.body;
    const listTodo = container.resolve(ListTodoService);

    const kids = await listTodo.execute({ kid_id });

    return response.status(200).json(kids);
  }
}
