const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApiMongo = require('./routes/moviesMongo');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const {
  logErrors,
  wrapErrorsWithBoom,
  errorHandler,
} = require('./utils/middleware/errorHandler');

app.use(express.json());

//routes
moviesApiMongo(app);

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
