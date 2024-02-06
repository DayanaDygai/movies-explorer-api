const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/extensions
const NotAuthenticateError = require('../errors/NotAuthenticateError');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line func-names, consistent-return
const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    const validToken = token.replace('Bearer ', '');

    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    if (error.mesage === 'NotAuthanticate') {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    return next(error);
  }

  req.user = payload;
  next();
};

module.exports = auth;
