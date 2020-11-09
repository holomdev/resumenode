const express = require('express');
const MovieService = require('../services/moviesMock');

function moviesApiMock(app) {
  const router = express.Router();
  app.use('/api/mock/movies', router);
  const movieService = new MovieService();

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

  router.get('/:movieId', async function (req, res, next) {
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
  });

  router.post('/', async function (req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await movieService.createMovie({ movie });
      res.status(200).json({
        data: createdMovieId,
        message: 'Movie Created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await movieService.updateMovie({ movieId, movie });
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie Updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const deletedMovieId = await movieService.deleteMovie({ movieId });
      res.status(200).json({
        data: deletedMovieId,
        message: 'Movie Deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApiMock;
