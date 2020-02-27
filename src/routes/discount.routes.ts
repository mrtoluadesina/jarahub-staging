import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import discountValidation from '../validations/discount.validation';
import * as discountController from '../controllers/disocunt.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

//Get a Single Discount
router.get('/:discountID', async (req: Request, res: Response) => {
  try {
    const payload = await discountController.GetSingleDiscount(
      req.params.discountID,
    );

    return res.status(payload.statusCode).json(payload);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Create a Discount
router.use(adminAuth);

//Get all Discounts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const payload = await discountController.GetAllDiscounts();

    return res.status(200).json(payload);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post(
  '/',
  validate(discountValidation.create, { abortEarly: false }),
  async (req: Request, res: Response) => {
    try {
      const payload = await discountController.Create(req.body);

      return res.status(200).json(payload);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

//Update a Discount
router.put(
  '/:discountID',
  validate(discountValidation.create, { abortEarly: false }),
  async (req: Request, res: Response) => {
    try {
      const payload = await discountController.Update(
        req.body,
        req.params.discountID,
      );

      return res.status(payload!.statusCode).json(payload);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

//Delete a Discount
router.delete('/:discountID', async (req: Request, res: Response) => {
  try {
    const payload = await discountController.Delete(
      req.body,
      req.params.discountID,
    );

    return res.status(payload!.statusCode).json(payload);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
