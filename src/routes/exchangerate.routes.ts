import { Router, Request, Response } from 'express';
import {
  create,
  update,
  getExchangeRates as exchangeRates,
  getExchangeRate as exchangeRate,
} from '../controllers/exchangerate.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.get('/', async function getExchangeRates(_req: Request, res: Response) {
  try {
    const response = await exchangeRates();
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured', error: error.message });
  }
});

router.get('/:rateID', async function getExchangeRate(
  req: Request,
  res: Response,
) {
  const rateId = req.params.rateID;
  try {
    const response = await exchangeRate(rateId);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured', error: error.message });
  }
});

router.use(adminAuth);

router.post('/', async function createExchangeRate(
  req: Request,
  res: Response,
) {
  const data = req.body;

  try {
    const response = await create(data);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured', error: error.message });
  }
});

router.put('/:rateID', async function updateRate(req: Request, res: Response) {
  const data = req.body;
  const rateId = req.params.rateID;
  try {
    const response = await update(rateId, data);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured', error: error.message });
  }
});

export default router;
