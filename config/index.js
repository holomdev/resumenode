require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 4000,
  cors: process.env.CORS,
  dbMongoUser: process.env.DB_USER,
  dbMongoPassword: process.env.DB_PASSWORD,
  dbMongoHost: process.env.DB_HOST,
  dbMongoName: process.env.DB_NAME,
  dbMongoPort: process.env.DB_PORT,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlName: process.env.MYSQL_NAME,
  mysqlPort: process.env.MYSQL_PORT,
};

module.exports = { config };
