import { Router } from 'express';
import sampleController from '../controllers/sample';
import seed from '../db/seed';

const router = Router();

router.get('/', function(_req, res, _next) {
  const message = sampleController();

  res.status(200).json({ message });
});

router.post('/', function(_req, res, _next) {
  const seedMessage = seed();

  res.status(200).json({ seedMessage });
});

export default router;
