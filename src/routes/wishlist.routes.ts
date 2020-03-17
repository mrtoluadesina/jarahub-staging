import { Request, Response, Router } from 'express';
import {
  Create,
  Delete,
  GetUserWishlist,
  GetWishlist,
} from '../controllers/wishlist.controller';
import userAuth from '../middlewares/userAuth';

const router = Router();

router.use(userAuth);
router.get('/', async function(_req: Request, res: Response) {
  try {
    const response = await GetWishlist();
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});
router.post('/', async function(req: Request, res: Response) {
  try {
    const response = await Create(req.body);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.delete('/:id', async function(req: Request, res: Response) {
  try {
    const response = await Delete(req.body.id, req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/me', async function(req: Request, res: Response) {
  try {
    const response = await GetUserWishlist(req.body.id);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
