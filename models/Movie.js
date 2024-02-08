const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: {
      value: true,
      message: 'Поле country яявляется обязательным',
    },
  },

  director: {
    type: String,
    required: {
      value: true,
      message: 'Поле director яявляется обязательным',
    },
  },

  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Поле duration яявляется обязательным',
    },
  },

  year: {
    type: String,
    required: {
      value: true,
      message: 'Поле year яявляется обязательным',
    },
  },

  description: {
    type: String,
    required: {
      value: true,
      message: 'Поле year яявляется обязательным',
    },
  },

  image: {
    type: String,
    required: {
      value: true,
      message: 'Поле image яявляется обязательным',
    },
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },

  trailerLink: {
    type: String,
    required: {
      value: true,
      message: 'Поле trailerLink яявляется обязательным',
    },
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },

  thumbnail: {
    type: String,
    required: {
      value: true,
      message: 'Поле thumbnail яявляется обязательным',
    },
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле является обязательным'],
  },

  movieId: {
    type: Number,
    required: [true, 'Поле является обязательным'],
  },

  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Поле nameRU яявляется обязательным',
    },
  },

  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Поле nameEN яявляется обязательным',
    },
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);

// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// eslint-disable-next-line max-len
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// eslint-disable-next-line max-len
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле в формате number.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.
