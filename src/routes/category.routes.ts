import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import categoryValidation from '../validations/category.validation';
import * as categoryController from '../controllers/category.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

//get all categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await categoryController.GetAllCategories();

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//get a single category
router.get('/:categoryID', async (req: Request, res: Response) => {
  try {
    const response = await categoryController.GetSingleCategory(req.params._id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//create a category
router.use(adminAuth);
router.post(
  '/',
  validate(categoryValidation.create, { abortEarly: false }),
  async (req: Request, res: Response) => {
    try {
      const response = await categoryController.Create_v2(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

//update a category
router.put('/:categoryID', async (req: Request, res: Response) => {
  try {
    const response = await categoryController.Update(req.body, req.params._id);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//delete a category
router.delete('/:categoryID', async (req: Request, res: Response) => {
  try {
    const response = await categoryController.Delete(req.body, req.params._id);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
