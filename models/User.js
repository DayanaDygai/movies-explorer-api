const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: {
      value: true,
      message: 'Поле email яявляется обязательным',
    },
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password яявляется обязательным',
    },
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'минимальная длинна 2 символа'],
    maxlength: [30, 'максимальная длинна 30 символов'],
    required: {
      value: true,
      message: 'Поле name яявляется обязательным',
    },
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);

// eslint-disable-next-line max-len
// email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
// eslint-disable-next-line max-len
// password — **хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
// eslint-disable-next-line max-len
// name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.
