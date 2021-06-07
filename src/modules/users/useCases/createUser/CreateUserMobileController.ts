import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateUserService from './CreateUserService';

export default class CreateUserMobileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
      roles: ['USER'],
    });

    return response.status(201).json(classToClass(user));
  }
}
