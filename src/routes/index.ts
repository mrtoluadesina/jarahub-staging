import { Router } from 'express';
import sampleController from '../controllers/sample';
import seed from '../db/seed';

const router = Router();

router.get('/', function(_req, res, _next) {
  const message = sampleController();

  res.status(200).json({ message });
});

router.post('/seed', function(req, res, _next) {
  if (req.query.owner == `${process.env.OWNER}`) {
    seed();
  }

  res.status(200).json({ message: 'done' });
});

export default router;
