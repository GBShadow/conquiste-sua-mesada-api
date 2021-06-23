import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowAmountService from './ShowAmountService';

export default class ShowAmountController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAmount = container.resolve(ShowAmountService);

    const amount = await showAmount.execute(Number(id));

    return response.status(200).json(amount);
  }
}
