var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '1234',
      database : 'apiusers'
    }
  });

module.exports = knex