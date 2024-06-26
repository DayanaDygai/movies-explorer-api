/* eslint-disable import/prefer-default-export */
const allowedCors = [
  'https://movies.daiana.nomoredomainswork.ru',
  'http://movies.daiana.nomoredomainswork.ru',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
};

// eslint-disable-next-line eol-last
export default cors;