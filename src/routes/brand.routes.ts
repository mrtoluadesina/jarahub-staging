import { Router, Request, Response } from 'express';
import {
  create,
  deleteBrand,
  getSingleBrand,
  getBrands,
} from '../controllers/brand.controller';

import { celebrate as validate, errors } from 'celebrate';
import brandValidation from '../validations/brand.validation';
import adminAuth from '../middlewares/adminAuth';

const router: Router = Router();

router.use(adminAuth);
router.post(
  '/',
  validate(brandValidation.create, { abortEarly: true }),
  async function(req: Request, res: Response) {
    try {
      const response = await create(req.body);
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
    const response = await getBrands(req.query);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/:brandID', async function(req: Request, res: Response) {
  try {
    const response = await getSingleBrand(req.params.brandID);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.messge });
  }
});

router.delete('/:brandID', async function(req: Request, res: Response) {
  try {
    const response = await deleteBrand(req.params.brandID);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
