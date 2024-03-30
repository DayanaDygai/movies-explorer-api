const bcrypt = require('bcrypt');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotAuthenticateError = require('../errors/NotAuthenticateError');
const generateToken = require('../utils/jwt');

const User = require('../models/User');

const STATUS_OK = 200;
// запрос успешно выполнен

const STATUS_OK_CREATED = 201;
// запрос выполнен и создан новый ресурс

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

module.exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(STATUS_OK).send({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.editInfoUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send({ email: user.email, name: user.name });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Такой пользователь уже существует'));
    }
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (error.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы неккоректные данные'));
    }
    return next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new NotAuthenticateError('Не верные логин или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new NotAuthenticateError('Не верные логин или пароль');
    }
    const token = generateToken({ _id: user._id });
    return res.status(STATUS_OK).send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SOLT_ROUND);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    return res.status(STATUS_OK_CREATED).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Такой пользователь уже существует'));
    }
    if (error.name === 'ValidationError') {
      return next(new NotAuthenticateError('Переданы неккоректные данные'));
    }
    return next(error);
  }
};
