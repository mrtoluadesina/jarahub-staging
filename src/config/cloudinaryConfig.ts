import { Request, Response, NextFunction } from 'express';
const { config, uploader } = require('cloudinary');
require('dotenv').config();

const cloudinaryConfig = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

module.exports = { cloudinaryConfig, uploader };
