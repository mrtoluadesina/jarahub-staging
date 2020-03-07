import { Router, Request, Response } from 'express';
import { errors } from 'celebrate';
//import discountValidation from '../validations/discount.validation';
import * as couponController from '../controllers/coupon.controller';
//import adminAuth from '../middlewares/adminAuth';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
  return res.json({ message: 'original' })
})

//Get a Single Discount
router.get('/:code', async (req: Request, res: Response) => {
  try {
    const { message, statusCode, error, payload } = await couponController.GetCoupon(
      req.params.code
    )
  
    return res.status(statusCode).json({
      message, payload, error, statusCode
    }) 
  } catch (error) {
    return res.status(500).json({
      message: error.message, statusCode: error.status
    }) 
  }
});


router.use(errors());

export default router;
