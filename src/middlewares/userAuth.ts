import { decode } from 'jwt-simple';
import TokenDecoder from '../helpers/TokenDecoder';
import User from '../models/user.model';
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
    return res.json({ message: 'Unappoved User' });
  } catch (error) {
    next(error);
  }
};

export const decodeToken = async (token: string) => {
  try {
    const decodedToken = decode(token, process.env.JWT_TOKEN_SECRET!);

    if (!decodedToken) {
      throw new Error('This token may have expired');
    }

    const { id } = decodedToken;
    const user = await User.findById(id);
    if (user) {
      return user;
    }
    return { message: 'Unappoved User' };
  } catch (error) {
    return { message: 'Unappoved User' };
  }
};
