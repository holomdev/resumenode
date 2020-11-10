const express = require('express');
const MovieServices = require('../services/moviesMysql');
const validatorHandler = require('../utils/middleware/validationHandler');
const {
  movieIdSchema,
  updateMovieSchema,
  createMovieSchema,
} = require('../utils/schemas/moviesMysql');

function movieApiMysql(app) {
  const router = express.Router();
  app.use('/api/mysql/movies', router);
  const movieService = new MovieServices();

  router.get('/', async function (req, res, next) {
    try {
      const movies = await movieService.getMovies();
      res.status(200).json({
        data: movies,
        message: 'Movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validatorHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const movie = await movieService.getMovie({ movieId });
        res.status(200).json({
          data: movie,
          message: 'Movie retrieve',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', validatorHandler(createMovieSchema), async function (
    req,
    res,
    next
  ) {
    const { body: movie } = req;
    try {
      const createdMovieId = await movieService.createMovie({ movie });
      res.status(200).json({
        data: createdMovieId,
        message: 'Movie created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:movieId',
    validatorHandler({ movieId: movieIdSchema }, 'params'),
    validatorHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieInfo = await movieService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieInfo,
          message: 'Movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validatorHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deletedMovieAffected = await movieService.deleteMovie({
          movieId,
        });
        res.status(200).json({
          data: `Affected rows ${deletedMovieAffected}`,
          message: 'Movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = movieApiMysql;
