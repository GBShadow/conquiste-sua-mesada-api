import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ShowUserService from './ShowUserService';

export default class ShowUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(Number(id));

    return response.status(200).json(classToClass(user));
  }
}
