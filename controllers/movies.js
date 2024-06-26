const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const ForibiddenError = require('../errors/ForbiddenError');

const Movie = require('../models/Movie');

const STATUS_OK = 200;
// запрос успешно выполнен

const STATUS_OK_CREATED = 201;
// запрос выполнен и создан новый ресурс

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    return res.status(STATUS_OK).send(movies);
  } catch (error) {
    return next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });

    return res.status(STATUS_OK_CREATED).send({
      _id: movie._id,
      owner: movie.owner,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданны некорректные данны'));
    }
    return next(error);
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Карточки с указанным ID не существует');
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForibiddenError('Нет прав для удаления карточки');
    }
    await Movie.deleteOne({ _id: movieId });
    return res.status(STATUS_OK).send({ message: 'Фильм успешно удален' });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new IncorrectDataError('Указан некорретный ID'));
    }
    return next(error);
  }
};
