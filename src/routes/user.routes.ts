import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import { celebrate as validate, errors } from 'celebrate';
import userValidation from '../validations/user.validation';
// import validate from '../validations/user.validation';
import userAuth from '../middlewares/userAuth';

const router = express.Router();

router.post(
  '/',
  validate(userValidation.createUser, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await userController.Signup(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.post(
  '/login',
  validate(userValidation.login, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await userController.Login(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.get(
  '/me',
  userAuth,
  async function(req: Request, res: Response) {
    try {
      const { user } = req.body;
      return res
        .status(200)
        .json(user)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
)

router.put(
  '/:userID',
  validate(userValidation.createUser, { abortEarly: false }),
  async function(req: Request, res: Response) {
    try {
      const response = await userController.Update(req.body, req.params.userID);

      return res.status(response!.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

router.delete('/:userID', async function(req: Request, res: Response) {
  try {
    const response = await userController.Delete(req.body, req.params.userID);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/:userID', async function(req: Request, res: Response) {
  try {
    const response = await userController.getOneUser(req.params.userID);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/', async function(_req: Request, res: Response) {
  try {
    const response = await userController.getAllUsers();

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
