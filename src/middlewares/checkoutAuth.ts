import TokenDecoder from '../helpers/TokenDecoder';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';


export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = null;
    if (req.headers['authorization']) {
      const { decodedToken } = TokenDecoder(req);
  
      if (!decodedToken) {
        throw new Error('This token may have expired');
      }
  
      const { id } = decodedToken;
  
      user = await User.findById(id);
    } else {
      user = await User.findOne({ email: req.body.email })
    }

    if (user) {
      req.body.user = user;
      return next();
    }
    return res.json({ message: 'Unappoved User' });
  } catch (error) {
    next(error);
  }
};
