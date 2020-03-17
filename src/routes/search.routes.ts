import { Response, Request, Router } from 'express';
import { searchProducts } from '../controllers/search.controller';

const router = Router();

router.get('/:searchQuery', async (req: Request, res: Response) => {
  try {
    const response = await searchProducts(req.params.searchQuery);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});
