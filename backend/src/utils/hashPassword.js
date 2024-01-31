const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassowrd) => {
  return await bcrypt.compare(password, hashedPassowrd);
};

module.exports = { hashPassword, comparePassword };
