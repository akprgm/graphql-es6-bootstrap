// Update with your config settings.
require('dotenv').load();

const path = require('path');

module.exports = {

  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(`${__dirname}/database/migrations`),
    },
    seeds: {
      directory: path.join(`${__dirname}/database/seeds`),
    },
  },

  staging: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(`${__dirname}./database/migrations`),
    },
    seeds: {
      directory: path.join(`${__dirname}./database/seeds`),
    },
  },

  production: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(`${__dirname}./database/migrations`),
    },
    seeds: {
      directory: path.join(`${__dirname}./database/seeds`),
    },

  },
};
