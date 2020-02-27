import { Router, Request, Response } from 'express';
import { celebrate as validate, errors } from 'celebrate';
import tagValidator from '../validations/tag.validation';
import * as tagController from '../controllers/tag.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

//Get All Tags
router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await tagController.GetAllTags();

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Get one tag
router.get('/:tagID', async (req: Request, res: Response) => {
  try {
    const response = await tagController.GetSingleTag(req.params.tagID);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

//Create Tag
router.use(adminAuth);
router.post(
  '/',
  validate(tagValidator.create, { abortEarly: false }),
  async (req: Request, res: Response) => {
    try {
      const response = await tagController.Create(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  },
);

//Delete Tag
router.delete('/:tagID', async (req: Request, res: Response) => {
  try {
    const response = await tagController.Delete(req.params.tagID);

    return res.status(response!.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

router.use(errors());

export default router;
