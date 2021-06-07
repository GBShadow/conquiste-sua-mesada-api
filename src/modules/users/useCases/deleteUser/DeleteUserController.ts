import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteUserService from './DeleteUserService';

export default class ListUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(Number(id));

    return response.status(204).json();
  }
}
