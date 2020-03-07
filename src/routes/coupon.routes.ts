import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
//import discountValidation from '../validations/discount.validation';
//import * as discountController from '../controllers/disocunt.controller';
//import adminAuth from '../middlewares/adminAuth';

const router = Router();

//Get a Single Discount
router.get('/', async (req: Request, res: Response) => {

});

router.use(errors());

export default router;
