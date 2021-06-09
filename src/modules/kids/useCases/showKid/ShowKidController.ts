import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowKidService from './ShowKidService';

export default class ShowKidController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showKid = container.resolve(ShowKidService);

    const kid = await showKid.execute(Number(id));

    return response.status(200).json(kid);
  }
}
