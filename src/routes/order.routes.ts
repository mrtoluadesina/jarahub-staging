import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import orderValidation from '../validations/order.validation';
import reservationValidation from '../validations/reservation.validation';
import {
  createOrder,
  changeOrderStatus,
  getUserOrder,
  getOrder,
  GetAllOrder,
} from '../controllers/order.controller';
import { create } from '../controllers/reservation.controller';
import userAuth from '../middlewares/userAddressAuth';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.use(userAuth);
router.post('/', async function(req: Request, res: Response) {
  try {
    const response = await createOrder(req.body.id, req.body);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/:id', async function(req: Request, res: Response) {
  try {
    const response = await getOrder(req.params.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Get order for a single user
router.get('/user/:userID', async function(req: Request, res: Response) {
  try {
    const response = await getUserOrder(req.params.userID);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(adminAuth);
router.put(
  '/status/:id',
  validate(orderValidation.updateStatus, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await changeOrderStatus(req.params.id, req.body.status);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.get('/', async function(req: Request, res: Response) {
  try {
    const response = await GetAllOrder(req.query);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post(
  '/reservation',
  validate(reservationValidation.create, { abortEarly: false }),
  async function(req, res) {
    try {
      const response = await create(req.body.id, req.body);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.use(errors());

export default router;
