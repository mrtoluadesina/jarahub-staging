import { decode } from 'jwt-simple';
import { Request } from 'express';

export default (req: Request) => {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) throw new Error('Unauthorized');

    let token = authorization.split(' ')[1];

    return {
      token,
      decodedToken: decode(token, process.env.JWT_TOKEN_SECRET!),
    };
  } catch (error) {
    throw new Error('Token Expired');
  }
};
