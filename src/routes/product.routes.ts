import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import productValidation from '../validations/product.validation';
import * as productController from '../controllers/product.controller';

import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await productController.getAllProductsPaginated(
      req.query.page,
    );
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occured', error: error.message });
  }
});
//Get all products
router.get('/all', async function(_req: Request, res: Response) {
  try {
    const response = await productController.getAllProducts();

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Get a single Product
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const response = await productController.GetASingleProduct(
      req.params.productId,
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const response = await productController.getProductsByCategoryWithPagination(
      req.query.page,
      req.params.category,
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/category/:category/all', async (req: Request, res: Response) => {
  try {
    const response = await productController.filterByCategory(
      req.params.category,
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/search/:query', async (req: Request, res: Response) => {
  try {
    const response = await productController.search(req.params.query);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Create a Product
router.use(adminAuth);
router.post(
  '/',
  validate(productValidation.create, { abortEarly: false }),
  async (req: Request, res: Response) => {
    try {
      const response = await productController.Create_v2(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

//Update a Product
router.put('/:productID', async (req: Request, res: Response) => {
  try {
    const response = await productController.Update(req.body, req.params._id);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Delete a Product
router.delete('/:productID', async (req: Request, res: Response) => {
  try {
    const response = await productController.Delete(req.body, req.params._id);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());
export default router;
