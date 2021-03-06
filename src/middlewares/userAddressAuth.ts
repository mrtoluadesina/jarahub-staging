import TokenDecoder from '../helpers/TokenDecoder';
import User from '../models/user.model';
import Admin from '../models/admin.model';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { decodedToken } = TokenDecoder(req);

    if (!decodedToken) {
      throw new Error('This token may have expired');
    }

    const { id } = decodedToken;

    const user = await User.findById(id);

    if (user) {
      req.body.id = id;
      req.body.user = user;
      return next();
    }
    const isAdmin = Admin.findById(id);
    if (isAdmin) {
      req.body.id = id;
      req.body.user = isAdmin;
      return next();
    }
    return res.json({ message: 'Unappoved User' });
  } catch (error) {
    next(error);
  }
};
