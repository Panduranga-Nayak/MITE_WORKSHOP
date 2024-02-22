const { Model } = require('objection');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_USER,
    user : process.env.DB_PASSWORD,
    password : process.env.DB_PORT,
    database : process.env.MYSQL_DB
  }
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = knex;