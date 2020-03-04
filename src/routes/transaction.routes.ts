import { Router, Request, Response, response } from 'express';
//import { celebrate as validate, errors } from 'celebrate';
//import cartItemValidation from '../validations/cartItem.validation';
import { init, verify } from '../controllers/transaction.controller';
//import userAuth from '../middlewares/userAddressAuth';
import checkoutAuth from '../middlewares/checkoutAuth';

const router = Router();

//router.use(userAuth);

router.post('/', checkoutAuth ,async function(req: Request, res: Response) {
  //create transaction and return id
  const { statusCode, message, payload, error } = await init(req.body.user, req.body);
  res.send({ statusCode, message, payload, error });
});

router.post('/verify', async function(req: Request, res: Response) {
  // verify transaction
  // @ts-ignore
  const { statusCode, message, payload, error } = await verify(req.body);

  return res.send({ statusCode, message, payload, error });
})

export default router;
