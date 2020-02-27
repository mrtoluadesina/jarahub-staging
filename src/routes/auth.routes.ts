import { Router, Request, Response } from 'express';
import {
  createForgotPassword,
  resetPassword,
} from '../controllers/auth.controller';
import authValidation from '../validations/auth.validation';
import { celebrate as validate, errors } from 'celebrate';
import userAuth from '../middlewares/userAuth';

const router = Router();

router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  async function(req: Request, res: Response) {
    try {
      const response = await createForgotPassword(req.body);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.use(userAuth);

router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  async function(req: Request, res: Response) {
    try {
      const response = await resetPassword(req.body.password, req.body.id);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.use(errors());

export default router;
