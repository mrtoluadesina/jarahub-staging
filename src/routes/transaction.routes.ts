import { Router, Request, Response } from 'express';
//import { celebrate as validate, errors } from 'celebrate';
//import cartItemValidation from '../validations/cartItem.validation';
import {
  init,
  verify,
  getAllTransactions,
  getSingleTransaction,
} from '../controllers/transaction.controller';
//import userAuth from '../middlewares/userAddressAuth';
import checkoutAuth from '../middlewares/checkoutAuth';

const router = Router();

//router.use(userAuth);
router.get('/', async function(req: Request, res: Response) {
  const { statusCode, message, payload, error } = await getAllTransactions(
    req.query,
  );
  return res.send({ statusCode, message, payload, error });
});

router.get('/:transactionId', async (req: Request, res: Response) => {
  const { statusCode, message, payload, error } = await getSingleTransaction(
    req.params.transactionId,
  );
  return res.send({ statusCode, message, payload, error });
});

router.post('/', checkoutAuth, async function(req: Request, res: Response) {
  //create transaction and return id
  const { statusCode, message, payload, error } = await init(
    req.body.user,
    req.body,
  );
  res.send({ statusCode, message, payload, error });
});

router.post('/verify', async function(req: Request, res: Response) {
  const { statusCode, message, payload, error } = await verify(req.body);

  return res.send({ statusCode, message, payload, error });
});

export default router;
