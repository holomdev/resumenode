const joi = require('@hapi/joi');

const movieIdSchema = joi.number().min(1);
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema = joi.number().min(1).max(300);
const movieRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagSchema = joi.string().max(80);

const createMovieSchema = {
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieRatingSchema.required(),
  source: movieSourceSchema.required(),
  tag: movieTagSchema,
};

const updateMovieSchema = {
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieRatingSchema,
  source: movieSourceSchema,
  tag: movieTagSchema,
};

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};
