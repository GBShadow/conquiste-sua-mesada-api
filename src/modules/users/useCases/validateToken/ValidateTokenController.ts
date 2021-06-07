import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ValidateTokenService from './ValidateTokenService';

export default class ValidateTokenController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const validateToken = container.resolve(ValidateTokenService);

    const validToken = await validateToken.execute(token);

    return response.status(200).json(validToken);
  }
}
