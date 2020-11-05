const express = require('express');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      res.status(200).json({
        data: `Movie list ${tags}`,
        message: 'Movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
      res.status(200).json({
        data: `Single movie ${movieId}`,
        message: 'Movie retrieve',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body: movie } = req;
    try {
      res.status(200).json({
        data: movie,
        message: 'Movie created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId', async function (req, res, next) {
    //const movieId = req.params;
    const { body: movie } = req;

    try {
      res.status(200).json({
        data: movie,
        message: 'Movie updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId', async function (req, res, next) {
    const movieId = req.params;
    try {
      res.status(200).json({
        data: movieId,
        message: 'Movie deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;
