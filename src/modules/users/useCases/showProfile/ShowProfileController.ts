import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProfileService from './ShowProfileService';

export default class ShowProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(id);

    return response.status(201).json(classToClass(user));
  }
}
