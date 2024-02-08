const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMyProfile,
  editInfoUser,
} = require('../controllers/users');

userRouter.get('/me', getMyProfile);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), editInfoUser);

module.exports = userRouter;
