import { Router, Request, Response } from 'express';
import { errors } from 'celebrate';
//import discountValidation from '../validations/discount.validation';
import * as couponController from '../controllers/coupon.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();
router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    return res.json({ message: 'original' });
  })
  // create a coupon code
  .post(adminAuth, async (req: Request, res: Response) => {
    try {
      const {
        message,
        statusCode,
        error,
        payload,
      } = await couponController.createCoupon(req.body);
      return res.status(statusCode).json({
        message,
        payload,
        error,
        statusCode,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        statusCode: error.status,
      });
    }
  });

//Get a Single Discount
router.get('/:code', async (req: Request, res: Response) => {
  try {
    const {
      message,
      statusCode,
      error,
      payload,
    } = await couponController.getCoupon(req.params.code);

    return res.status(statusCode).json({
      message,
      payload,
      error,
      statusCode,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: error.status,
    });
  }
});

router.use(errors());

export default router;
