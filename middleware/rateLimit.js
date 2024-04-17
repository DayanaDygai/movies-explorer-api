const setRateLimit = require('express-rate-limit');

const rateLimit = setRateLimit({
  windowMs: 60 * 1000,
  limit: 200,
  message: 'Вы превысили лимит запросов в 5 запросов в минуту',
  headers: true,
});

module.exports = rateLimit;
