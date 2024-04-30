const bcrypt = require("bcrypt");

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error, salt: number) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err: Error, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
