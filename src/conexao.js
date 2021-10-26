const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/mini_insta",
    ssl: process.env.DATABASE_URL ? true : false,
  },
});

module.exports = knex;
