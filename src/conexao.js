const knex = require("knex")({
  client: "pg1",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "mini_insta",
  },
});

module.exports = knex;
