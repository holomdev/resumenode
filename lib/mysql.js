const mysql = require('mysql2');
const { config } = require('../config/index');

const db = mysql.createPool({
  host: config.mysqlHost,
  user: config.mysqlUser,
  database: config.mysqlName,
  password: config.mysqlPassword,
  port: config.mysqlPort,
});

module.exports = db.promise();
