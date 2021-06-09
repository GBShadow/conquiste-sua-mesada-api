import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteKidService from './DeleteKidService';

export default class DeleteKidController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteKid = container.resolve(DeleteKidService);

    await deleteKid.execute(Number(id));

    return response.status(204).json();
  }
}
