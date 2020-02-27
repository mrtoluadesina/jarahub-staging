import { Router, Request, Response } from 'express';
//import { celebrate as validate, errors } from 'celebrate';
//import cartItemValidation from '../validations/cartItem.validation';
import { init } from '../controllers/transaction.controller';
import userAuth from '../middlewares/userAddressAuth';
// import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.use(userAuth);

router.post('/', async function(req: Request, res: Response) {
  //create transaction and return id
  const { statusCode, message, payload } = await init(req.body);
  res.send({ statusCode, message, payload });
});

export default router;
