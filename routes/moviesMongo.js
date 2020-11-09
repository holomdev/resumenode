const express = require('express');
const MovieServices = require('../services/moviesMongo');
const validationHandler = require('../utils/middleware/validationHandler');
const {
  movieIdSchema,
  updateMovieSchema,
  createMovieSchema,
} = require('../utils/schemas/moviesMongo');

function moviesApiMongo(app) {
  const router = express.Router();
  app.use('/api/mongo/movies', router);

  const movieService = new MovieServices();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const movies = await movieService.getMovies({ tags });
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
    validationHandler({ movieId: movieIdSchema }, 'params'),
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

  router.post('/', validationHandler(createMovieSchema), async function (
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
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await movieService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'Movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deletedMovieId = await movieService.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovieId,
          message: 'Movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApiMongo;
