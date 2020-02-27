const { uploader } = require('../config/cloudinaryConfig');
const DataUri = require('datauri');
import path from 'path';

const uploadFile = async (req: any, res: any) => {
  try {
    if (Object.keys(req.files).length == 0) {
      throw new Error('No files were Provided to me');
    }
  } catch (error) {
    return res.status(400).send(error);
  }

  const dUri = new DataUri();
  const datauri = (req: any) =>
    dUri.format(path.extname(req.files['file'].name), req.files['file'].data);
  const result = { image: '', message: '' };
  const file = datauri(req).content;
  await uploader
    .upload(file)
    .then((data: any) => {
      result.image = data.secure_url;
      result.message = 'File Uploaded successfully';
    })
    .catch((error: any) => {
      result.image = null!;
      result.message = error;
      res.status(400).send({ errors: result });
    });
  return result;
};

export default uploadFile;
