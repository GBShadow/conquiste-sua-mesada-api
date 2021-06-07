import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    const emailURL = await sendForgotPasswordEmailService.execute({
      email,
    });

    return response.status(200).json({ emailURL });
  }
}

export default ForgotPasswordController;
