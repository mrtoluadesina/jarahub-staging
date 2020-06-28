// @ts-ignore
import { Router, Request, Response } from 'express';
import { errors } from 'celebrate';
import * as statsCtrl from '../controllers/statistics.controller';

const router = Router();

router.get('/dashboard', async (_req: Request, res: Response) => {
  const {
    message,
    statusCode,
    error,
    payload,
  } = await statsCtrl.getDashboard();
  return res.json({ message, payload, error, statusCode });
});

router.get('/revenue', async (req: Request, res: Response) => {
  const range = req.query.range;
  const { statusCode, message, payload, error } = await statsCtrl.revenue(
    range,
  );
  return res.json({ statusCode, message, payload, error });
});

router.get('/order', async (req: Request, res: Response) => {
  const range = req.query.range;
  const { statusCode, message, payload, error } = await statsCtrl.order(range);
  return res.send({ statusCode, message, payload, error });
});

router.use(errors());
export default router;
