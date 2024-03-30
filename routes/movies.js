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
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(
      validateUrl,
    ),
    trailerLink: Joi.string().required().regex(
      validateUrl,
    ),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(
      validateUrl,
    ),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieById);

module.exports = movieRouter;
