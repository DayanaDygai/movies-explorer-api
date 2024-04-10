const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const dotenv = require('dotenv');
const cors = require('./middleware/cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleError } = require('./middleware/handlerError');
const NotFoundError = require('./errors/NotFoundError');
const rateLimit = require('./middleware/rateLimit');

dotenv.config();

const { NODE_ENV, PORT, MONGO_URL } = process.env;

const app = express();

app.use(rateLimit);

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(cors({
  origin: 'https://movies.daiana.nomoredomainswork.ru', // Укажите домен, с которого разрешены запросы
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
  credentials: true, // Разрешить отправку cookies
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

// подключаем мидлвары, роуты и всё остальное...

app.listen(PORT);
