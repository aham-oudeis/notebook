const Pool = require("pg").Pool;

const pool = new Pool({
  user: "gagan",
  database: "notebook",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
