import TokenDecoder from '../helpers/TokenDecoder';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';


export default async (req: Request, _res: Response, next: NextFunction) => {
  try {
    let user = null;
    const { email, billing : { firstName, lastName } } = req.body;
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

    if (!user) {
      user = new User({ email, firstName, lastName, isGuest: true })
      await user.save()
    }
    req.body.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
