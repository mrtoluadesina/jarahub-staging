import { Router, Response, Request } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import addressValidation from '../validations/address.validation';
import {
  createAddress,
  getAllAddress,
  getUserAddress,
} from '../controllers/address.controller';
import userAuth from '../middlewares/userAddressAuth';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.use(userAuth);
router.post(
  '/',
  validate(addressValidation.create, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await createAddress(req.body, req.body.id);

      return res
        .status(response.statusCode)
        .json({ message: response.message, payload: response.payload });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.get('/:id', async function(req: Request, res: Response) {
  try {
    const response = await getUserAddress(req.params.id);

    return res
      .status(response.statusCode)
      .json({ message: response.message, payload: response.payload });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(adminAuth);
router.get('/', async function(_req: Request, res: Response) {
  try {
    const response = await getAllAddress();

    return res
      .status(response.statusCode)
      .json({ message: response.message, payload: response.payload });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
