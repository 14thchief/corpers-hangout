require('dotenv').config()

module.exports = {
  development: {
    database: 'corpers_hangout',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    database: 'corpers_hangout',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    database: 'corpers_hangout',
    host: process.env.DB_PROD_HOST,
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASS,
    url: process.env.DB_PROD_URL,
    dialect: 'postgres',
  }
}
