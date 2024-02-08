const mongoose = require('mongoose');
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
    unique: true,
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
