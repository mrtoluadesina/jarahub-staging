import { Router, Request, Response } from 'express';
import { create, update } from '../controllers/exchangerate.controller';

const router = Router();

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
