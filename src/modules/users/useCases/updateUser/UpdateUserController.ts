import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import UpdateUserService from './UpdateUserService';

export default class UpdateUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, email, old_password, password } = request.body;
    const { id } = request.params;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id: Number(id),
      name,
      email,
      old_password,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}
