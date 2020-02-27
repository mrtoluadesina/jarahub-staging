import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import cartItemValidation from '../validations/cartItem.validation';
import {
  createCartItem,
  removeCartItem,
  getCartItem,
} from '../controllers/cartItem.controller';
import userAuth from '../middlewares/userAddressAuth';

const router = Router();

router.use(userAuth);

router.post(
  '/',
  validate(cartItemValidation.create, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const { statusCode, message, payload } = await createCartItem(
        req.body,
        req.body.productDetailsId,
      );

      return res.status(statusCode).json({ statusCode, message, payload });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.get('/', async function(req: Request, res: Response) {
  try {
    const response = await getCartItem(req.body.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.delete('/:id', async function(req: Request, res: Response) {
  try {
    const response = await removeCartItem(req.params.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.use(errors());

export default router;
