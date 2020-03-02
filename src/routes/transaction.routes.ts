import { Router, Request, Response } from 'express';
//import { celebrate as validate, errors } from 'celebrate';
//import cartItemValidation from '../validations/cartItem.validation';
import { init } from '../controllers/transaction.controller';
import userAuth from '../middlewares/userAddressAuth';
import checkoutAuth from '../middlewares/checkoutAuth';

const router = Router();

//router.use(userAuth);

router.post('/', checkoutAuth ,async function(req: Request, res: Response) {
  //create transaction and return id
  const { statusCode, message, payload } = await init(req.body.user, req.body);
  res.send({ statusCode, message, payload });
});

router.post('/verify', async function(req: Request, res: Response) {
  // verify transaction

  // create orders

  // return response
})

export default router;
