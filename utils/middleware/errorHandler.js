const boom = require('@hapi/boom');
const { config } = require('../../config/index');

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrorsWithBoom(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack };
  }

  return err;
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrorsWithBoom,
  errorHandler,
};
