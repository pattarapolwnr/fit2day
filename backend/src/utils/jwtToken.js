const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secretKey = '$%^#2tPq8!Lk$5fA@9'; // Replace with a strong, random key
  return jwt.sign({ userId }, secretKey, { expiresIn: '2h' });
};

const verifyToken = (token) => {
  const secretKey = '$%^#2tPq8!Lk$5fA@9';
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
