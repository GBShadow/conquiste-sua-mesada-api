import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateKidService from './CreateKidService';

export default class CreateKidController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.user;

    const createKid = container.resolve(CreateKidService);

    const kid = await createKid.execute({
      name,
      user_id: Number(id),
    });

    return response.status(201).json(kid);
  }
}
