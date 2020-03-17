import { Request, Response, Router } from 'express';
import { Create } from '../controllers/collection.controller';
import { celebrate as validate, errors } from 'celebrate';
import collectionValidator from '../validations/collection.validation';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.use(adminAuth);
router.post(
  '/',
  validate(collectionValidator.create, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await Create(req.body);
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
