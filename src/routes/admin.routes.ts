import { Request, Response, Router } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import userValidation from '../validations/user.validation';

import {
  createAdmin,
  getAllAdmin,
  updateAdmin,
  blockAdmin,
  unblockAdmin,
  loginAdmin,
  getSingleAdmin,
} from '../controllers/admin.controllers';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.use(adminAuth);
router.post(
  '/',
  validate(userValidation.createUser, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await createAdmin(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.get('/:id', async function(req: Request, res: Response) {
  try {
    const response = await getSingleAdmin(req.params.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/', async function(_req: Request, res: Response) {
  try {
    const response = await getAllAdmin();

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.put('/:id', async function(req: Request, res: Response) {
  try {
    const response = await updateAdmin(req.params.id, { $set: req.body });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post('/:id/block', async function(req: Request, res: Response) {
  try {
    const response = await blockAdmin(req.params.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post('/:id/unblock', async function(req: Request, res: Response) {
  try {
    const response = await unblockAdmin(req.params.id);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post(
  '/login',
  validate(userValidation.login, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response = await loginAdmin(email, password);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.use(errors());

export default router;
