// @ts-ignore
import { Router, Request, Response } from 'express';
import { errors } from 'celebrate';
import * as statsCtrl from '../controllers/statistics.controller';


const router = Router();

router.get('/revenue', async (req: Request, res: Response)=> {
  const range = req.query.range
  const { statusCode, message, payload, error } = await statsCtrl.revenue(range)
  return res.json({ statusCode, message, payload, error });
})

router.use(errors())
export default router;