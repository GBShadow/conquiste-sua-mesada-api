import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListKidService from './ListKidService';

export default class ListKidController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listKid = container.resolve(ListKidService);
    const { id } = request.user;

    const kids = await listKid.execute({ user_id: Number(id) });

    return response.status(200).json(kids);
  }
}
