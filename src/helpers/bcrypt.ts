import bcrypt from 'bcryptjs';

const bcryptString = (string: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(string, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export default bcryptString;
