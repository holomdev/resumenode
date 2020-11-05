const express = require('express');
const app = express();
const { config } = require('./config/index');

app.use(express.json());

app.listen(config.port, function () {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});
