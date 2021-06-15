import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAmountService from './CreateAmountService';

export default class CreateAmountController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { total, kid_id } = request.body;

    const createAmount = container.resolve(CreateAmountService);

    const amount = await createAmount.execute({
      total,
      kid_id,
    });

    return response.status(201).json(amount);
  }
}
