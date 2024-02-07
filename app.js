/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const dotenv = require('dotenv');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleError } = require('./middleware/handlerError');
const { NotFoundError } = require('./errors/NotFoundError');

dotenv.config();

const { NODE_ENV, MONGO_URL } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(handleError);

// подключаем мидлвары, роуты и всё остальное...

app.listen(3001);
