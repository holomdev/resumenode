const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const {
  logErrors,
  wrapErrorsWithBoom,
  errorHandler,
} = require('./utils/middleware/errorHandler');

app.use(express.json());

//routes
moviesApi(app);

//404
app.use(notFoundHandler);

//errors
app.use(logErrors);
app.use(wrapErrorsWithBoom);
app.use(errorHandler);

app.listen(config.port, function () {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});
