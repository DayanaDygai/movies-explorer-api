const setRateLimit = require('express-rate-limit');

const rateLimit = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Вы привысили лимит запросов в 5 минут',
  headers: true,
});

module.exports = rateLimit;
