import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConfirmationUserService from './ConfirmationUserService';

export default class ConfirmationUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const confirmationUser = container.resolve(ConfirmationUserService);

    await confirmationUser.execute({ token });

    return response.status(204).json();
  }
}
