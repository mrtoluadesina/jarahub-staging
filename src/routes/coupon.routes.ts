import { Router, Request, Response } from 'express';
import { errors } from 'celebrate';
//import discountValidation from '../validations/discount.validation';
import * as couponController from '../controllers/coupon.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();
router
  .route('/')
  .get(adminAuth, async (_req: Request, res: Response) => {
    const {
      message,
      statusCode,
      error,
      payload,
    } = await couponController.getAll();
    return res.json({ message, payload, error, statusCode });
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

// update and delete coupon
router.route('/:couponId').put(
  adminAuth,
  async (req: Request, res: Response)=> {
    try {
      const {
        message,
        statusCode,
        error,
        payload,
      } = await couponController.update(req.body, req.params.couponId);
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
  }
).delete(
  adminAuth,
  async (req: Request, res: Response) => {
  try {
    const {
      message,
      statusCode,
      error,
      payload,
    } = await couponController.deleteCoupon(req.params.couponId);
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
})

router.use(errors());

export default router;
