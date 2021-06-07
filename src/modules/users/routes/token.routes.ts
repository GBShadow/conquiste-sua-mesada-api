import { Router } from 'express';
import ValidateTokenController from '../useCases/validateToken/ValidateTokenController';

const tokenRouter = Router();

const validateTokenController = new ValidateTokenController();

tokenRouter.post('/', validateTokenController.index);

export default tokenRouter;
