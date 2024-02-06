/* eslint-disable max-len */
const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../utils/constants');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().min(4).max(4),
    description: Joi.string().required().min(2),
    image: Joi.string().required().regex(
      validateUrl,
    ),
    trailerLink: Joi.string().required().regex(
      validateUrl,
    ),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
}), createMovie);

movieRouter.delete('/_id', celebrate({
  params: Joi.object({
    moviedId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieById);

module.exports = movieRouter;

// # возвращает все сохранённые текущим пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
