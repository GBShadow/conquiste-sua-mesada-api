import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import UpdateProfileService from './UpdateProfileService';

export default class UpdateUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, old_password, password, phone } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: Number(id),
      name,
      email,
      old_password,
      password,
      phone,
    });

    return response.status(200).json(classToClass(user));
  }
}
