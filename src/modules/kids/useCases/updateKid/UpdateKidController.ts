import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateKidService from './UpdateKidService';

export default class UpdateKidController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateKid = container.resolve(UpdateKidService);

    const kid = await updateKid.execute({
      user_id: Number(id),
      name,
    });

    return response.status(201).json(kid);
  }
}
